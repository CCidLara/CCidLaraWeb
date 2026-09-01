import flax.linen as nn
import jax
import jax.numpy as jnp
from typing import Tuple, Sequence
from jax import random 

# %%

# ---------------------------------------------------------------------- # 
# LR-DIP 
# ---------------------------------------------------------------------- # 
class ConvolutionBlock(nn.Module): # blue arrow 
  dimensions    : int # 1, 2
  kernel        : int # 3, 1
  stride        : int
  features      : int
  dropout_rate  : float

  @nn.compact
  def __call__(self, x, training:bool):
    # voy a implementarla primero sin considerar las skip connections 
    x = nn.Conv(features=self.features, kernel_size=(self.kernel,) * self.dimensions, strides=(self.stride,)*self.dimensions)(x)
    x = nn.leaky_relu(x)
    x = nn.BatchNorm(use_running_average = not training)(x)
    x = nn.Dropout(rate=self.dropout_rate, deterministic=not training)(x)
    return x   
  
class ForwardConvolution(nn.Module): 
    dimensions  : int # 1, 2
    kernel      : int # 3, 1
    features    : int
    dropout_rate: float

    @nn.compact
    def __call__(self, x, training:bool):
        x = ConvolutionBlock(dimensions=self.dimensions,
                            kernel       = self.kernel,
                            stride       = 1,
                            features     = self.features, 
                            dropout_rate = self.dropout_rate
                            )(x, training)
        return x 
   
class DownwardConvolution(nn.Module):
    dimensions    : int # 1, 2
    features    : int
    dropout_rate: float 

    @nn.compact
    def __call__(self, x, training:bool):
        x = ConvolutionBlock(
            dimensions=self.dimensions,
            kernel       = 3,
            stride       = 2,
            features     = self.features, 
            dropout_rate = self.dropout_rate
            )(x, training)
        return x   
    
def upsampling_1d(t, new_shape:int, method:str): 

    old_lenght, channels = t.shape[-2:]
    batch_shape = t.shape[:-2]
    vectorsize = new_shape[-2]

    newt = jax.image.resize(t, shape= batch_shape + (vectorsize, channels), method=method)
    return newt


#14-07-25 ccid
def upsampling_2d(x, new_imshape: Tuple[int, int], method: str):
    # x shape: (batch, height, width, channels)
    batch, height, width, channels = x.shape
    new_height, new_width = new_imshape
    return jax.image.resize(x, shape=(batch, new_height, new_width, channels), method=method)



# def upsampling_2d(x, new_imshape:Tuple[int,int], method:str):
#    old_height, old_width, channels = x.shape[-3:]
#    batch_shape = x.shape[:-3]
#    imsize = new_imshape[-3:-1]
#    new_height, new_width = imsize

#    x = jax.image.resize(x, shape= batch_shape + (new_height, new_width, channels), method=method)
#    return x   

class UNet(nn.Module):
  dimension         : int
  dropout_rate      : float
  encoding_features : int # 128 
  skip_features     : int # 4 
  levels            : int # 4 
  upsampling_method : str # bilinear, nearest 
  output_features   : int
  @nn.compact
  def __call__(self, x, training:bool):

    skips = []
    shapes = []

    # encode 
    for _ in range(self.levels):
        skip = ForwardConvolution(dimensions=self.dimension, kernel=3, features=self.skip_features, dropout_rate=self.dropout_rate)(x, training)
        skips.append(skip)
        
        shapes.append(x.shape)
        x = DownwardConvolution(dimensions=self.dimension, features=self.encoding_features, dropout_rate=self.dropout_rate)(x, training)
        
        x = ForwardConvolution(dimensions=self.dimension, kernel=3, features=self.encoding_features, dropout_rate=self.dropout_rate)(x, training)

    skips.reverse()
    shapes.reverse()
    # decode         
    for skip, shape in zip(skips, shapes):
        x = self.upsampling(x, shape)
        x = jnp.concatenate((skip, x), axis=-1) # concatenar los features 

        x = ForwardConvolution(dimensions=self.dimension, kernel=3, features=self.encoding_features, dropout_rate=self.dropout_rate)(x, training)
        x = ForwardConvolution(dimensions=self.dimension,kernel=1, features=self.encoding_features, dropout_rate=self.dropout_rate)(x, training)
    x = ForwardConvolution(dimensions=self.dimension, kernel=1, features=self.output_features, dropout_rate=self.dropout_rate)(x, training)    
    return x 
  
  def upsampling(self, x, newshape):
    if self.dimension == 1:
       x = upsampling_1d(x, newshape, self.upsampling_method)
    elif self.dimension == 2:
       x = upsampling_2d(x, newshape, self.upsampling_method)
    return x
    
 
