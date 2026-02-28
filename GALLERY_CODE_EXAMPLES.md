# Horizontal Scroll Gallery - Code Examples & Customization

## 📝 Quick Reference

### Basic Setup (Already Implemented)
The Gallery component is already integrated into your portfolio. No additional setup needed!

```tsx
// Already in: src/components/sections/Gallery.tsx
import Gallery from './components/sections/Gallery';

// Already in: src/App.tsx
<Gallery />
```

## 🎨 Customization Examples

### Example 1: Increase Card Width for Desktop

**Current:**
```tsx
className="group flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer"
```

**Make cards bigger:**
```tsx
className="group flex-shrink-0 w-80 sm:w-96 md:w-[420px] cursor-pointer"
// w-72 (288px) → w-80 (320px) → w-[420px]
```

### Example 2: Adjust Scroll Jump Distance

**Current:**
```tsx
const scroll = (direction: 'left' | 'right') => {
  if (scrollContainerRef.current) {
    const scrollAmount = 400;  // pixels
```

**Scroll by one card width (MD breakpoint):**
```tsx
const scrollAmount = 384;  // Approx 96px gap + w-96 card
```

**Scroll more aggressively:**
```tsx
const scrollAmount = 600;  // Scroll further per click
```

### Example 3: Change Image Aspect Ratio

**Current (portfolio):**
```tsx
<div className="relative h-64 sm:h-72 md:h-80 overflow-hidden flex-shrink-0">
```

**Make images taller (portrait):**
```tsx
<div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden flex-shrink-0">
```

**Make images wider (landscape):**
```tsx
<div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
```

### Example 4: Faster Animations

**Current (smooth):**
```tsx
transition={{ duration: 0.4, delay: idx * 0.05 }}  // 400ms, 50ms stagger
```

**Make it snappier:**
```tsx
transition={{ duration: 0.25, delay: idx * 0.03 }}  // 250ms, 30ms stagger
```

**Slower, more dramatic:**
```tsx
transition={{ duration: 0.6, delay: idx * 0.08 }}  // 600ms, 80ms stagger
```

### Example 5: Add a New Category

**Step 1: Update categories array**
```tsx
const categories = ["All", "Education", "Health", "Charity", "Community", "Awards"];
//                                                                           ^^^^^^
```

**Step 2: Add color scheme**
```tsx
const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Education: { text: "text-blue-400", bg: "from-blue-500/20 to-blue-400/10", border: "border-blue-400/30" },
  Health: { text: "text-red-400", bg: "from-red-500/20 to-red-400/10", border: "border-red-400/30" },
  Charity: { text: "text-pink-400", bg: "from-pink-500/20 to-pink-400/10", border: "border-pink-400/30" },
  Community: { text: "text-green-400", bg: "from-green-500/20 to-green-400/10", border: "border-green-400/30" },
  // Add new one:
  Awards: { text: "text-yellow-400", bg: "from-yellow-500/20 to-yellow-400/10", border: "border-yellow-400/30" }
};
```

**Step 3: Add items to portfolioData.ts**
```tsx
{
  id: 'award-001',
  image: '/images/awards/award-badge.jpg',
  title: 'Best Social Worker 2024',
  description: 'Recognized for outstanding contributions to community health.',
  fullDesc: 'Awarded by the National Social Welfare Board for...',
  category: 'Awards',
  date: 'December 2024',
  location: 'Dhaka, Bangladesh'
}
```

### Example 6: Custom Overlay Colors

**Current (dark gradient):**
```tsx
className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
```

**Blue tint overlay:**
```tsx
className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/50 to-transparent"
```

**More transparent overlay:**
```tsx
className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
```

### Example 7: Hide Scroll Buttons

**Current (buttons visible):**
```tsx
<motion.button
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: canScrollLeft ? 1 : 0.3, x: 0 }}
  // ... button code
```

**Hide buttons completely:**
```tsx
<motion.button
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 0, x: -20 }}  // Always hidden
  // ... button code
  className="hidden"  // Add this to className
```

**Or collapse them on mobile:**
```tsx
className="hidden sm:absolute left-4 top-1/2 -translate-y-1/2 ..."
//         ^^^^^^ hidden on mobile
```

### Example 8: Modify Lightbox Layout

**Current (3/5 image, 2/5 content):**
```tsx
<div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 sm:p-8 md:p-10">
  <div className="md:col-span-3">  {/* Image */}
  <div className="md:col-span-2">  {/* Content */}
```

**Split 50/50:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 md:p-10">
  <div className="md:col-span-1">  {/* Image */}
  <div className="md:col-span-1">  {/* Content */}
```

**Full width image, stacked content:**
```tsx
<div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:p-10">
  <div className="">  {/* Image - full width */}
  <div className="">  {/* Content below */}
