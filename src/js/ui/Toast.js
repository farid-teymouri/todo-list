/**
 * Toast Notification System
 * Creates and manages toast notifications
 */

import { APP_CONFIG, TOAST_TYPES } from "../utils/constants.js";

export class Toast {
  /**
   * Show a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Toast type (success, danger, warning, info)
   * @param {object} options - Additional options
   */
  static show(message, type = TOAST_TYPES.INFO, options = {}) {
    // Remove existing toast
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-message">${this.escapeHtml(message)}</span>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(toast);

    // Auto remove after duration
    const duration = options.duration || APP_CONFIG.TOAST_DURATION;
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-20px)";
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  }

  /**
   * Show success toast
   * @param {string} message - Message to display
   * @param {object} options - Additional options
   */
  static success(message, options = {}) {
    return this.show(message, TOAST_TYPES.SUCCESS, options);
  }

  /**
   * Show error/danger toast
   * @param {string} message - Message to display
   * @param {object} options - Additional options
   */
  static danger(message, options = {}) {
    return this.show(message, TOAST_TYPES.DANGER, options);
  }

  /**
   * Show warning toast
   * @param {string} message - Message to display
   * @param {object} options - Additional options
   */
  static warning(message, options = {}) {
    return this.show(message, TOAST_TYPES.WARNING, options);
  }

  /**
   * Show info toast
   * @param {string} message - Message to display
   * @param {object} options - Additional options
   */
  static info(message, options = {}) {
    return this.show(message, TOAST_TYPES.INFO, options);
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  static escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}
