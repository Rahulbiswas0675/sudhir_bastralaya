#!/usr/bin/env bash
# Build a Hostinger-ready static package (dist/ + zip).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
ZIP_NAME="sudhir-bastralaya-hostinger.zip"
STAMP="$(date +%Y%m%d-%H%M%S)"

cd "$ROOT"

echo "→ Building CSS…"
if [[ -d node_modules/tailwindcss ]]; then
  npx tailwindcss -i ./assets/css/input.css -o ./assets/css/tailwind.css --minify
else
  echo "  (tailwindcss not installed — using existing assets/css/tailwind.css)"
fi

echo "→ Preparing dist/…"
rm -rf "$DIST"
mkdir -p "$DIST"

# Core site files
cp -a index.html robots.txt sitemap.xml .htaccess "$DIST/"

# Production assets only (skip Tailwind source)
mkdir -p "$DIST/assets/css" "$DIST/assets/js" "$DIST/assets/icons" "$DIST/assets/images"
cp -a assets/css/tailwind.css assets/css/style.css assets/css/components.css \
  assets/css/animations.css assets/css/responsive.css "$DIST/assets/css/"
cp -a assets/js/. "$DIST/assets/js/"
cp -a assets/icons/. "$DIST/assets/icons/"
cp -a assets/images/. "$DIST/assets/images/"

# Drop any leftover raw / cache dirs if present
rm -rf "$DIST/assets/images/_raw" "$DIST/assets/js/**/*.map" 2>/dev/null || true

echo "→ Creating zip…"
rm -f "$ROOT/$ZIP_NAME" "$ROOT/sudhir-bastralaya-hostinger-"*.zip
(
  cd "$DIST"
  zip -r -q "$ROOT/$ZIP_NAME" .
)

# Also keep a stamped copy for archives
cp "$ROOT/$ZIP_NAME" "$ROOT/sudhir-bastralaya-hostinger-${STAMP}.zip"

SIZE="$(du -h "$ROOT/$ZIP_NAME" | cut -f1)"
FILE_COUNT="$(find "$DIST" -type f | wc -l | tr -d ' ')"

echo ""
echo "✓ Hostinger build ready"
echo "  Folder : dist/  ($FILE_COUNT files)"
echo "  Zip    : $ZIP_NAME  ($SIZE)"
echo ""
echo "Upload to Hostinger:"
echo "  1. hPanel → Files → File Manager → public_html"
echo "  2. Upload $ZIP_NAME and Extract (or upload dist/ contents)"
echo "  3. Ensure index.html sits in public_html/"
echo "  4. Enable SSL, then open your domain"
