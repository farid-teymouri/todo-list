/**
 * Theme Manager
 * Handles dark/light mode switching and persistence
 */

import { APP_CONFIG } from "../utils/constants.js";
import { StorageManager } from "./StorageManager.js";

export class ThemeManager {
  constructor() {
    this.isDarkMode = false;
    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    // Load saved theme preference
    const savedTheme = StorageManager.load(APP_CONFIG.DARK_MODE_KEY);

    if (savedTheme !== null) {
      this.isDarkMode = savedTheme;
    } else {
      // Use OS preference if no saved preference
      this.isDarkMode = this.getOSPreference();
    }

    this.applyTheme();
  }

  /**
   * Toggle between dark and light mode
   * @returns {boolean} - New theme state
   */
  toggle() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.savePreference();
    return this.isDarkMode;
  }

  /**
   * Apply current theme to DOM
   */
  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  /**
   * Save theme preference to storage
   */
  savePreference() {
    StorageManager.save(APP_CONFIG.DARK_MODE_KEY, this.isDarkMode);
  }

  /**
   * Get OS color scheme preference
   * @returns {boolean} - Whether OS prefers dark mode
   */
  getOSPreference() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  /**
   * Listen for OS theme changes
   */
  listenForOSChanges() {
    if (!window.matchMedia) return;

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        // Only update if user hasn't explicitly set a preference
        const savedTheme = StorageManager.load(APP_CONFIG.DARK_MODE_KEY);
        if (savedTheme === null) {
          this.isDarkMode = e.matches;
          this.applyTheme();
        }
      });
  }

  /**
   * Get current theme state
   * @returns {boolean} - Current theme state
   */
  getCurrentTheme() {
    return this.isDarkMode;
  }

  /**
   * Set theme explicitly
   * @param {boolean} isDark - Theme state to set
   */
  setTheme(isDark) {
    this.isDarkMode = isDark;
    this.applyTheme();
    this.savePreference();
  }
}
