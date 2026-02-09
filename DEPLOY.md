# Quick Deployment Guide

Follow these steps to update your GitHub Pages portfolio:

## Update Your Site

### 1. Replace Files in Your Repository

Copy these files from this package to your `zapatify.github.io` repository:

- `_config.yml` → **Replace** your existing `_config.yml`
- `index.md` → **Replace** your existing `index.md`
- `Gemfile` → **Replace** your existing `Gemfile`
- `README.md` → **Replace** your existing `README.md`
- `jobzappy.md` → **New file** (add to repo)
- `zappynotes.md` → **New file** (add to repo)
- `tktrakker.md` → **New file** (add to repo)
- `amortizy.md` → **New file** (add to repo)

### 2. Update Personal Information

Before deploying, update these placeholders:

#### In `_config.yml`:
```yaml
aux_links:
  GitHub Profile: "https://github.com/zapatify"
  LinkedIn: "#"  # ← Add your LinkedIn URL
```

#### In each project file (jobzappy.md, zappynotes.md, etc.):
- Replace `[Add your demo URL if available]` with actual demo links
- Replace `[Add your repo URL if public]` with GitHub repository links
- Add any specific metrics or numbers where indicated

### 3. Deploy to GitHub

```bash
# Navigate to your repository
cd zapatify.github.io

# Add all new files
git add .

# Commit changes
git commit -m "Update portfolio with project pages"

# Push to GitHub
git push origin main
```

### 4. Verify Deployment

1. Wait 1-2 minutes for GitHub Actions to build
2. Visit https://zapatify.github.io
3. Check that all navigation links work
4. Verify all project pages display correctly

## Next Steps

### Add More Content

To add a new project:

1. Create a new `.md` file (e.g., `newproject.md`)
2. Add frontmatter:
   ```yaml
   ---
   title: New Project
   layout: default
   nav_order: 6
   ---
   ```
3. Write your content using the template in README.md
4. Commit and push

### Customize Appearance

Edit `_config.yml` to change:
- Site title
- Description
- Color scheme (light/dark)
- Links in header

### Test Locally (Optional)

Before pushing to GitHub, test locally:

```bash
bundle install
bundle exec jekyll serve
# View at http://localhost:4000
```

## Common Issues

**Navigation not showing?**
- Check that nav_order is set in frontmatter
- Ensure YAML is valid (no tabs, proper spacing)

**Site not updating?**
- Clear browser cache
- Wait full 2-3 minutes after push
- Check GitHub Actions tab for errors

**Styling looks wrong?**
- Verify `theme: just-the-docs` is in _config.yml
- Check Gemfile has correct dependencies

## Get Help

- Review the full README.md for detailed instructions
- Check Just the Docs documentation: https://just-the-docs.com
- Verify GitHub Pages is enabled in repo settings

---

You're all set! Your portfolio should be live within 2-3 minutes of pushing to GitHub.