# ---------------------------------------------------------------------- # 
# TD-DIP 
# ---------------------------------------------------------------------- # 
    
class ConvolutionalDIPBLock(nn.Module): 
    dimensions    : int # 1, 2
    kernel        : int # 3, 1
    stride        : int
    features      : int
    momentum      : float

    @nn.compact
    def __call__(self, x, training:bool):
        # voy a implementarla primero sin considerar las skip connections 
        x = nn.Conv(features=self.features, kernel_size=(self.kernel,) * self.dimensions, strides=(self.stride,)*self.dimensions)(x)
        x = nn.InstanceNorm()(x)
        #x = nn.BatchNorm(use_running_average = not training, momentum=self.momentum)(x)
        x = nn.relu(x)
        return x
    
class Encoder(nn.Module):
    features      : int = 128
    momentum      : float = 0.99
    levels        : int = 3
    out_features  : int = 128
    upsampling_method: str = 'nearest'
    dimensions    : int = 2 
    @nn.compact
    def __call__(self, x, training:bool):
        # voy a implementarla primero sin considerar las skip connections
        downsampling_factor = 2
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(NxNxfeatures)
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(NxNxfeatures)
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=downsampling_factor, features=self.features, momentum=self.momentum)(x, training) #(N//2xN//2xfeatures)
        for _ in range(self.levels):
            x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(NxNxfeatures)
            x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(NxNxfeatures)
            x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=downsampling_factor, features=self.features, momentum=self.momentum)(x, training) #(N//2xN//2xfeatures)
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(NxNxfeatures)
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(NxNxfeatures)
        x = nn.Conv(features=self.out_features, kernel_size=(3,)*self.dimensions, strides=(downsampling_factor,)*self.dimensions)(x)
        return x
    
# def new_upsampled_shape(initialshape, upsampling_factor:int, dimensions:int): 
#     """
#     # Ejemplos: 

#     ```python
#     >>> new_upsampled_shape((100,12,10,30,3), 3, 1)
#     (100,12,10,90,3)
#     >>> new_upsampled_shape((100,12,10,30,3), 3, 2)
#     (100,12,30,90,3)
#     >>> new_upsampled_shape((100,12,10,30,3), 3, 3)
#     (100,36,30,90,3)
#     >>> new_upsampled_shape((100,12,10,30,3), 2, 3)
#     (100,24,20,60,3)
#     ```
#     """
#     batch_shape = initialshape[:-(dimensions + 1)]
#     convolved_shape = initialshape[-(dimensions + 1):-1]
#     features_shape = (initialshape[-1],)
#     #print(batch_shape, convolved_shape, features_shape)
#     new_shape = batch_shape  + tuple(n* upsampling_factor for n in convolved_shape) + (initialshape[-1],)
#     return new_shape

#14-07-25 ccid
def new_upsampled_shape(initialshape, upsampling_factor: int, dimensions: int):
    """
    Expected input shape: (batch, height, width, channels)
    Will upsample spatial dimensions only.
    """
    if dimensions == 2:
        batch, height, width, channels = initialshape
        return (batch, height * upsampling_factor, width * upsampling_factor, channels)
    else:
        raise ValueError(f"Unsupported dimensions: {dimensions}")




