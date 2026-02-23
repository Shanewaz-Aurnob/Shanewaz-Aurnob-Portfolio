<div align="center">

# Shanewaz Aurnob - Portfolio

A modern, animated personal portfolio website built with React, TypeScript, and Framer Motion.

### 🌐 [Live Demo](https://shanewazaurnob.vercel.app/)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## ✨ Features

- **Smooth Animations** - Powered by Framer Motion with scroll-triggered effects, parallax backgrounds, and micro-interactions
- **Custom Cursor** - Interactive custom cursor that responds to hoverable elements
- **Responsive Design** - Fully responsive layout optimized for all device sizes
- **Dark Theme** - Modern dark aesthetic with accent color highlights
- **Interactive Components** - Tilt cards, magnetic buttons, and text masking effects
- **Sections Include:**
  - Hero with animated text and tech stack marquee
  - Projects showcase with detailed modals
  - Education timeline
  - Work experience & volunteer activities
  - Certificates gallery with modal viewer
  - Research publications
  - Media coverage
  - Contact form with copy-to-clipboard functionality
  - Visitor counter

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 |
| **Build Tool** | Vite 6 |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **Backend** | Express.js (for visitor counter API) |
| **Database** | SQLite (for visitor tracking) |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shanewaz-Aurnob/Shanewaz-Aurnob-Portfolio.git
   cd Shanewaz-Aurnob-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
├── public/
│   ├── images/
│   │   ├── certificates/    # Certificate images
│   │   └── experience/      # Experience images
│   └── resume/              # Resume PDF
├── src/
│   ├── components/
│   │   ├── sections/        # Page sections (Header, Hero, Projects)
│   │   └── shared/          # Reusable components
│   ├── data/
│   │   └── portfolioData.ts # All portfolio content data
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📝 Customization

To customize this portfolio for your own use:

1. Update `src/data/portfolioData.ts` with your own:
   - Projects
   - Education history
   - Work experience
   - Certificates
   - Research publications
   - Contact information
   - Social links

2. Replace images in `public/images/` with your own

3. Update the resume PDF in `public/resume/`

4. Modify color themes in `src/index.css`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove dist folder |
| `npm run lint` | Run TypeScript type checking |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

**Shanewaz Aurnob**

- 📧 Email: aurnob.csecu@gmail.com
- 💼 LinkedIn: [shanewaz-aurnob](https://linkedin.com/in/shanewaz-aurnob)
- 🐙 GitHub: [Shanewaz-Aurnob](https://github.com/Shanewaz-Aurnob)

---

<div align="center">
  <sub>Built with ❤️ by Shanewaz Aurnob</sub>
</div>
