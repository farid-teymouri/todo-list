/**
 * Todo Application
 * Main application class managing todo functionality
 */

import { StorageManager } from "./StorageManager.js";
import { ThemeManager } from "./ThemeManager.js";
import { TodoRenderer } from "../ui/TodoRenderer.js";
import { Toast } from "../ui/Toast.js";
import { Modal } from "../ui/Modal.js";
import {
  APP_CONFIG,
  FILTER_TYPES,
  KEYBOARD_SHORTCUTS,
  ARIA_LABELS,
  MESSAGES,
} from "../utils/constants.js";
import { validateTodoText, generateId } from "../utils/helpers.js";

export class TodoApp {
  /**
   * Create a new TodoApp instance
   */
  constructor() {
    // State
    this.todos = [];
    this.filter = FILTER_TYPES.ALL;
    this.searchQuery = "";
    this.deletedTodo = null;
    this.deletedTime = null;

    // Managers
    this.themeManager = new ThemeManager();
    this.storageManager = StorageManager;

    // Initialize
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.cacheDOMElements();
    this.loadFromStorage();
    this.setupRenderer();
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.render();
  }

  /**
   * Cache DOM elements for performance
   */
  cacheDOMElements() {
    this.elements = {
      todoInput: document.getElementById("todoInput"),
      addBtn: document.getElementById("addBtn"),
      todoList: document.getElementById("todoList"),
      filterBtns: document.querySelectorAll(".filter-btn"),
      clearCompletedBtn: document.getElementById("clearCompleted"),
      taskCountEl: document.getElementById("taskCount"),
      themeToggle: document.getElementById("themeToggle"),
      searchBtn: document.getElementById("searchBtn"),
      searchContainer: document.getElementById("searchContainer"),
      searchInput: document.getElementById("searchInput"),
      clearSearchBtn: document.getElementById("clearSearch"),
      closeSearchBtn: document.getElementById("closeSearch"),
    };
  }

