/**
 * Utility Helper Functions
 * Reusable helper functions for the application
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text
 */
export function sanitizeHTML(text) {
  if (typeof text !== "string") return "";

  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Format date to human-readable format
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Validate todo text input
 * @param {string} text - Todo text to validate
 * @returns {boolean} - Whether text is valid
 */
export function validateTodoText(text) {
  return typeof text === "string" && text.trim().length > 0;
}

/**
 * Generate unique ID
 * @returns {number} - Unique timestamp-based ID
 */
export function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between executions
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - Whether element is visible
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 * @param {HTMLElement|string} element - Element or selector
 * @param {object} options - Scroll options
 */
export function smoothScrollTo(element, options = {}) {
  const el =
    typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return;

  const defaultOptions = {
    behavior: "smooth",
    block: "start",
    ...options,
  };

  el.scrollIntoView(defaultOptions);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy:", error);
    return false;
  }
}

/**
 * Check if dark mode is preferred by OS
 * @returns {boolean} - Whether dark mode is preferred
 */
export function isOSDarkMode() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Get element position relative to viewport
 * @param {HTMLElement} element - Element to get position
 * @returns {object} - Position object with top, left, width, height
 */
export function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}
