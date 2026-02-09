# 📸 How to Add Reemie's Photo

## Quick Steps:

1. **Place your photo file** in the `images` folder
2. **Name it** `reemie.jpg` (or update the filename in `index.html` line 45)
3. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.webp`

## Current Setup:

- The website is looking for: `images/reemie.jpg`
- If the image doesn't load, a beautiful placeholder with a heart emoji will show instead
- The photo will appear in a circular frame at the top of the landing page

## To Change the Filename:

If your photo has a different name, edit `index.html` line 45:
```html
<img src="images/YOUR_FILENAME.jpg" alt="Reemie" class="her-photo" id="herPhoto">
```

## Recommended Photo Size:

- **Square photos work best** (the photo will be cropped to a circle)
- **Minimum size**: 300x300 pixels
- **Optimal size**: 500x500 pixels or larger
- **File size**: Keep under 2MB for fast loading

## After Adding the Photo:

1. Save the image file in the `images` folder
2. Refresh your browser to see the photo
3. Commit and push to GitHub if you want it on the live site

---

**Note**: The placeholder will automatically hide once the image loads successfully! 💕

