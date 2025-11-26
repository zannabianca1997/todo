const itemsKey = "todo-items";

/**
 * @typedef {Object} TodoItem
 * @property {string} title - The todo title
 * @property {string} [text] - Optional todo description
 * @property {boolean} done - Completion status
 */

/**
 * @typedef {Object.<string, TodoItem>} TodoStorage - Storage mapping IDs to TodoItems
 */

/**
 * Retrieves all todo items from localStorage
 * @returns {TodoStorage} Object mapping todo IDs to todo data
 */
export function getItems() {
    return JSON.parse(localStorage.getItem(itemsKey)) ?? {};
}

/**
 * Adds or updates a todo item in localStorage
 * @param {Object} todoData - The todo data to store
 * @param {string} todoData.id - Unique identifier for the todo
 * @param {TodoItem} todoData.rest - Todo item properties (title, text, done)
 */
export function addItem({ id, ...props }) {
    const items = getItems();
    items[id] = props;
    localStorage.setItem(itemsKey, JSON.stringify(items));
}

/**
 * Removes a todo item from localStorage by ID
 * @param {string} id - The unique identifier of the todo to remove
 */
export function removeItem(id) {
    const items = getItems();
    delete items[id];
    localStorage.setItem(itemsKey, JSON.stringify(items));
}