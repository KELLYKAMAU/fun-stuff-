# 💕 Valentine's Day Website MVP 💕

A beautiful, romantic, and interactive one-page website to ask someone special to be your Valentine's date.

## ✨ Features

- **Romantic Landing Section** - Beautiful animated hearts and personalized greeting
- **Personal Message Section** - Space for your heartfelt message
- **Interactive Question** - "Will you be my Valentine?" with Yes/No buttons
- **Fun "No" Button Behavior** - Moves away when hovered, changes messages, and gets smaller with each click
- **Success Screen** - Celebratory animation when "Yes" is clicked
- **Background Music** - Optional romantic background music with toggle
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** - Beautiful transitions and floating effects
- **Modern Design** - Pink/red/white theme with gradient backgrounds

## 🚀 Quick Start

### 1. Personalize Your Website

Open `script.js` and update the `CONFIG` object at the top of the file:

```javascript
const CONFIG = {
    herName: "Sarah",                    // Replace with her name
    yourName: "John",                    // Replace with your name
    personalMessage: "I've been thinking about you a lot lately, and I can't imagine spending Valentine's Day with anyone else. You make every day brighter, and I'd love to create some beautiful memories together. Will you be my Valentine?"  // Replace with your personal message
};
```

### 2. Add Background Music (Optional)

1. Find a romantic, royalty-free music file (MP3 format)
2. Place it in the project folder
3. Update the `<audio>` tag in `index.html`:

```html
<audio id="backgroundMusic" loop>
    <source src="your-music-file.mp3" type="audio/mpeg">
</audio>
```

**Note:** Due to browser autoplay policies, music will only play after user interaction (clicking the music toggle button).

### 3. Open the Website

Simply open `index.html` in your web browser:

- **Windows**: Double-click `index.html` or right-click → "Open with" → Choose your browser
- **Mac**: Double-click `index.html` or right-click → "Open with" → Choose your browser
- **Or**: Drag and drop `index.html` into your browser window

That's it! Your website is ready to use locally.

## 📁 Project Structure

```
xc/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
└── README.md          # This file
```

## 🌐 Deploy Online

### Option 1: Netlify (Recommended - Easiest)

1. **Create a Netlify account** at [netlify.com](https://www.netlify.com)

2. **Drag and Drop Method:**
   - Go to your Netlify dashboard
   - Drag and drop your project folder (containing `index.html`, `styles.css`, `script.js`) onto the Netlify interface
   - Your site will be live instantly with a random URL like `https://random-name-123.netlify.app`

3. **Custom Domain (Optional):**
   - In Netlify dashboard, go to "Site settings" → "Domain management"
   - Add your custom domain

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd xc
   vercel
   ```

3. **Follow the prompts** - Your site will be live at a `vercel.app` URL

### Option 3: GitHub Pages

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com)
   - Create a new repository (e.g., `valentines-website`)

2. **Upload your files:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/valentines-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io/valentines-website`

### Option 4: Surge.sh (Simple CLI)

1. **Install Surge:**
   ```bash
   npm install -g surge
   ```

2. **Deploy:**
   ```bash
   cd xc
   surge
   ```

3. **Follow the prompts** - Your site will be live at a `surge.sh` URL

## 🎨 Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-pink: #ff6b9d;      /* Main pink color */
    --light-pink: #ffb3d9;        /* Light pink */
    --deep-pink: #ff1493;         /* Deep pink */
    --rose-red: #ff1744;          /* Rose red */
    /* ... */
}
```

### Change Fonts

Update the Google Fonts import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap" rel="stylesheet">
```

Then update the font-family in `styles.css`.

### Modify Animations

All animations are defined in `styles.css` using `@keyframes`. Feel free to adjust timing, effects, and behaviors.

## 📱 Mobile Optimization

The website is fully responsive and optimized for:
- 📱 Mobile phones (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)

## 🎯 Tips for Best Results

1. **Test on Multiple Devices** - Make sure it looks good on your phone before sharing
2. **Keep Your Message Genuine** - Write from the heart
3. **Test the Link** - Make sure the deployed link works before sharing
4. **Add Music** - Background music adds a special touch (but keep it subtle)
5. **Share at the Right Time** - Timing is everything! 💕

## 🐛 Troubleshooting

### Music Not Playing?
- Browsers block autoplay. Users need to click the music toggle button first
- Make sure your music file is in the correct format (MP3)
- Check browser console for errors

### Styles Not Loading?
- Make sure `styles.css` is in the same folder as `index.html`
- Check that the file path in the HTML is correct: `<link rel="stylesheet" href="styles.css">`

### JavaScript Not Working?
- Make sure `script.js` is in the same folder as `index.html`
- Check browser console for errors (F12 → Console)
- Make sure you've updated the CONFIG object with your information

### Deployment Issues?
- Make sure all files (HTML, CSS, JS) are in the root of your deployment folder
- Some platforms require an `index.html` file in the root
- Check platform-specific documentation

## 💡 Future Enhancements (Optional)

- Add a photo gallery section
- Include a countdown timer to Valentine's Day
- Add more interactive elements
- Create a "memories" section
- Add social media sharing buttons
- Include a calendar integration for the date

## 📄 License

This project is open source and available for personal use. Feel free to customize it for your special someone!

## 💝 Good Luck!

Wishing you the best of luck! This website is designed to be sweet, respectful, and memorable. Make it your own and make it special! 💕

---

**Made with 💕 for someone special**