class Decoder(nn.Module):
    features         : int = 128
    momentum         : float = 0.99
    levels           : int = 3
    out_features     : int = 2
    upsampling_method: str = 'bicubic'
    dimensions       : int = 2 
    upsampling_factor: int = 2 

    @nn.compact
    def __call__(self, x, training:bool):
        skips = []

        # First blocks before upsampling
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training)
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training)
        skips.append(x)  # save for skip
        #jax.debug.print("initial conv output shape: {}", x.shape)

        x = self.upsampling(x, self.upsample_shape(x.shape))  # → 16x16
        #jax.debug.print("upsampling output shape: {}", x.shape)

        for _ in range(self.levels-1):
            x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) 
            x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training)
    
            # Insert skip connection if available
            if skips:
                skip = skips.pop()
                skip = jax.image.resize(skip, x.shape, method="nearest")  # or 'bilinear'
                #x = jnp.concatenate([x, skip], axis=1)
                x = x + skip


            skips.append(x)  # save next skip before upsampling
            x = self.upsampling(x, self.upsample_shape(x.shape))
            #jax.debug.print("upsampling output shape: {}", x.shape)

        # Final refinement blocks
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training)
        x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training)
        x = nn.Conv(features=self.out_features, kernel_size=(3,)*self.dimensions, strides=(1,)*self.dimensions)(x)
        #jax.debug.print("final conv output shape: {}", x.shape)

        scale = self.param("output_scale", lambda rng, shape: jnp.ones(shape), (1,))
        bias = self.param("output_bias", lambda rng, shape: jnp.zeros(shape), (1,))
        x = x * scale + bias  # Rescale output
        return x

    # @nn.compact
    # def __call__(self, x, training:bool):
    #     # voy a implementarla primero sin considerar las skip connections 
    #     x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(8x8x128)
    #     x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(8x8x128)
    #     x = self.upsampling(x, self.upsample_shape(x.shape)) # #(16x16x128)
    #     for _ in range(self.levels): 
    #         x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(nxnx128)
    #         x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(nxnx128)
    #         x = self.upsampling(x, self.upsample_shape(x.shape)) # (2nx2nx128)
    #     x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(128x128x128)
    #     x = ConvolutionalDIPBLock(dimensions=self.dimensions, kernel=3, stride=1, features=self.features, momentum=self.momentum)(x, training) #(128x128x128)
    #     x = nn.Conv(features=self.out_features, kernel_size=(3,)*self.dimensions, strides=(1,)*self.dimensions)(x)

    #     # Normalize per-image (per-instance)
    #     # mean = jnp.mean(x, axis=(-1, -2), keepdims=True)
    #     # std = jnp.std(x, axis=(-1, -2), keepdims=True) + 1e-8
    #     # x = (x - mean) / std  # Normalize to zero mean, unit variance

    #     # Rescale with a learnable gain and bias
    #     scale = self.param("output_scale", lambda rng, shape: jnp.ones(shape), (1,))
    #     bias = self.param("output_bias", lambda rng, shape: jnp.zeros(shape), (1,))
    #     x = x * scale + bias  # Rescale output

    #     # Learnable scalar multiplier
    #     # scale = self.param("output_scale", lambda rng, shape: jnp.ones(shape), (1,))
    #     # x = x * scale  # rescale output
    #     # x = nn.sigmoid(x) # edited ccid
    #     # x = jnp.nan_to_num(x, nan=1, posinf=1e2, neginf=-1e2)
    #     # noise = 0.01 * jax.random.normal(shape=x.shape)
    #     # x = x + noise
    #     # x = jnp.clip(x, -10.0, 10.0)
    #     return x
    #     # magnitude = jnp.abs(x)
    #     # norm_magnitude = magnitude / (jnp.max(magnitude) + 1e-8) # avoid division by zero
    #     # phase = jnp.angle(x)
    #     # return norm_magnitude * jnp.exp(1j * phase)
        

    def upsampling(self, x, newshape):
        if self.dimensions == 1: 
            #print("upsampling 1d")
            return upsampling_1d(x, newshape, self.upsampling_method)
        if self.dimensions == 2:
            #print("upsampling 2d")
            # Extract only (height, width)
            batch, h_new, w_new, channels = newshape
            #print(f"newshape: {newshape}, h_new: {h_new}, w_new: {w_new}")
            return upsampling_2d(x, (h_new, w_new), self.upsampling_method)
    
    def upsample_shape(self, initialshape):
        return new_upsampled_shape(initialshape, self.upsampling_factor, self.dimensions)

