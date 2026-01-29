/**
 * Storage Manager
 * Handles localStorage operations with validation and error handling
 */

import { APP_CONFIG } from "../utils/constants.js";

export class StorageManager {
  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {*} value - Data to save
   * @returns {boolean} - Success status
   */
  static save(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Failed to save to localStorage: ${error}`);
      return false;
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} - Loaded data or default value
   */
  static load(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;

      return JSON.parse(item);
    } catch (error) {
      console.error(`Failed to load from localStorage: ${error}`);
      return defaultValue;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} - Success status
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove from localStorage: ${error}`);
      return false;
    }
  }

  /**
   * Clear all application data from localStorage
   * @returns {boolean} - Success status
   */
  static clearAll() {
    try {
      localStorage.removeItem(APP_CONFIG.STORAGE_KEY);
      localStorage.removeItem(APP_CONFIG.DARK_MODE_KEY);
      localStorage.removeItem(APP_CONFIG.FILTER_KEY);
      return true;
    } catch (error) {
      console.error(`Failed to clear localStorage: ${error}`);
      return false;
    }
  }

  /**
   * Validate stored todos data structure
   * @param {*} data - Data to validate
   * @returns {boolean} - Whether data is valid
   */
  static validateTodos(data) {
    if (!Array.isArray(data)) return false;

    return data.every(
      (todo) =>
        typeof todo === "object" &&
        todo !== null &&
        typeof todo.id === "number" &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean" &&
        typeof todo.createdAt === "string",
    );
  }

  /**
   * Get storage usage information
   * @returns {object} - Storage stats
   */
  static getStorageInfo() {
    try {
      const usage = localStorage.length;
      const quota = this.getStorageQuota();

      return {
        usage,
        quota,
        percentage: ((usage / quota) * 100).toFixed(2),
      };
    } catch (error) {
      console.error("Failed to get storage info:", error);
      return { usage: 0, quota: 5000, percentage: "0.00" };
    }
  }

  /**
   * Get approximate storage quota
   * @returns {number} - Approximate quota in items
   */
  static getStorageQuota() {
    // Most browsers allow ~5-10MB, roughly 5000-10000 items
    return 5000;
  }

  /**
   * Check if storage is available
   * @returns {boolean} - Whether localStorage is available
   */
  static isAvailable() {
    try {
      const testKey = "__storage_test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.warn("localStorage is not available:", error);
      return false;
    }
  }
}
