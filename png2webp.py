from PIL import Image
from pathlib import Path
import os


def convert_to_webp(source):
    destination = source.with_suffix(".webp")

    image = Image.open(source)  # Open image
    image.save(destination, format="webp", quality=100)  # Convert image to webp

    os.remove(source)

    return destination



def main():
    paths = Path("src/public/media").rglob("*.png")
    for path in paths:
        webp_path = convert_to_webp(path)
        print(webp_path)


main()