import copy

class MapNet(nn.Module):
    mapnet_layers:Sequence[int] # solo considera los hidden layers 
    cnn_latent_shape:Tuple[int,int]

    def setup(self):
        layers = list(copy.deepcopy(self.mapnet_layers))
        if layers: #not empty 
            px, py = self.cnn_latent_shape
            layers.append(px * py)      

        self.dense_layers = [nn.Dense(layer, name=f'mapnet-{i}') for i, layer in enumerate(layers)]

    def __call__(self, t):
        for dense_layer in self.dense_layers: 
            #jax.debug.print("mapnet dense input shape: {}", t.shape)
            t = dense_layer(t) # (batch, features)
            t = nn.relu(t)
            #jax.debug.print("mapnet dense output shape: {}", t.shape)
        return t
    



# class tDIP(nn.Module):
#     mapnet_layers : Sequence[int]
#     cnn_latent_shape : Tuple[int,int]
#     features      : int 
#     momentum      : float
#     levels        : int
   
# #     # def __call__(self, t, training:bool):
# #     #     mapnet = MapNet(self.mapnet_layers, self.cnn_latent_shape)
# #     #     x = mapnet(t)
# #     #     jax.debug.print("mapnet output shape: {}", x.shape)
# #     #     # jax.debug.print("mapnet output shape nans: {}", jnp.isnan(x).sum())
# #     #     x = jnp.reshape(x, x.shape[:-1] + self.cnn_latent_shape)
# #     #     jax.debug.print("mapnet output reshape: {}", x.shape)
# #     #     # jax.debug.print("mapnet output reshape nans: {}", jnp.isnan(x).sum())
# #     #     x = x[...,None] # add features dimension
# #     #     jax.debug.print("mapnet output feature reshape: {}", x.shape)
# #     #     # jax.debug.print("mapnet output feature nans: {}", jnp.isnan(x).sum())
# #     #     x = Decoder(self.features, self.momentum, self.levels)(x, training)
# #     #     jax.debug.print("decoder output shape: {}", x.shape)
# #     #     # jax.debug.print("decoder output shape nans: {}", jnp.isnan(x).sum())
# #     #     return x
# #     # 

#     #current version, original code for tdip net
#     @nn.compact
#     def __call__(self, t, training: bool):
#         mapnet = MapNet(self.mapnet_layers, self.cnn_latent_shape)
#         x = mapnet(t)  # (batch, H * W)
#         #jax.debug.print("mapnet output shape: {}", x.shape)
#         H, W = self.cnn_latent_shape
#         x = jnp.reshape(x, (-1, H, W))  # (batch, H, W)
#         #jax.debug.print("mapnet output reshape: {}", x.shape)
#         x = x[...,None]  # (batch, 1, H, W)
#         #jax.debug.print("mapnet output feature reshape: {}", x.shape)
#         x = Decoder(self.features, self.momentum, self.levels)(x, training)
#         #jax.debug.print("decoder output shape: {}", x.shape)
#         return x

# #     #1d convolution with k=3 of slice wise regularization
# #     @nn.compact
# #     def __call__(self, t, training: bool):
# #         mapnet = MapNet(self.mapnet_layers, self.cnn_latent_shape)
# #         x = mapnet(t)  # (batch, H*W)
# #         H, W = self.cnn_latent_shape
# #         x = jnp.reshape(x, (-1, H, W))  # (R, H, W)
        
