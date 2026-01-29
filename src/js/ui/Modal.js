/**
 * Modal Component
 * Handles modal dialog functionality
 */

export class Modal {
  /**
   * Create a new modal instance
   * @param {HTMLElement|string} element - Modal element or selector
   */
  constructor(element) {
    this.element =
      typeof element === "string" ? document.querySelector(element) : element;

    if (!this.element) {
      throw new Error("Modal element not found");
    }

    this.isOpen = false;
    this.init();
  }

  /**
   * Initialize modal event listeners
   */
  init() {
    // Close on click outside
    this.element.addEventListener("click", (e) => {
      if (e.target === this.element) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Open the modal
   */
  open() {
    this.element.classList.add("active");
    this.isOpen = true;
    document.body.style.overflow = "hidden"; // Prevent scrolling

    // Focus first focusable element
    this.focusFirstElement();
  }

  /**
   * Close the modal
   */
  close() {
    this.element.classList.remove("active");
    this.isOpen = false;
    document.body.style.overflow = ""; // Restore scrolling

    // Return focus to triggering element if available
    if (this.triggerElement) {
      this.triggerElement.focus();
    }
  }

  /**
   * Toggle modal visibility
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Focus first focusable element in modal
   */
  focusFirstElement() {
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  /**
   * Set trigger element for focus restoration
   * @param {HTMLElement} element - Element that triggered the modal
   */
  setTriggerElement(element) {
    this.triggerElement = element;
  }

  /**
   * Check if modal is currently open
   * @returns {boolean} - Modal open state
   */
  isOpen() {
    return this.isOpen;
  }

  /**
   * Destroy modal instance and cleanup
   */
  destroy() {
    this.element.removeEventListener("click", this.handleClick);
    document.removeEventListener("keydown", this.handleKeydown);
  }
}
