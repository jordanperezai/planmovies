#!/usr/bin/env python3
"""
cutout.py — batch background removal for PlanMovies artwork.

Pipeline: generate art with Imagen/ChatGPT (ideally on a FLAT white or green/magenta
background) -> drop the raw PNGs in assets/raw/ -> run this -> transparent PNGs land in
assets/cut/. Reuse for app icon, og card, hero, stickers, decorative art.

Setup (one time):
    pip install "rembg[cli]" onnxruntime pillow
    # first run downloads the U2Net model (~170MB)

Usage:
    python3 scripts/cutout.py                 # process every PNG in assets/raw/
    python3 scripts/cutout.py path/to.png     # process one file -> assets/cut/
    python3 scripts/cutout.py --model birefnet-general   # higher accuracy, slower

Notes:
- Flat solid backgrounds cut cleanest. Glowy/gradient backgrounds fringe — for those,
  prefer compositing on a dark surface (CSS mix-blend-mode: screen) over cutting out.
- For the LOGO mark itself, the inline SVG stays the source of truth (crisp at 16px).
  This pipeline is for raster artwork and the app-icon/og/hero PNGs.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "assets" / "raw"
CUT = ROOT / "assets" / "cut"


def main():
    args = [a for a in sys.argv[1:]]
    model = "u2net"
    if "--model" in args:
        i = args.index("--model")
        model = args[i + 1]
        del args[i:i + 2]

    try:
        from rembg import remove, new_session
    except ImportError:
        sys.exit('rembg not installed. Run:  pip install "rembg[cli]" onnxruntime pillow')

    session = new_session(model)
    CUT.mkdir(parents=True, exist_ok=True)

    if args:
        targets = [Path(a) for a in args]
    else:
        RAW.mkdir(parents=True, exist_ok=True)
        targets = sorted(RAW.glob("*.png")) + sorted(RAW.glob("*.jpg"))
        if not targets:
            sys.exit(f"No images in {RAW}. Drop raw PNGs there or pass a file path.")

    for src in targets:
        out = CUT / (src.stem + ".png")
        data = src.read_bytes()
        out.write_bytes(remove(data, session=session))
        print(f"cut: {src.name} -> assets/cut/{out.name}")


if __name__ == "__main__":
    main()
