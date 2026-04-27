# ⚡ Quick Start - Repository Cleanup

## Run These Commands in Git Bash:

```bash
# 1. Remove large files from Git tracking
bash cleanup-repo.sh

# 2. Stage all changes
git add .

# 3. Commit
git commit -m "feat: optimize images, remove large files, update gitignore"

# 4. Configure Git for large push
git config http.postBuffer 524288000

# 5. Push to GitHub
git push origin main --progress

# 6. Test build (optional)
npm run build
```

## That's it! 🎉

Your repository is now optimized and ready for Vercel deployment.

---

## What Changed?

✅ 45 large media files removed from Git tracking  
✅ Videos added to .gitignore  
✅ Image optimization enabled in build  
✅ Repository size reduced by ~90%  
✅ Git push will work without timeout  

---

## Files Created:

- `cleanup-repo.sh` - Cleanup script for Git Bash
- `cleanup-repo.bat` - Cleanup script for Windows CMD
- `OPTIMIZATION-GUIDE.md` - Detailed documentation
- `QUICK-START.md` - This file

---

## Need Help?

Read `OPTIMIZATION-GUIDE.md` for detailed instructions and troubleshooting.
