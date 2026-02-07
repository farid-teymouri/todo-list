# ⚡ Task Manager JS

A production-inspired task management application built with **vanilla JavaScript**, focusing on modular architecture, performance, accessibility, and Progressive Web App standards.

This repository is part of **Farid Labs Foundations** — projects designed to strengthen core engineering skills without relying on heavy frameworks.

![Preview](https://raw.githubusercontent.com/farid-teymouri/todo-list/32fc6c6eedfc6f8ea234afeaa2533c1eb1fac881/public/screenshot-1.svg)

![License](https://img.shields.io/github/license/farid-teymouri/task-manager-js)
![Last Commit](https://img.shields.io/github/last-commit/farid-teymouri/task-manager-js)

---

## 🌐 Live Demo

👉 https://todo-list-sooty-eight-88.vercel.app/

✅ Installable PWA  
✅ Offline-ready  
✅ Fully responsive  
✅ Dark / Light mode

---

## 🧠 Engineering Goals

Unlike typical todo apps, this project emphasizes **software design fundamentals**:

- Writing framework-independent JavaScript
- Structuring scalable front-end architecture
- Applying separation of concerns
- Building resilient UI behavior
- Prioritizing accessibility
- Optimizing runtime performance

> The objective is not complexity — it's **clarity, maintainability, and correctness**.

---

## ✨ Core Capabilities

### Task Lifecycle

- Create, edit, delete, and complete tasks
- Drag & drop reordering
- Real-time search
- Smart filtering (all / active / completed)
- Persistent storage via localStorage

### User Experience

- System-aware dark/light theme
- Keyboard-first navigation
- Toast feedback
- Undo deletion flow
- Fully responsive layout

### Technical Highlights

- Modular ES6 architecture
- Debounced search for performance
- XSS-safe rendering
- Offline support via Service Worker
- PWA installability
- Accessible UI (ARIA-compliant)

---

## 🏗 Architecture Overview

The project follows a modular structure inspired by production systems.

```bash
task-manager-js/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD for GitHub Pages
├── public/                     # Public assets (deployment ready)
│   ├── assets/                 # Static assets for production
│   │   └── icons/              # SVG icons
│   │       ├── sun.svg
│   │       ├── moon.svg
│   │       ├── search.svg
│   │       ├── edit.svg
│   │       ├── delete.svg
│   │       └── add.svg
│   ├── index.html              # Main HTML file
│   ├── manifest.json           # PWA manifest
│   ├── service-worker.js       # Service worker for offline support
│   ├── icon-192.svg            # App icon (192x192)
│   ├── icon-512.svg            # App icon (512x512)
│   └── screenshot-1.svg        # App screenshot for stores
├── src/                        # Source code
│   ├── assets/                 # Static assets (source)
│   │   └── icons/              # SVG icons
│   │       ├── sun.svg
│   │       ├── moon.svg
│   │       ├── search.svg
│   │       ├── edit.svg
│   │       ├── delete.svg
│   │       └── add.svg
│   ├── css/                    # Stylesheets
│   │   ├── _variables.css      # CSS custom properties
│   │   ├── _base.css           # Base styles and resets
│   │   ├── _components.css     # Component styles
│   │   ├── _layout.css         # Layout styles
│   │   ├── _utilities.css      # Utility classes
│   │   └── main.css            # Main stylesheet (entry point)
│   ├── js/                     # JavaScript modules
│   │   ├── core/               # Core application logic
│   │   │   ├── TodoApp.js      # Main application class
│   │   │   ├── StorageManager.js # LocalStorage management
│   │   │   └── ThemeManager.js # Dark/light mode management
│   │   ├── ui/                 # UI components
│   │   │   ├── TodoRenderer.js # Todo rendering logic
│   │   │   ├── Toast.js        # Toast notification system
│   │   │   └── Modal.js        # Modal dialog system (legacy)
│   │   ├── utils/              # Utility functions
│   │   │   ├── helpers.js      # Helper functions
│   │   │   └── constants.js    # Application constants
│   │   └── main.js             # Application entry point
│   └── lib/                    # Third-party libraries (if any)
├── .editorconfig               # Editor configuration
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Code formatting rules
├── .vercelignore               # Vercel deployment ignore rules
├── build.js                    # Build script for production
├── package.json                # NPM package configuration
├── vercel.json                 # Vercel deployment configuration
├── LICENSE                     # MIT License
└── README.md                   # This file
```

### Design Principles Applied

- Separation of Concerns
- Modular Design
- Single Responsibility
- Predictable State Handling
- Progressive Enhancement

This structure keeps the codebase easy to reason about and extend.

---

## 🛠 Tech Stack

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| JavaScript (ES6+) | Application architecture |
| CSS3              | Responsive, themeable UI |
| Service Worker    | Offline capability       |
| Web Manifest      | PWA installation         |
| localStorage      | Client persistence       |
| SVG               | Lightweight iconography  |

> No frameworks. No abstractions. Just the platform.

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Node.js 18+ (optional, for development tools)

### Installation

### Option 1: Quick Start (No Node.js Required)

#### 1. Clone or download the repository:

```bash
git clone https://github.com/farid-teymouri/todo-list.git
cd todo-list
```

#### 2. Open public/index.html directly in your browser <br>

That's it! The app works without any build step.

### Option 2: Development Mode (With Node.js)

#### 1. Clone the repository:

```bash
git clone https://github.com/farid-teymouri/todo-list.git
cd todo-list
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Start development server:

```bash
npm run dev
```

#### 4. Open your browser and navigate to http://localhost:3000

### Build for Production

```bash
npm run build
```

## 🎯 Why Vanilla JavaScript?

#### Frameworks evolve quickly.

#### Fundamentals do not.

#### This project reinforces:

- DOM mastery
- Browser APIs
- Event systems
- Performance awareness
- Architectural thinking
- Engineers who understand the platform build better systems — regardless of stack.

## 📱 Progressive Web App

#### Install it like a native application:

- Works offline
- Launches in standalone mode
- Cached assets
- Fast load times

## ♿ Accessibility

#### Built with inclusive design in mind:

- ✅ Keyboard navigable
- ✅ Screen-reader friendly
- ✅ Strong color contrast
- ✅ Focus management
- ✅ Reduced motion support

#### Accessibility is not a feature — it's a responsibility.

## 🔒 Security Considerations

- Input sanitization
- Safe DOM rendering
- Storage validation

#### Even small apps deserve safe defaults.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

```bash
MIT License

Copyright (c) 2026 Farid Teymouri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

Farid Teymouri

- Email: senior.farid72@gmail.com
- Portfolio: faridteymouri.vercel.app

## 🙏 Acknowledgments

- Icons from <a href="https://heroicons.com" target="_blank">Heroicons</a>
- Inspired by <a href="http://todomvc.com" target="_blank">TodoMVC</a> project
- CSS variables inspired by <a href="https://tailwindcss.com" target="_blank">Tailwind CSS</a>
- Drag & drop implementation based on modern web APIs
- Built with ❤️ using vanilla **JavaScript**

### Made with ❤️ by Farid Teymouri

⭐ If you found this project helpful, please give it a star! ⭐
