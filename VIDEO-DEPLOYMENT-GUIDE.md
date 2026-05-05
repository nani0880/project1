# Video Deployment Guide for Vercel

Your video is **84 MB**, which is too large for Git. Here are your options:

---

## ✅ RECOMMENDED: Compress Video First

Before deploying, compress your video to reduce size:

### Using FFmpeg (Best Quality):
```bash
# Install FFmpeg: https://ffmpeg.org/download.html

# Compress to ~10-20MB (good quality)
ffmpeg -i "public/for-website.mp4" -vcodec h264 -crf 28 -preset slow "public/for-website-compressed.mp4"

# Or more aggressive compression (~5-10MB)
ffmpeg -i "public/for-website.mp4" -vcodec h264 -crf 32 -preset slow -vf scale=1280:-2 "public/for-website-compressed.mp4"
```

### Using Online Tools:
- **HandBrake** (Free desktop app): https://handbrake.fr/
- **Clipchamp** (Online): https://clipchamp.com/en/video-compressor/
- **FreeConvert**: https://www.freeconvert.com/video-compressor

**Target:** Get video under 25MB for better performance

---

## Option 1: Cloudinary (FREE & BEST for large videos)

### Steps:
1. **Sign up**: https://cloudinary.com (Free: 25GB storage, 25GB bandwidth/month)
2. **Upload video**:
   - Go to Media Library
   - Click "Upload"
   - Upload `for-website.mp4`
3. **Get URL**: Copy the video URL (looks like: `https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/for-website.mp4`)
4. **Update code**: Replace the Cloudinary URL in `components/Home.tsx` (already prepared)
5. **Deploy**: Push to Vercel

### Benefits:
- ✅ Free CDN (fast worldwide)
- ✅ Automatic optimization
- ✅ No Git bloat
- ✅ Easy to update video

---

## Option 2: Commit to Git (Only if video < 25MB after compression)

### Steps:
1. **Compress video first** (see above)
2. **Uncomment in .gitignore** (already done)
3. **Add and commit**:
```bash
git add public/for-website-compressed.mp4
git commit -m "Add compressed hero video"
git push origin main
```
4. **Update code** to use compressed filename
5. Vercel will auto-deploy

### Limitations:
- ⚠️ Slows down Git operations
- ⚠️ GitHub has 100MB file limit
- ⚠️ Not recommended for videos > 25MB

---

## Option 3: Vercel Blob Storage (Paid after free tier)

### Steps:
1. **Install**:
```bash
npm install @vercel/blob
```

2. **Upload via Vercel Dashboard**:
   - Go to your project on Vercel
   - Navigate to Storage → Blob
   - Upload video
   - Get the URL

3. **Update code** with Blob URL

### Pricing:
- Free: 500MB storage, 1GB bandwidth
- After: $0.15/GB storage, $0.10/GB bandwidth

---

## Option 4: YouTube/Vimeo Embed (Alternative)

Upload to YouTube/Vimeo and embed:

```tsx
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&controls=0"
  allow="autoplay; encrypted-media"
  style={{ width: '100%', height: '100%', border: 'none' }}
/>
```

---

## 🎯 RECOMMENDED WORKFLOW:

1. **Compress video** to ~15-20MB using FFmpeg or HandBrake
2. **Upload to Cloudinary** (free, fast CDN)
3. **Update code** with Cloudinary URL
4. **Push to Vercel**

This gives you:
- ✅ Fast loading worldwide
- ✅ No Git bloat
- ✅ Easy video updates
- ✅ Free hosting

---

## Current Setup:

- Video file: `public/for-website.mp4` (84 MB)
- Code: `components/Home.tsx` (ready for Cloudinary URL)
- .gitignore: Updated to allow .mp4 files

**Next step**: Choose your preferred option above!
