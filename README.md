# Game Artist Portfolio Website

A modern, dark mystic-themed portfolio website for game artists featuring a responsive design with no scrolling on individual pages.

## Features

✨ **Design Highlights:**
- Dark mystic theme with purple accents
- Responsive design (desktop, tablet, mobile)
- No-scroll layout - all content fits in viewport
- Smooth animations and transitions
- Professional gradient effects

📱 **Navigation:**
- Home - Project showcase
- Games - Game project portfolio
- Art - Standalone artwork
- About - Personal bio and skills

🎨 **Project Display:**
- Square grid layout for projects
- Sorted by most recent to oldest
- Project image, title, date, and tasks
- Hover effects with zoom and shadow

🔗 **Contact Links:**
- LinkedIn
- Itch.io
- CV (PDF download)
- Email

## Project Structure

```
J4Jouko.github.io/
├── index.html          # Home page
├── games.html          # Games portfolio
├── art.html            # Art portfolio
├── about.html          # About page
├── styles.css          # Main stylesheet
├── README.md           # This file
└── assets/
    ├── projects/       # Home page project images
    ├── games/          # Game project images
    ├── art/            # Art images
    └── cv.pdf          # Your CV file
```

## Customization Guide

### 1. Update Personal Information

**Home Page (index.html):**
- Replace project titles, dates, and descriptions in project cards
- Update project images in `assets/projects/`

**Games Page (games.html):**
- Add your game projects with descriptions
- Update project images in `assets/games/`

**Art Page (art.html):**
- Add your artwork pieces
- Update images in `assets/art/`

**About Page (about.html):**
- Update the "My Journey" text with your bio
- Add/remove skills in the Skills section

### 2. Update Contact Links

Edit the footer links in all HTML files:

```html
<!-- Change these URLs to your profiles -->
<a href="https://linkedin.com/in/yourprofile" class="footer-link">
<a href="https://yourname.itch.io" class="footer-link">
<a href="assets/cv.pdf" class="footer-link">
<a href="mailto:your.email@example.com" class="footer-link">
```

### 3. Customize Colors

Edit the CSS variables in `styles.css` (lines 9-25):

```css
:root {
    --bg-primary: #0a0e27;          /* Main background */
    --bg-secondary: #151d3f;        /* Secondary background */
    --bg-tertiary: #1a2345;         /* Card background */
    --accent-primary: #7c3aed;      /* Main accent (purple) */
    --accent-secondary: #a78bfa;    /* Light accent */
    --text-primary: #e5e7eb;        /* Main text color */
    --text-secondary: #9ca3af;      /* Secondary text */
    --border-color: #2d3548;        /* Border color */
    --hover-bg: #1f2a4a;            /* Hover background */
}
```

### 4. Add New Projects

To add more projects to the home page:

1. Place your image in `assets/projects/`
2. Copy and paste a project-card div:

```html
<div class="project-card">
    <div class="project-image">
        <img src="assets/projects/newproject.jpg" alt="Project Name">
    </div>
    <div class="project-info">
        <h3 class="project-title">Your Project Title</h3>
        <p class="project-date">Month Year</p>
        <p class="project-tasks">Your tasks and responsibilities</p>
    </div>
</div>
```

3. The grid will automatically arrange them - projects are sorted by date (newest first)

### 5. Update Logo

Change the logo text in the navbar:
```html
<div class="nav-logo">Your Name</div>
```

### 6. Add Your CV

Place your CV PDF file in `assets/cv.pdf`

## Image Specifications

- **Project Images:** 
  - Size: 1000x1000px (square)
  - Format: JPG or PNG
  - Location: `assets/projects/`, `assets/games/`, `assets/art/`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Responsive Breakpoints

- **Desktop:** Full width
- **Tablet:** 768px and below - 3-4 columns
- **Mobile:** 480px and below - 2 columns

## Font & Typography

The site uses system fonts for optimal performance:
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

## No-Scroll Implementation

Each page uses `overflow: hidden` on the body and viewport-fitting layout:
- Navigation: 70px height
- Footer: 70px height
- Main content: Fills remaining space with scrollable projects
- All content fits without horizontal scrolling

## Deployment

### GitHub Pages
1. Push this repository to GitHub
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://yourusername.github.io`

### Other Hosts
- Works with any static hosting (Netlify, Vercel, etc.)
- No server-side processing required
- Just upload the files and navigate to index.html

## Tips for Best Results

1. **Images:** Use high-quality square images for consistent appearance
2. **Descriptions:** Keep task descriptions concise (1-2 lines)
3. **Dates:** Use consistent date format (Month Year)
4. **Performance:** Optimize images to <200KB each for fast loading
5. **SEO:** Update page titles and meta descriptions for search engines

## Troubleshooting

**Images not showing:**
- Check file paths are correct
- Ensure image files are in the right folders
- Verify file names match exactly (case-sensitive on some servers)

**Layout broken on mobile:**
- Clear browser cache
- Check viewport meta tag is present
- Test in Chrome DevTools mobile view

**Scrolling issues:**
- Check that your content is not wider than the viewport
- Reduce image sizes if needed
- Test overflow settings in CSS

## License

This portfolio template is free to use and modify for your personal portfolio.

---

**Last Updated:** January 2026
**Version:** 1.0
