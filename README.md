# Contles Landing Page

A modern landing page built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- ⚡️ React 19 with Vite
- 🎨 Tailwind CSS v4
- ✨ Framer Motion animations
- 🧭 React Router for navigation
- 📱 Fully responsive design

## Getting Started

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Connect to GitHub repository**:
   - Create a new repository on GitHub (or use an existing one)
   - Add the remote:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git branch -M main
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose the `gh-pages` branch and `/ (root)` folder
   - Click Save

4. **Deploy**:
   ```bash
   npm run deploy
   ```

   This will:
   - Build your project
   - Deploy it to the `gh-pages` branch
   - Your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Important Notes

- The base path is configured for `/Contles-landing/`. If your repository has a different name, update the base path in:
  - `vite.config.js` (line 7)
  - `src/main.jsx` (line 8)
- After the first deployment, GitHub Pages may take a few minutes to become available.
- Subsequent deployments can be done simply by running `npm run deploy`.
