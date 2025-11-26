import Item from "./Item.js";
import { exportTodosToMarkdown } from "../utils/export.js";

/**
 * Creates a list container for managing todo items
 * @param {Object} props - List configuration (currently empty)
 * @returns {JQuery<HTMLUListElement>} jQuery-enhanced list element with bound methods
 */
export default function List({ }) {
    const self = $(`<ul class="List"></ul>`);

    /** @type {Object.<string, JQuery>} */
    self.items = {};

    self.addItem = addItem.bind(self);
    self.removeDone = removeDone.bind(self);
    self.exportTodos = exportTodos.bind(self);

    return self;
}

/**
 * Adds a new item to the list
 * @param {ItemProps} props - Item configuration properties
 * @returns {void}
 */
function addItem(props) {
    const item = new Item({ ...props, onRemove: (id) => { delete this.items[id]; } });
    this.items[item.id] = item;
    this.append(item);
}

/**
 * Removes all completed items from the list and storage
 * @returns {void}
 */
function removeDone() {
    const items = Object.values(this.items).filter((item) => item.done);
    items.forEach((item) => item.remove());
}

/**
 * Exports all items in the list to markdown file
 * @returns {void}
 */
function exportTodos() {
    // Extract data from each item
    const todoData = Object.values(this.items).map(item => item.getData());

    // Call the export utility function with the extracted data
    exportTodosToMarkdown(todoData);
}