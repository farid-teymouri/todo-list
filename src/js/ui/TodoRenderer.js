/**
 * Todo Renderer
 * Handles rendering of todo items to the DOM
 */

import { sanitizeHTML, formatDate } from '../utils/helpers.js';

export class TodoRenderer {
  /**
   * Create a new renderer instance
   * @param {HTMLElement} todoListElement - Todo list container
   */
  constructor(todoListElement) {
    this.todoList = todoListElement;
    this.draggedItem = null;
  }

  /**
   * Render todos to the DOM
   * @param {Array} todos - Array of todo objects
   * @param {string} filter - Current filter type
   * @param {string} searchQuery - Search query string
   * @param {object} callbacks - Callback functions for interactions
   */
  render(todos, filter, searchQuery = '', callbacks = {}) {
    // Filter todos based on current filter and search
    const filteredTodos = this.filterTodos(todos, filter, searchQuery);

    // Clear existing list
    this.todoList.innerHTML = '';

    // Show empty state if no todos
    if (filteredTodos.length === 0) {
      this.renderEmptyState(filter, searchQuery);
      return;
    }

    // Render each todo item
    filteredTodos.forEach((todo, index) => {
      const todoElement = this.createTodoElement(todo, callbacks);
      this.todoList.appendChild(todoElement);
    });

    // Setup drag and drop after rendering
    this.setupDragAndDrop(callbacks.onReorder);
  }

  /**
   * Filter todos based on filter type and search query
   * @param {Array} todos - Array of todo objects
   * @param {string} filter - Filter type
   * @param {string} searchQuery - Search query
   * @returns {Array} - Filtered todos
   */
  filterTodos(todos, filter, searchQuery) {
    let filtered = [...todos];

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(todo => todo.text.toLowerCase().includes(query));
    }

    // Apply completion filter
    switch (filter) {
      case 'active':
        return filtered.filter(todo => !todo.completed);
      case 'completed':
        return filtered.filter(todo => todo.completed);
      default:
        return filtered;
    }
  }

  /**
   * Render empty state message
   * @param {string} filter - Current filter type
   * @param {string} searchQuery - Search query
   */
  renderEmptyState(filter, searchQuery) {
    let message = 'No tasks! Get started ✨';

    if (searchQuery) {
      message = 'No results found! 🔍';
    } else if (filter === 'completed') {
      message = 'No completed tasks! ✅';
    } else if (filter === 'active') {
      message = 'No active tasks! 🎉';
    }

    this.todoList.innerHTML = `
      <li class="empty-state">
        ${sanitizeHTML(message)}
      </li>
    `;
  }

  /**
   * Create a todo list item element
   * @param {object} todo - Todo object
   * @param {object} callbacks - Callback functions
   * @returns {HTMLElement} - Todo list item element
   */
  createTodoElement(todo, callbacks) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.draggable = true;
    li.dataset.id = todo.id;

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', 'Toggle task completion');

    checkbox.addEventListener('change', () => {
      if (callbacks.onToggle) callbacks.onToggle(todo.id);
    });

    // Create content wrapper
    const contentDiv = document.createElement('div');
    contentDiv.className = 'todo-content';

    // Create text span
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.innerHTML = sanitizeHTML(todo.text);

    // Create meta info
    const metaDiv = document.createElement('div');
    metaDiv.className = 'todo-meta';
    metaDiv.textContent = `Created at: ${formatDate(todo.createdAt)}`;

    contentDiv.appendChild(textSpan);
    contentDiv.appendChild(metaDiv);

    // Create actions wrapper
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'todo-actions';

    // Create edit button
    const editBtn = this.createActionButton(
      'edit-btn',
      'assets/icons/edit.svg',
      'Edit task',
      () => {
        if (callbacks.onEdit) callbacks.onEdit(todo.id);
      }
    );

    // Create delete button
    const deleteBtn = this.createActionButton(
      'delete-btn',
      'assets/icons/delete.svg',
      'Delete task',
      () => {
        if (callbacks.onDelete) callbacks.onDelete(todo.id);
      }
    );

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // Assemble todo item
    li.appendChild(checkbox);
    li.appendChild(contentDiv);
    li.appendChild(actionsDiv);

    // Add drag event listeners
    li.addEventListener('dragstart', () => this.handleDragStart(li));
    li.addEventListener('dragend', () => this.handleDragEnd(li));

    return li;
  }

  /**
   * Create an action button
   * @param {string} className - Button class name
   * @param {string} iconSrc - Icon SVG path
   * @param {string} ariaLabel - ARIA label
   * @param {Function} onClick - Click handler
   * @returns {HTMLElement} - Button element
   */
  createActionButton(className, iconSrc, ariaLabel, onClick) {
    const button = document.createElement('button');
    button.className = `todo-btn ${className}`;
    button.setAttribute('aria-label', ariaLabel);

    const img = document.createElement('img');
    img.src = iconSrc;
    img.className = 'icon';
    img.alt = '';

    button.appendChild(img);
    button.addEventListener('click', onClick);

    return button;
  }

  /**
   * Setup drag and drop functionality
   * @param {Function} onReorder - Callback for reorder event
   */
  setupDragAndDrop(onReorder) {
    this.todoList.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(e.clientY);

      if (afterElement == null) {
        this.todoList.appendChild(this.draggedItem);
      } else {
        this.todoList.insertBefore(this.draggedItem, afterElement);
      }
    });

    this.todoList.addEventListener('drop', () => {
      if (onReorder) {
        const orderedIds = Array.from(this.todoList.children).map(li => parseInt(li.dataset.id));
        onReorder(orderedIds);
      }
    });
  }

  /**
   * Handle drag start event
   * @param {HTMLElement} element - Dragged element
   */
  handleDragStart(element) {
    this.draggedItem = element;
    setTimeout(() => element.classList.add('dragging'), 0);
  }

  /**
   * Handle drag end event
   * @param {HTMLElement} element - Dragged element
   */
  handleDragEnd(element) {
    element.classList.remove('dragging');
    this.draggedItem = null;
  }

  /**
   * Get element to insert after during drag
   * @param {number} y - Mouse Y position
   * @returns {HTMLElement|null} - Element to insert after
   */
  getDragAfterElement(y) {
    const draggableElements = [...this.todoList.querySelectorAll('.todo-item:not(.dragging)')];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  /**
   * Clear the todo list
   */
  clear() {
    this.todoList.innerHTML = '';
  }
}
