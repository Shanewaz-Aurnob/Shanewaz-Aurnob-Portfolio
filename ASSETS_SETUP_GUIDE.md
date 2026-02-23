# 📁 Media & Assets Management Guide

## Current Setup

Your project now has two dedicated folders for assets:

```
public/
├── resume/          ← PDF files (CVs, certificates, etc.)
└── images/          ← Image files (gallery, media, profile, etc.)
```

---

## 📋 What You Need to Add

### 1. **Resume Folder** (`public/resume/`)

**Required Files:**

| File Name | Purpose | Size (Recommended) |
|-----------|---------|-------------------|
| `cv.pdf` | Your CV for download | < 5MB |

**How to add:**
1. Save your CV as `cv.pdf`
2. Move it to `public/resume/cv.pdf`
3. The download button in the portfolio will automatically work!

---

### 2. **Images Folder** (`public/images/`)

Your portfolio needs **8 unique images** for media and gallery sections:

#### **Media Images (3 files)** - Used in "In The Media" section
| File Name | Category | Recommended Size |
|-----------|----------|------------------|
| `media-1.jpg` | The Daily Campus article | 800×450px |
| `media-2.jpg` | Bahannonews article | 800×450px |
| `media-3.jpg` | The Daily Campus article | 800×450px |

#### **Gallery Images (5 unique files)** - Used in "Social Work & Welfare" section
| File Name | Category | Recommended Size | Used In |
|-----------|----------|------------------|---------|
| `gallery-1.jpg` | Education (Community & School) | 400×300px | Gallery items #1 & #5 |
| `gallery-2.jpg` | Health (Awareness Camp) | 400×300px | Gallery item #2 |
| `gallery-3.jpg` | Charity (Disaster Relief) | 400×300px | Gallery item #3 |
| `gallery-4.jpg` | Community (Youth Skills) | 400×300px | Gallery item #4 |
| `gallery-5.jpg` | Health (Nutrition & Wellness) | 400×300px | Gallery item #6 |

**Total: 8 Images**

---

## 🖼️ Image Details & Mapping

### Media Section Images

**media-1.jpg**
- Used in: "In The Media" section - First article card
- Publication: The Daily Campus
- Headline: করোনায় ঘরবন্দী দিনগুলো যেমন কাটছে চবি শিক্ষার্থীদের

**media-2.jpg**
- Used in: "In The Media" section - Second article card
- Publication: Bahannonews
- Headline: বন্যার্তদের পাশে চবি শিক্ষার্থীরা

**media-3.jpg**
- Used in: "In The Media" section - Third article card
- Publication: The Daily Campus
- Headline: করোনা আতঙ্কে ক্লাস পরীক্ষা বর্জনের ঘোষণা চবি শিক্ষার্থীদের

### Gallery Section Images

**gallery-1.jpg** (used 2 times)
- Used in: 
  - Gallery item #1: "Community Education Drive" (March 2025)
  - Gallery item #5: "School Renovation Project" (November 2024)
- Category: Education
- Focus: Educational programs, learning activities

**gallery-2.jpg**
- Used in: Gallery item #2: "Health Awareness Camp" (February 2025)
- Category: Health
- Focus: Medical/health activities

**gallery-3.jpg**
- Used in: Gallery item #3: "Disaster Relief Fund" (January 2025)
- Category: Charity
- Focus: Emergency relief, community support

**gallery-4.jpg**
- Used in: Gallery item #4: "Youth Skill Development" (December 2024)
- Category: Community
- Focus: Training, skill development programs

**gallery-5.jpg**
- Used in: Gallery item #6: "Nutrition & Wellness" (October 2024)
- Category: Health
- Focus: Food, nutrition programs

---

## ✅ Step-by-Step Setup Instructions

### Step 1: Prepare Your Files
- [ ] Have your CV file ready → rename to `cv.pdf`
- [ ] Have/create 8 images ready (or use placeholders)
- [ ] Ensure images are in JPG/PNG format

