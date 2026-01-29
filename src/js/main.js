/**
 * Application Entry Point
 * Initializes the TodoApp when DOM is ready
 */

import { TodoApp } from "./core/TodoApp.js";

// Initialize app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Todo App initializing...");

  try {
    window.todoApp = new TodoApp();
    console.log("Todo App initialized successfully!");
  } catch (error) {
    console.error("Failed to initialize Todo App:", error);

    // Show error to user
    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #f56565;
      color: white;
      padding: 15px 30px;
      border-radius: 8px;
      z-index: 9999;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    errorDiv.textContent =
      "Failed to load application. Please refresh the page.";
    document.body.appendChild(errorDiv);
  }
});

// Handle uncaught errors
window.addEventListener("error", (event) => {
  console.error("Uncaught error:", event.error);
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});
