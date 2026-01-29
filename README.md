# 📝 Todo List Application

A professional, fully-featured todo list application built with vanilla JavaScript. This project demonstrates modern web development best practices including modular architecture, accessibility, responsive design, and performance optimization.

![Todo List Preview](../todo-list/public/screenshot-1.svg)
<br>
![License](https://img.shields.io/github/license/farid-teymouri/todo-list)
![GitHub stars](https://img.shields.io/github/stars/farid-teymouri/todo-list)
![GitHub forks](https://img.shields.io/github/forks/farid-teymouri/todo-list)
![GitHub issues](https://img.shields.io/github/issues/farid-teymouri/todo-list)
![GitHub last commit](https://img.shields.io/github/last-commit/farid-teymouri/todo-list)

## ✨ Features

### Core Functionality

- ✅ **Task Management**: Add, edit, delete, and complete tasks
- 🎯 **Drag & Drop**: Reorder tasks with intuitive drag and drop
- 🔍 **Search**: Real-time search through all tasks
- 📊 **Filtering**: View all, active, or completed tasks
- 💾 **Persistence**: All data saved to localStorage automatically

### User Experience

- 🎨 **Dark/Light Mode**: Toggle between themes with system preference detection
- 📱 **Fully Responsive**: Perfect on mobile, tablet, and desktop
- ⌨️ **Keyboard Shortcuts**: Fast navigation with keyboard
- 🍞 **Undo Feature**: Accidentally deleted a task? Undo it!
- 📢 **Toast Notifications**: Real-time feedback for all actions

### Technical Excellence

- ♿ **Accessibility**: Full ARIA support, keyboard navigation, screen reader friendly
- ⚡ **Performance**: Optimized rendering, debounced search, efficient DOM updates
- 🧪 **Modular Architecture**: Clean separation of concerns
- 🔒 **Security**: XSS protection, input sanitization
- 📦 **PWA Ready**: Install as a native app on any device
- 🌐 **Offline Support**: Works without internet connection

## 🎯 Tech Stack

| Technology             | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| **Vanilla JavaScript** | ES6+ modules, no frameworks                      |
| **CSS3**               | Custom properties, animations, responsive design |
| **SVG**                | Scalable vector icons                            |
| **localStorage**       | Client-side data persistence                     |
| **Service Worker**     | Offline functionality, PWA                       |
| **Web Manifest**       | App installation capability                      |

## 📁 Project Structure

```bash
todo-list/
├── .github/
│ └── workflows/
│ └── deploy.yml # CI/CD for GitHub Pages
├── public/ # Public assets (deployment ready)
│ ├── index.html # Main HTML file
│ ├── manifest.json # PWA manifest
│ ├── service-worker.js # Service worker for offline support
│ ├── icon-192.svg # App icon (192x192)
│ ├── icon-512.svg # App icon (512x512)
│ └── screenshot-1.svg # App screenshot for stores
├── src/ # Source code
│ ├── assets/ # Static assets
│ │ └── icons/ # SVG icons
│ │ ├── sun.svg
│ │ ├── moon.svg
│ │ ├── search.svg
│ │ ├── edit.svg
│ │ ├── delete.svg
│ │ └── add.svg
│ ├── css/ # Stylesheets
│ │ ├── \_variables.css # CSS custom properties
│ │ ├── \_base.css # Base styles and resets
│ │ ├── \_components.css # Component styles
│ │ ├── \_layout.css # Layout styles
│ │ ├── \_utilities.css # Utility classes
│ │ └── main.css # Main stylesheet (entry point)
│ ├── js/ # JavaScript modules
│ │ ├── core/ # Core application logic
│ │ │ ├── TodoApp.js # Main application class
│ │ │ ├── StorageManager.js # LocalStorage management
│ │ │ └── ThemeManager.js # Dark/light mode management
│ │ ├── ui/ # UI components
│ │ │ ├── TodoRenderer.js # Todo rendering logic
│ │ │ ├── Toast.js # Toast notification system
│ │ │ └── Modal.js # Modal dialog system
│ │ ├── utils/ # Utility functions
│ │ │ ├── helpers.js # Helper functions
│ │ │ └── constants.js # Application constants
│ │ └── main.js # Application entry point
│ └── lib/ # Third-party libraries (if any)
├── .editorconfig # Editor configuration
├── .gitignore # Git ignore rules
├── .prettierrc # Code formatting rules
├── build.js # Build script
├── package.json # NPM package configuration
├── LICENSE # MIT License
└── README.md # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Node.js 18+ (optional, for development tools)

### Installation

### Option 1: Quick Start (No Node.js Required)

#### 1. Clone or download the repository:

```bash
git clone https://github.com/yourusername/todo-list.git
cd todo-list
```

#### 2. Open public/index.html directly in your browser <br>

That's it! The app works without any build step.

### Option 2: Development Mode (With Node.js)

#### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-list.git
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
# Build the project
npm run build
# Or directly
node build.js
```

This creates an optimized dist/ folder ready for deployment.

## 🎹 Keyboard Shortcuts

| Shortcut       | Action                          |
| -------------- | ------------------------------- |
| `Ctrl/Cmd + E` | Focus on task input field       |
| `Ctrl/Cmd + D` | Toggle dark/light mode          |
| `/`            | Focus on search field           |
| `Ctrl/Cmd + K` | Toggle search bar               |
| `Enter`        | Add task or confirm search      |
| `Escape`       | Close search bar or clear input |
| `Click + Drag` | Reorder tasks                   |

## 📱 PWA Installation

This app is a Progressive Web App (PWA). You can install it on your device:

### On Mobile (Chrome/Android):

1. Open the app in Chrome <br>
2. Tap the ⋮ menu button <br>
3. Select "Install app" or "Add to Home screen" <br>
4. The app will be installed like a native application! <br>

### On Desktop (Chrome):

1. Open the app in Chrome <br>
2. Click the install icon (⊕) in the address bar <br>
3. Click "Install" <br>
4. The app opens in a separate window without browser chrome <br>

### On iOS (Safari):

1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

## 🌟 Features in Detail

### Task Management

- Add Tasks: Type in the input field and press Enter or click the + button
- Complete Tasks: Check the checkbox to mark as complete
- Edit Tasks: Click the edit (✏️) button to modify task text
- Delete Tasks: Click the delete (🗑️) button to remove a task
- Reorder Tasks: Drag and drop tasks to change their order

### Search & Filter

- Search: Click the search icon and type to filter tasks by text
- Filter All: Show all tasks (default)
- Filter Active: Show only incomplete tasks
- Filter Completed: Show only completed tasks

### Dark/Light Mode

- Toggle between dark and light themes using the sun/moon button
- Automatically detects system preference on first visit
- Theme preference is saved and persists across sessions

### Undo Feature

- When you delete a task, you have 5 seconds to undo
- A confirmation dialog appears asking if you want to restore the task
- This prevents accidental deletions

### Offline Support

- Thanks to the Service Worker, the app works offline
- Your tasks are saved to localStorage, so they persist
- The app can be used without an internet connection

## 🎨 Customization

### Changing Colors

#### Edit `src/css/_variables.css`:

```css
:root {
  --accent-primary: #667eea; /* Change this color */
  --accent-primary-hover: #5568d3; /* And this */
  /* ... other colors */
}
```

### Adding New Features

#### The modular architecture makes it easy to extend:

2. Add new UI components: Create files in `src/js/ui/`
3. Add new core features: Create files in `src/js/core/`
4. Add new utilities: Create files in `src/js/utils/`
5. Add new icons: Place SVG files in `src/assets/icons/`

### Modifying Keyboard Shortcuts

#### Edit `src/js/core/TodoApp.js` in the `setupKeyboardShortcuts()` method.

## 🔒 Security Features

- XSS Protection: All user input is sanitized before rendering
- Input Validation: Todo text is validated before saving
- Secure Storage: Data validation for localStorage operations
- Content Security Policy: Recommended CSP headers in netlify.toml

## ♿ Accessibility

### This app follows WCAG 2.1 AA standards:

- ✅ Full keyboard navigation support
- ✅ ARIA labels and roles on all interactive elements
- ✅ Proper focus management
- ✅ Sufficient color contrast in both themes
- ✅ Screen reader friendly
- ✅ Reduced motion support for users with vestibular disorders

## 📊 Browser Support

| Browser     | Version | Support |
| ----------- | ------- | ------- |
| **Chrome**  | 90+     | ✅ Full |
| **Firefox** | 88+     | ✅ Full |
| **Safari**  | 14+     | ✅ Full |
| **Edge**    | 90+     | ✅ Full |
| **Opera**   | 76+     | ✅ Full |

## 🤝 Contributing

### Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Code Style

- Follow the existing code style
- Use Prettier for formatting: `npm run format`
- Write meaningful commit messages

## 🐛 Troubleshooting

### App doesn't load

- Clear browser cache and reload
- Check browser console for errors
- Ensure you're using a modern browser

### Tasks not saving

- Check if localStorage is enabled in your browser
- Clear localStorage: Open DevTools → Application → Local Storage → Clear
- Check browser storage quota

### Dark mode not working

- Check if JavaScript is enabled
- Try toggling the theme button manually
- Clear site data and reload

### PWA not installing

- Ensure you're using HTTPS (or localhost)
- Make sure manifest.json is accessible
- Check browser console for Service Worker errors

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