# #         # ----------------------------
# #         # 1D convolution along readout dimension
# #         # ----------------------------
# #         # add channel dim
# #         x = x[...,None]  # (R, H, W, 1)
# #         # Apply 1D conv along the first dimension (slices)
# #         x = nn.Conv(features=1, kernel_size=(3,1,1), padding='SAME')(x)
# #         jax.debug.print("mapnet output shape: {}", x.shape)
# #         x = Decoder(self.features, self.momentum, self.levels)(x, training)
# #         return x
    
#version with pseudo-3D convolution
class tDIP(nn.Module):
    mapnet_layers : Sequence[int]
    cnn_latent_shape : Tuple[int,int]
    features      : int 
    momentum      : float
    levels        : int
    n_neighbors   : int = 1  # number of slices before/after for pseudo-3D smoothing

    def make_pseudo3d_batch(self, latent):
        """
        latent: (R, H, W)
        returns: (R*(2*n_neighbors+1), H, W, 1) → flattened batch
        """
        R, H, W = latent.shape
        padded = jnp.pad(latent, ((self.n_neighbors,self.n_neighbors),(0,0),(0,0)), mode='edge')
        slices = []
        for i in range(R):
            slices.append(padded[i:i+2*self.n_neighbors+1])
        # slices shape: (R, 2*n_neighbors+1, H, W)
        slices = jnp.stack(slices, axis=0)
        R, neighbors, H, W = slices.shape
        slices = slices.reshape(R*neighbors, H, W, 1)  # flatten neighbors into batch
        return slices, R, neighbors

    @nn.compact
    def __call__(self, t, training: bool):
        mapnet = MapNet(self.mapnet_layers, self.cnn_latent_shape)
        latent = mapnet(t)  # (R, H*W)
        H, W = self.cnn_latent_shape
        latent = jnp.reshape(latent, (-1, H, W))  # (R,H,W)

        # ----------------------------
        # Create pseudo-3D batch
        # ----------------------------
        x, R, neighbors = self.make_pseudo3d_batch(latent)  # (R*(2*n_neighbors+1), H, W, 1)

        # Feed to decoder
        x_decoded = Decoder(self.features, self.momentum, self.levels)(x, training)

        # ----------------------------
        # Reshape back to original slices
        # ----------------------------
        H_out, W_out = x_decoded.shape[1:3]
        x_decoded = x_decoded.reshape(R, neighbors, H_out, W_out)  # (R, neighbors, H, W)
        # Optionally, take the center slice
        center_idx = neighbors // 2
        x_decoded = x_decoded[:, center_idx, :, :]  # (R, H, W)

        return x_decoded


# ------------------- Generators --------------------------------------- # 

def helix_generator(nframes, total_cycles):
    ts = jnp.linspace(0,total_cycles, nframes, endpoint=False)
    helix = jnp.stack([jnp.cos(ts*2*jnp.pi), jnp.sin(ts*2*jnp.pi), ts/total_cycles], axis=-1)
    return helix

def circle_generator(nframes, key, addConst):
    ts = jnp.linspace(0,1, nframes, endpoint=False)
    constant_value = jax.random.uniform(key, ())
    if addConst:
        circle = jnp.stack([jnp.cos(ts*2*jnp.pi), jnp.sin(ts*2*jnp.pi), constant_value*jnp.ones(nframes)], axis=-1)
    else:
        circle = jnp.stack([jnp.cos(ts*2*jnp.pi), jnp.sin(ts*2*jnp.pi)], axis=-1)
    return circle

