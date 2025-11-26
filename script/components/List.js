import Item from "./Item.js";
import { exportTodosToMarkdown } from "../utils/export.js";

export default function List({ }) {
    const self = $(`<ul class="List"></ul>`);

    self.items = {};

    self.addItem = addItem.bind(self);
    self.removeDone = removeDone.bind(self);
    self.exportTodos = exportTodos.bind(self);

    return self;
}

function addItem(props) {
    const item = new Item({ ...props, onRemove: (id) => { delete this.items[id]; } });
    this.items[item.id] = item;
    this.append(item);
}

function removeDone() {
    const items = Object.values(this.items).filter((item) => item.done);
    items.forEach((item) => item.remove());
}

function exportTodos() {
    // Extract data from each item
    const todoData = Object.values(this.items).map(item => item.getData());

    // Call the export utility function with the extracted data
    exportTodosToMarkdown(todoData);
}