  /**
   * Setup todo renderer
   */
  setupRenderer() {
    this.renderer = new TodoRenderer(this.elements.todoList);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Add todo
    this.elements.addBtn.addEventListener("click", () => this.handleAddTodo());
    this.elements.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleAddTodo();
    });

    // Filter todos
    this.elements.filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.filter = e.target.dataset.filter;
        this.saveFilter();
        this.updateFilterButtons();
        this.render();
      });
    });

    // Clear completed
    this.elements.clearCompletedBtn.addEventListener("click", () =>
      this.clearCompleted(),
    );

    // Theme toggle
    this.elements.themeToggle.addEventListener("click", () =>
      this.toggleTheme(),
    );

    // Search button - toggle search bar
    this.elements.searchBtn.addEventListener("click", () =>
      this.toggleSearchBar(),
    );

    // Search input
    this.elements.searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value;
      this.render();
    });

    // Clear search button
    this.elements.clearSearchBtn.addEventListener("click", () => {
      this.elements.searchInput.value = "";
      this.searchQuery = "";
      this.render();
      this.elements.searchInput.focus();
    });

    // Close search button
    this.elements.closeSearchBtn.addEventListener("click", () =>
      this.closeSearchBar(),
    );
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + E: Focus on input
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === KEYBOARD_SHORTCUTS.FOCUS_INPUT
      ) {
        e.preventDefault();
        this.elements.todoInput.focus();
      }

      // Ctrl/Cmd + D: Toggle dark mode
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === KEYBOARD_SHORTCUTS.TOGGLE_DARK_MODE
      ) {
        e.preventDefault();
        this.toggleTheme();
      }

      // Escape: Close search or clear input
      if (e.key === KEYBOARD_SHORTCUTS.ESCAPE) {
        if (this.elements.searchContainer.classList.contains("active")) {
          this.closeSearchBar();
        } else {
          this.elements.todoInput.value = "";
        }
      }

      // Forward slash (/): Focus search
      if (
        e.key === "/" &&
        !this.elements.searchInput.contains(document.activeElement)
      ) {
        e.preventDefault();
        this.openSearchBar();
      }

      // Ctrl/Cmd + K: Toggle search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggleSearchBar();
      }
    });
  }

  /**
   * Handle adding a new todo
   */
  handleAddTodo() {
    const text = this.elements.todoInput.value.trim();

    if (!validateTodoText(text)) {
      Toast.warning(MESSAGES.NO_TASK_INPUT);
      return;
    }

    this.addTodo(text);
    this.elements.todoInput.value = "";
    this.elements.todoInput.focus();
  }

  /**
   * Add a new todo
   * @param {string} text - Todo text
   */
  addTodo(text) {
    const newTodo = {
      id: generateId(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.todos.push(newTodo);
    this.saveToStorage();
    this.render();
    Toast.success(MESSAGES.TASK_ADDED);
  }

  /**
   * Toggle todo completion status
   * @param {number} id - Todo ID
   */
  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
      this.render();
    }
  }

  /**
   * Edit todo text
   * @param {number} id - Todo ID
   */
  editTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;

    const newText = prompt("Edit task:", todo.text);
    if (newText !== null && validateTodoText(newText)) {
      todo.text = newText.trim();
      this.saveToStorage();
      this.render();
      Toast.success(MESSAGES.TASK_EDITED);
    }
  }

  /**
   * Delete a todo
   * @param {number} id - Todo ID
   */
  deleteTodo(id) {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) return;

    // Save for undo
    this.deletedTodo = this.todos[todoIndex];
    this.deletedTime = Date.now();

    this.todos.splice(todoIndex, 1);
    this.saveToStorage();
    this.render();
    Toast.danger(MESSAGES.TASK_DELETED);

    // Setup undo
    this.setupUndo();
  }

  /**
   * Setup undo functionality for deleted todo
   */
  setupUndo() {
    setTimeout(() => {
      if (confirm(MESSAGES.CONFIRM_RESTORE)) {
        if (Date.now() - this.deletedTime < APP_CONFIG.MAX_UNDO_TIME) {
          this.todos.push(this.deletedTodo);
          this.saveToStorage();
          this.render();
          Toast.success(MESSAGES.TASK_RESTORED);
        }
      }
      // Clear undo state
      this.deletedTodo = null;
      this.deletedTime = null;
    }, 1000);
  }

  /**
   * Clear all completed todos
   */
  clearCompleted() {
    const completedCount = this.todos.filter((t) => t.completed).length;

    if (completedCount === 0) {
      Toast.info(MESSAGES.NO_COMPLETED);
      return;
    }

    if (confirm(MESSAGES.CONFIRM_CLEAR)) {
      this.todos = this.todos.filter((t) => !t.completed);
      this.saveToStorage();
      this.render();
      Toast.success(MESSAGES.TASKS_CLEARED);
    }
  }

  /**
   * Toggle dark mode
   */
  toggleTheme() {
    const isDark = this.themeManager.toggle();
    Toast.info(
      isDark ? MESSAGES.DARK_MODE_ENABLED : MESSAGES.DARK_MODE_DISABLED,
    );
  }
  /**
   * Toggle search bar visibility
   */
  toggleSearchBar() {
    if (this.elements.searchContainer.classList.contains("active")) {
      this.closeSearchBar();
    } else {
      this.openSearchBar();
    }
  }
  /**
   * Open search bar with animation
   */
  openSearchBar() {
    this.elements.searchContainer.classList.add("active");
    this.elements.searchInput.focus();
    this.elements.searchInput.select();
  }

  /**
   * Close search bar with animation
   */
  closeSearchBar() {
    this.elements.searchContainer.classList.remove("active");
    this.elements.searchInput.value = "";
    this.searchQuery = "";
    this.render();

    // Return focus to task input
    setTimeout(() => {
      this.elements.todoInput.focus();
    }, 300);
  }
  /**
   * Update filter button active states
   */
  updateFilterButtons() {
    this.elements.filterBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === this.filter);
    });
  }

  /**
   * Update task count display
   */
  updateTaskCount() {
    const activeCount = this.todos.filter((t) => !t.completed).length;
    this.elements.taskCountEl.textContent = `${activeCount} tasks remaining`;

    // Update clear button state
    const hasCompleted = this.todos.some((t) => t.completed);
    this.elements.clearCompletedBtn.disabled = !hasCompleted;
  }

  /**
   * Render todos to DOM
   */
  render() {
    this.renderer.render(this.todos, this.filter, this.searchQuery, {
      onToggle: (id) => this.toggleTodo(id),
      onEdit: (id) => this.editTodo(id),
      onDelete: (id) => this.deleteTodo(id),
      onReorder: (orderedIds) => this.reorderTodos(orderedIds),
    });

    this.updateTaskCount();
    this.updateFilterButtons();
  }

  /**
   * Reorder todos based on new order
   * @param {Array<number>} orderedIds - Array of todo IDs in new order
   */
  reorderTodos(orderedIds) {
    this.todos.sort(
      (a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id),
    );
    this.saveToStorage();
  }

  /**
   * Save todos to storage
   */
  saveToStorage() {
    this.storageManager.save(APP_CONFIG.STORAGE_KEY, this.todos);
  }

  /**
   * Save current filter to storage
   */
  saveFilter() {
    this.storageManager.save(APP_CONFIG.FILTER_KEY, this.filter);
  }

  /**
   * Load data from storage
   */
  loadFromStorage() {
    // Load todos
    const savedTodos = this.storageManager.load(APP_CONFIG.STORAGE_KEY, []);
    if (this.storageManager.validateTodos(savedTodos)) {
      this.todos = savedTodos;
    }

    // Load filter
    const savedFilter = this.storageManager.load(APP_CONFIG.FILTER_KEY);
    if (savedFilter && Object.values(FILTER_TYPES).includes(savedFilter)) {
      this.filter = savedFilter;
    }
  }
}