def multi_slice_circle_generator(nframes, num_slices, key, addConst):
    ts = jnp.linspace(0, 1, nframes, endpoint=False)
    ss = jnp.linspace(-1, 1, num_slices, endpoint=True)
    constant_value = jax.random.uniform(key, ())
    arrays_to_stack = []
    for s in ss:
        if addConst:
            circle_s = jnp.stack([jnp.cos(ts*2*jnp.pi), jnp.sin(ts*2*jnp.pi), s*jnp.ones(nframes), constant_value*jnp.ones(nframes)], axis=-1)
        else:
            circle_s = jnp.stack([jnp.cos(ts*2*jnp.pi), jnp.sin(ts*2*jnp.pi), s*jnp.ones(nframes)], axis=-1)
        arrays_to_stack.append(circle_s)
    stacked_array = jnp.stack(arrays_to_stack, axis=0)
    return stacked_array

def linear_generator(nframes, key, addConst):
    ts = jnp.linspace(0, 1, nframes, endpoint=False)
    constant_value = jax.random.uniform(key, ())
    if addConst:
        line = jnp.stack([ts, constant_value*jnp.ones(nframes)], axis=-1)
    else:
        line = ts[...,None]
    return line


# ------------------- TD-DIP Net --------------------------------------- # 

class TimeDependant_DIP_Net:

    def __init__(self, nframes    : int,
                 key_latent,
                 addConst,
                 latent_generator,
                 imshape          : Tuple[int,int],
                 mapnet_layers    : Sequence[int],
                 cnn_latent_shape : Tuple[int,int] = (16,2),
                 features         : int = 128,
                 momentum         : float = 0.99,
                 levels           : int = 3
                 ):
        """
        - `latent_generator`: Callable(int, int) que devuelve un array de tamaño (nframes, N), donde N es algun número arbitrario de features.
        """
        self.nframes = nframes
        self.key_latent = key_latent
        self.imshape = imshape
        self.addConst = addConst

        self.latent = latent_generator(nframes, self.key_latent, self.addConst)
        noise = 0.01 * jax.random.normal(self.key_latent, self.latent.shape)
        self.latent = self.latent + noise
        self.net = tDIP(mapnet_layers, cnn_latent_shape, features, momentum, levels)
    
    def init_params(self, key):
        params = self.net.init(key, self.latent[:1], training=False)
        return params
    
    def get_latent(self, t_index):
        if t_index is None:
            latent = self.latent 
        else:
            latent = self.latent[t_index,:]
        return latent

    def train_forward_pass(self, params, key, t_index):
        #latent =  self.latent[t_index,:] #self.get_latent(t_index) 
        latent = t_index
        #jax.debug.print("latent: {}", latent)
        #y, updates = self.net.apply(params, latent, training=True, rngs={'dropout':key}, mutable=['batch_stats'])
        y = self.net.apply(params, latent, training=True, rngs={'dropout':key})
        y = to_complex(y)[...,0]
        nx, ny = self.imshape
        y = y[...,:nx,:ny] #cropping to the original image size
        return y
        #return y, updates['batch_stats'] 

from typing import Callable
from jax import numpy as np 
from jax import vmap 

def find_convex_coefficient(a,b,x):
  """
  Si a <= x < b, encuentra 0<=lmbda<1 tal que (1-lmbda) * a + lmbda * b = x,
  es decir   encuentra el coeficiente tal que x es una combinación convexa
  de a y b.

  ## Ejemplo

  ```python
  >>> find_convex_coefficient(1., 2., 1.)
  0.
  >>> find_convex_coefficient(1., 2., 1.2)
  0.19999999999999996
  ```
  """
  lmbda = (x - a)/(b-a)
  return lmbda

def get_dx(x):
  dx = x[1] - x[0]
  return dx

def identify_max_lessorequal_position(val, x):
  """
  Para un arreglo numpy de valores x ordenado de forma creciente, encuentra
  la posición asociada al máximo valor del arreglo x que es inferior o
  igual a `val`

  ## Ejemplo

  ```python
  >>> x = np.array([1.,2.,3.,4.])
  >>> identify_max_lessorequal_position(2., x)
  [False, True, False, False]
  >>> identify_max_lessorequal_position(3.4, x)
  [False, False, True, False]
  ```
  """
  dx = get_dx(x)
  liminf = (val - dx < x) * (x <= val)
  return liminf

