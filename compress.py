import tinify
from pathlib import Path
import os

tinify.key = ''


def compress(source):
    res = tinify.from_file(source)
    res.to_file(source)
    print(source)


def main():
    paths = Path("public").rglob("*.webp")
    for path in paths:
        compress(path)


main()
