#!/bin/bash

echo "🧹 Starting repository cleanup..."

# Step 1: Remove video files from Git tracking
echo "📹 Removing video files from Git tracking..."
git rm --cached public/*.mp4 2>/dev/null || echo "No .mp4 files in root public/"
git rm --cached public/**/*.mp4 2>/dev/null || echo "No .mp4 files in subdirectories"

# Step 2: Remove large image files from Git tracking
echo "🖼️ Removing large images from Git tracking..."
git rm --cached public/**/*.jpg 2>/dev/null || echo "No .jpg files"
git rm --cached public/**/*.jpeg 2>/dev/null || echo "No .jpeg files"
git rm --cached public/**/*.JPG 2>/dev/null || echo "No .JPG files"
git rm --cached public/**/*.JPEG 2>/dev/null || echo "No .JPEG files"
git rm --cached public/**/*.png 2>/dev/null || echo "No .png files"
git rm --cached public/**/*.PNG 2>/dev/null || echo "No .PNG files"

# Step 3: Remove from root public folder
git rm --cached public/*.jpg 2>/dev/null || echo "No .jpg in root"
git rm --cached public/*.jpeg 2>/dev/null || echo "No .jpeg in root"
git rm --cached public/*.png 2>/dev/null || echo "No .png in root"

echo "✅ Files removed from Git tracking (files still exist locally)"
echo ""
echo "📊 Remaining tracked files in public/:"
git ls-files public/ | wc -l

echo ""
echo "⚠️ IMPORTANT: Video files are now in .gitignore"
echo "💡 Images will be optimized during build process"
echo ""
echo "Next steps:"
echo "1. Run: git add ."
echo "2. Run: git commit -m 'Remove large media files from tracking, add to gitignore'"
echo "3. Run: npm run build (to test image optimization)"
echo "4. Run: git push origin main"
