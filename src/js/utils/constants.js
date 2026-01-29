/**
 * Application Constants
 * Centralized configuration and constants
 */

export const APP_CONFIG = {
  STORAGE_KEY: "todos",
  DARK_MODE_KEY: "darkMode",
  FILTER_KEY: "filter",
  MAX_UNDO_TIME: 5000, // 5 seconds
  TOAST_DURATION: 2500,
  LOCAL_STORAGE_VERSION: "1.0.0",
};

export const FILTER_TYPES = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info",
};

export const KEYBOARD_SHORTCUTS = {
  TOGGLE_DARK_MODE: "d",
  FOCUS_INPUT: "e",
  ESCAPE: "Escape",
  ENTER: "Enter",
};

export const ARIA_LABELS = {
  TOGGLE_THEME: "Toggle theme",
  ADD_TASK: "Add task",
  EDIT_TASK: "Edit task",
  DELETE_TASK: "Delete task",
  TOGGLE_TASK: "Toggle task completion",
  SEARCH_TASKS: "Search tasks",
  CLOSE_SEARCH: "Close search",
  CLEAR_COMPLETED: "Clear completed tasks",
};

export const MESSAGES = {
  EMPTY_ALL: "No tasks! Get started ✨",
  EMPTY_ACTIVE: "No active tasks! 🎉",
  EMPTY_COMPLETED: "No completed tasks! ✅",
  EMPTY_SEARCH: "No results found! 🔍",
  TASK_ADDED: "New task added! ✨",
  TASK_DELETED: "Task deleted!",
  TASK_EDITED: "Task edited!",
  TASK_RESTORED: "Task restored!",
  TASKS_CLEARED: "Completed tasks cleared!",
  NO_COMPLETED: "No completed tasks!",
  CONFIRM_CLEAR: "Are you sure you want to clear all completed tasks?",
  CONFIRM_RESTORE: "Do you want to restore this task?",
  NO_TASK_INPUT: "Please enter a task!",
  DARK_MODE_ENABLED: "Dark mode enabled!",
  DARK_MODE_DISABLED: "Light mode enabled!",
  UNDO_AVAILABLE: "Task deleted! Click to undo.",
};
