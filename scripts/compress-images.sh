#!/usr/bin/env bash
# ──────────────────────────────────────────────
# compress-images.sh
# Batch-resize and convert project images to WebP
# Requires: ImageMagick (convert) + cwebp
# ──────────────────────────────────────────────
set -euo pipefail

ASSETS="/home/janes-mostert/Desktop/Repo/SuideKoelkamers/src/assets"

resize_and_webp() {
    local src="$1"
    local max_width="$2"
    local quality="${3:-75}"
    local out="${src%.*}.webp"

    if [[ -f "$out" ]]; then
        echo "  SKIP (exists): $out"
        return
    fi

    local tmp
    tmp=$(mktemp /tmp/img_XXXXXX.jpg)

    # Resize (only if wider than max_width), strip metadata
    convert "$src" -resize "${max_width}x>" -strip -quality 85 "$tmp"

    # Convert to WebP
    cwebp -q "$quality" "$tmp" -o "$out" -quiet
    rm -f "$tmp"

    local src_size out_size
    src_size=$(stat -c%s "$src")
    out_size=$(stat -c%s "$out")
    echo "  OK: $(basename "$src") ($(numfmt --to=iec $src_size)) → $(basename "$out") ($(numfmt --to=iec $out_size))"
}

echo "═══ Hero Images ═══"
for f in "$ASSETS"/hero/hero_mobile*.jpg "$ASSETS"/hero/hero_mobile*.jpeg; do
    [[ -f "$f" ]] && resize_and_webp "$f" 750 75
done
for f in "$ASSETS"/hero/hero_desktop*; do
    [[ -f "$f" ]] && resize_and_webp "$f" 1200 78
done

echo ""
echo "═══ Carousel Images ═══"
for f in "$ASSETS"/carousel/*.jpg "$ASSETS"/carousel/*.jpeg; do
    [[ -f "$f" ]] && resize_and_webp "$f" 800 72
done

echo ""
echo "═══ Background Images ═══"
for f in "$ASSETS"/background/*.png "$ASSETS"/background/*.jpg "$ASSETS"/background/*.jpeg; do
    [[ -f "$f" ]] && resize_and_webp "$f" 1200 72
done

echo ""
echo "═══ Extra Images ═══"
for f in "$ASSETS"/extra/*.png "$ASSETS"/extra/*.jpg "$ASSETS"/extra/*.jpeg; do
    [[ -f "$f" ]] && resize_and_webp "$f" 1200 72
done

echo ""
echo "═══ Standalone (kouevleis) ═══"
[[ -f "$ASSETS/kouevleis.jpeg" ]] && resize_and_webp "$ASSETS/kouevleis.jpeg" 800 72

echo ""
echo "Done! ✓"
