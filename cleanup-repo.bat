@echo off
echo 🧹 Starting repository cleanup...
echo.

echo 📹 Removing video files from Git tracking...
git rm --cached public\*.mp4 2>nul
git rm --cached "public\**\*.mp4" 2>nul

echo 🖼️ Removing large images from Git tracking...
git rm --cached "public\**\*.jpg" 2>nul
git rm --cached "public\**\*.jpeg" 2>nul
git rm --cached "public\**\*.JPG" 2>nul
git rm --cached "public\**\*.JPEG" 2>nul
git rm --cached "public\**\*.png" 2>nul
git rm --cached "public\**\*.PNG" 2>nul

echo Removing from root public folder...
git rm --cached public\*.jpg 2>nul
git rm --cached public\*.jpeg 2>nul
git rm --cached public\*.png 2>nul

echo.
echo ✅ Files removed from Git tracking (files still exist locally)
echo.
echo Next steps:
echo 1. Run: git add .
echo 2. Run: git commit -m "Remove large media files from tracking, add to gitignore"
echo 3. Run: npm run build (to test image optimization)
echo 4. Run: git push origin main
echo.
pause