```

### Example 9: Change Card Gap Default

**Current (mobile-first scaling):**
```tsx
className="flex gap-6 sm:gap-7 md:gap-8 overflow-x-auto"
```

**Tighter gaps:**
```tsx
className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto"
```

**Looser gaps for dramatic effect:**
```tsx
className="flex gap-8 sm:gap-10 md:gap-12 overflow-x-auto"
```

### Example 10: Custom Filter Button Styles

**Current (accent green when active):**
```tsx
className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-500 ${
  galleryFilter === category
    ? "bg-gradient-to-r from-accent to-accent/80 text-dark shadow-lg shadow-accent/30 border border-accent"
    : "bg-white/5 border border-white/10 text-white/70 hover:border-accent/50 hover:bg-white/10"
}`}
```

**Make buttons larger:**
```tsx
className={`px-8 py-4 rounded-full text-base font-semibold ...`
//         ^^^^ ^^^ bigger padding
```

**Use pill-style outline:**
```tsx
className={`px-6 py-3 rounded-full text-sm font-semibold ... ${
  galleryFilter === category
    ? "bg-transparent text-accent border-2 border-accent"
    : "bg-white/5 border border-white/10 text-white/70"
}`}
```

## 🔄 Real-World Examples

### Portfolio A: High-End Photography
```tsx
// Wider cards with taller images
className="group flex-shrink-0 w-96 sm:w-[420px] md:w-[500px]"
<div className="relative h-96 sm:h-[420px] md:h-[500px]">
// Larger gaps
className="flex gap-8 sm:gap-10 md:gap-12"
// Professional overlay
className="from-black/70 via-black/30 to-transparent"
```

### Portfolio B: Minimal Tech Design
```tsx
// Smaller cards
className="group flex-shrink-0 w-64 sm:w-72 md:w-80"
<div className="relative h-48 sm:h-56 md:h-64">
// Tight spacing
className="flex gap-3 sm:gap-4 md:gap-5"
// Subtle overlay
className="from-black/40 via-black/20 to-transparent"
// Remove category badge
{/* <motion.div className={`...`}> */}
```

### Portfolio C: Social Impact Focus
```tsx
// Current implementation is optimized for this!
// Large readable cards
className="group flex-shrink-0 w-72 sm:w-80 md:w-96"
// Generous spacing
className="flex gap-6 sm:gap-7 md:gap-8"
// Rich category colors
// Lightbox shows full story with impact details
```

## 🧪 Testing Code Snippets

### Test Scroll Button Logic
```tsx
// Add to Gallery component temporarily
useEffect(() => {
  console.log('Scroll Left Enabled:', canScrollLeft);
  console.log('Scroll Right Enabled:', canScrollRight);
}, [canScrollLeft, canScrollRight]);
```

### Test Filter Logic
```tsx
// Add to Gallery component temporarily
useEffect(() => {
  console.log('Filter:', galleryFilter);
  console.log('Filtered Items:', filteredData.length);
}, [galleryFilter, filteredData]);
```

### Test Lightbox Logic
```tsx
// Add to Gallery component temporarily
useEffect(() => {
  console.log('Lightbox Open:', galleryLightbox.isOpen);
  console.log('Selected Index:', galleryLightbox.index);
  console.log('Selected Item:', galleryLightbox.items[galleryLightbox.index]);
}, [galleryLightbox]);
```

## 📱 Responsive Testing

### Mobile Test (DevTools)
```
Device: iPhone 12 (390px)
Expected: Single card visible, drag to scroll
Test: Try dragging left/right → should scroll smoothly
```

### Tablet Test (DevTools)
```
Device: iPad (768px)
Expected: ~1.5-2 cards visible
Test: Look for gap-7 spacing, w-80 width
```

### Desktop Test (Browser)
```
Device: Full screen (1920px+)
Expected: 2-3 full cards visible with scroll buttons
Test: Click scroll buttons → should jump 400px per click
```

## 🎯 Performance Tweaks

### Reduce Animation Count
```tsx
// Remove delay stagger for faster render
transition={{ duration: 0.4 }}  // Remove: delay: idx * 0.05
```

### Disable Scroll Buttons on Mobile
```tsx
className="hidden sm:absolute left-4 ..."  // Hide on mobile
```

### Optimize Image Loading
```tsx
// In portfolioData.ts, use optimized image paths
image: '/images/gallery/optimized-small.jpg'  // Use WebP if possible
```

## 🔐 Accessibility Improvements

### Add ARIA Labels
```tsx
<motion.button
  aria-label={`Scroll gallery ${direction === 'left' ? 'left' : 'right'}`}
  title={`Scroll ${direction === 'left' ? 'left' : 'right'}`}
  // ... rest
```

### Keyboard Navigation
```tsx
onKeyDown={(e) => {
  if (e.key === 'ArrowLeft') scroll('left');
  if (e.key === 'ArrowRight') scroll('right');
}}
```

### Focus Management
```tsx
<div
  ref={scrollContainerRef}
  role="region"
  aria-label="Gallery carousel"
  tabIndex={0}
  // ... rest
>
```

---

**Need help?** Check the component's main file at `src/components/sections/Gallery.tsx` for the full implementation!
