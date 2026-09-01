import os
import random

folder = 'images/folio'
files = [f for f in os.listdir(folder) if f.lower().endswith('.jpg')]
random.shuffle(files)

with open('gallery.html', 'w', encoding='utf-8') as out:
    for f in files:
        large = f.replace('.jpg', '-large.jpg')
        large_path = os.path.join(folder, large)
        thumb_path = os.path.join(folder, f)
        if not os.path.exists(large_path):
            large_path = thumb_path
        out.write(f'''
<div class="photo-masonry-item">
    <a href="{large_path}" class="glightbox" data-gallery="gallery1">
        <img src="{thumb_path}" alt="{os.path.splitext(f)[0]}">
    </a>
</div>
''')