### Step 2: Copy Resume
```bash
# Copy your CV to the resume folder
cp your_cv.pdf public/resume/cv.pdf
```

### Step 3: Copy Images
```bash
# Copy your 8 images to the images folder
cp media-1.jpg public/images/
cp media-2.jpg public/images/
cp media-3.jpg public/images/
cp gallery-1.jpg public/images/
cp gallery-2.jpg public/images/
cp gallery-3.jpg public/images/
cp gallery-4.jpg public/images/
cp gallery-5.jpg public/images/
```

Or manually:
1. Open `public/images/` folder in File Explorer
2. Drag and drop all 8 image files
3. Done!

### Step 4: Test
```bash
npm run dev
# Check that all images load and PDF download works
```

---

## 📂 Folder Structure After Setup

```
public/
├── resume/
│   └── cv.pdf                    ← Your CV
├── images/
│   ├── media-1.jpg               ← Media section image 1
│   ├── media-2.jpg               ← Media section image 2
│   ├── media-3.jpg               ← Media section image 3
│   ├── gallery-1.jpg             ← Gallery image (used 2x)
│   ├── gallery-2.jpg             ← Gallery image
│   ├── gallery-3.jpg             ← Gallery image
│   ├── gallery-4.jpg             ← Gallery image
│   └── gallery-5.jpg             ← Gallery image
├── (other public files...)
```

---

## 🔄 Code Updates

**All paths in the portfolio have been automatically updated to use local files:**

### In `src/data/portfolioData.ts`:
- ✅ Media images: `unsplash.com` URLs → `/images/media-*.jpg`
- ✅ Gallery images: `unsplash.com` URLs → `/images/gallery-*.jpg`

### In `src/App.tsx`:
- ✅ PDF download: `href = '/resume/cv.pdf'`
- ✅ PDF viewer: `src="/resume/cv.pdf"`

**No manual code updates needed!** Just add your files to the folders.

---

## 🎨 Image Format Recommendations

### Media Images (800×450px)
- Format: JPG or WebP
- Quality: 60-80% compression
- File size: ~50-100KB per image

### Gallery Images (400×300px)
- Format: JPG or WebP
- Quality: 70-90% compression
- File size: ~20-50KB per image

---

## 🔗 File Structure in Code

The following locations reference your files:

**Resume/PDF:**
```
publicUrl: /resume/cv.pdf
codeLocation: src/App.tsx (lines 167, 665)
```

**Media Images:**
```
publicUrls: /images/media-1.jpg, /images/media-2.jpg, /images/media-3.jpg
codeLocation: src/data/portfolioData.ts (lines 147-172)
```

**Gallery Images:**
```
publicUrls: /images/gallery-1.jpg through /images/gallery-5.jpg
codeLocation: src/data/portfolioData.ts (lines 175-222)
```

---

## ✨ What's Already Done

✅ Folders created and ready  
✅ Code updated to use local paths  
✅ PDF download configured  
✅ All Unsplash URLs replaced with local paths  
✅ Gallery and media sections configured  

---

## ❓ Troubleshooting

### Images not showing?
1. Check that files are in `public/images/`
2. Check file names match exactly (case-sensitive on Linux/Mac)
3. Check image format is JPG or PNG
4. Run `npm run dev` again

### PDF download not working?
1. Check `cv.pdf` is in `public/resume/`
2. Check browser console for errors
3. Try a different PDF file to test

### 404 errors in console?
1. Check folder structure in File Explorer
2. Verify file names are spelled correctly
3. Clear browser cache and refresh

---

## 📞 Quick Reference

| Need | Location | Status |
|------|----------|--------|
| Add resume | `public/resume/cv.pdf` | ✅ Ready |
| Add media images | `public/images/media-*.jpg` | ✅ Ready |
| Add gallery images | `public/images/gallery-*.jpg` | ✅ Ready |
| Code updates | None needed | ✅ Done |

---

**Your portfolio is ready for assets! Just add your files to the `public/resume/` and `public/images/` folders.** 🚀