def identify_min_greater_position(val, x):
  """
  Para un arreglo numpy de valores x ordenado de forma creciente, encuentra
  la posición asociada al mínimo valor del arreglo x que es estrictamente
  superior a `val`.

  ## Ejemplo

  ```python
  >>> x = np.array([1.,2.,3.,4.])
  >>> identify_min_greater_position(2., x)
  [False, False, True, False]
  >>> identify_min_greater_position(2.4, x)
  [False, False, True, False]
  ```
  """
  dx = get_dx(x)
  limsup = (val < x) * (x <= val + dx)
  return limsup

def find_array_convex_coefficients(val, x):
  liminf = identify_max_lessorequal_position(val, x)
  limsup = identify_min_greater_position(val, x)
  a = np.sum(x * liminf)
  b = np.sum(x * limsup)
  lmbda = find_convex_coefficient(a,b,val)
  return (1 - lmbda) * liminf +  lmbda * limsup

def random_ndim_helix_encoder(t,total_cycles, key, extra_dims, ts):
  # t = ts[3:5,None]
  nframes = ts.shape[0]
  extra_dims = 14
  total_cycles = 1
  lmbdas = vmap(find_array_convex_coefficients, in_axes=(0, None))(t[...,0], ts) # (selected_frames, nframes)
  noise = random.normal(key, (nframes, extra_dims)) # (nframes, extra_dims)
  interpolated_noise_at_t = np.sum(lmbdas[:,:,None] * noise[None, :,:], axis=1) # (selected_frames, extra_dims), where combined along nframes dim
  big_helix = jnp.concatenate([jnp.cos(t), jnp.sin(t), interpolated_noise_at_t * t/total_cycles], axis=-1) # (selected_frames, 2 + extra_dims)
  return big_helix

def helix_encoder(t, nframes, total_cycles):
    helix = jnp.concatenate([jnp.cos(t), jnp.sin(t), t/total_cycles], axis=-1)
    return helix

class INRTemporalBasis(nn.Module):
  encoding:Callable
  hidden_layers:Sequence[int]
  output:int

  @nn.compact
  def __call__(self, t):
    tx = self.encoding(t)
    for layer in self.hidden_layers:
      tx = nn.Dense(layer)(tx)
      tx = nn.relu(tx)
    tx = nn.Dense(self.output)(tx)
    return tx
  


  # ------   New version of TD-DIP  -------

class MS_TD_DIP_Net:
    def __init__(self, nframes    : int,
                 n_slices         : int,
                 key_latent,
                 addConst,
                 latent_generator,
                 imshape          : Tuple[int,int],
                 mapnet_layers    : Sequence[int],
                 cnn_latent_shape : Tuple[int,int] = (8,8),
                 features         : int = 128,
                 momentum         : float = 0.99,
                 levels           : int = 3
                 ):
        """
        - `latent_generator`: Callable(int, int) que devuelve un array de tamaño (nframes, N), donde N es algun número arbitrario de features.
        """
        self.nframes = nframes
        self.n_slices = n_slices
        self.imshape = imshape
        self.key_latent = key_latent
        self.addConst = addConst

        self.latent = latent_generator(nframes, n_slices, self.key_latent, self.addConst)
        self.net = tDIP(mapnet_layers, cnn_latent_shape, features, momentum, levels)
    
    def init_params(self, key):
        params = self.net.init(key, self.latent[0, :1], training=False)
        return params

    def train_forward_pass(self, params, key, t_index, i):
        latent =  self.latent[i, t_index,:]
        y, updates = self.net.apply(params, latent, training=True, rngs={'dropout':key}, mutable=['batch_stats'])
        y = to_complex(y)[...,0]
        nx, ny = self.imshape
        y = y[...,:nx,:ny]
        return y, updates['batch_stats'] 