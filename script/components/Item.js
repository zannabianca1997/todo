import { ulid } from 'https://cdn.jsdelivr.net/npm/ulid@3.0.1/+esm'
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.0.3/+esm";
import { removeItem, addItem } from "../utils/storage.js";

/**
 * @typedef {Object} ItemProps
 * @property {string} [text] - Optional todo description
 * @property {string} [title] - Todo title (defaults to text if not provided)
 * @property {string} [id] - Unique identifier (generated if not provided)
 * @property {boolean} [done] - Completion status (defaults to false)
 * @property {(id: string) => void} [onRemove] - Optional callback for removal
 */

/**
 * Creates a new todo item component with checkbox, content, and remove button
 * @param {ItemProps} props - Item configuration
 * @returns {JQuery<HTMLElement>} jQuery-enhanced list element
 */
export default function Item({ text, title, id, done, onRemove, onEdit }) {
    const self = $(`<li class="Item"></li>`);

    self.id = id ?? ulid();
    self.done = done ?? false;

    self.title = title ?? (text ? text : '');
    self.text = text ?? '';

    self.doneCheckbox = $('<input type="checkbox" class="check">').prop("checked", self.done ? "checked" : null).on(
        "change",
        (e) => {
            self.done = e.target.checked;
            addItem(self.getData());
        }
    ).appendTo(self);

    self.content = $('<div class="content"></div>').appendTo(self);

    self.titleElement = $('<h3 class="title"></h3>').html(DOMPurify.sanitize(marked.parseInline(self.title))).appendTo(self.content);

    self.descriptionElement = null;
    if (text) {
        self.descriptionElement = $('<div class="description"></div>').html(DOMPurify.sanitize(marked.parse(self.text))).appendTo(self.content);
    }

    self.remove = remove.bind(self, onRemove);
    self.getData = getData.bind(self);
    self.update = update.bind(self);

    addItem(self.getData());

    $("<button></button>").text("Remove").on("click", () => {
        self.remove();
    }).appendTo(self);

    $("<button></button>").text("Edit").on("click", () => {
        onEdit(self.getData());
    }).appendTo(self);

    return self;
}

function update({ title, text, done }) {
    this.title = title ?? (text ? text : '');
    this.text = text ?? '';
    this.done = done ?? false;

    this.titleElement.html(DOMPurify.sanitize(marked.parseInline(this.title)));

    if (text) {
        if (!this.descriptionElement) {
            this.descriptionElement = $('<div class="description"></div>').appendTo(this.content);
        }
        this.descriptionElement.html(DOMPurify.sanitize(marked.parse(this.text)));
    } else if (this.descriptionElement) {
        this.descriptionElement.remove();
        this.descriptionElement = null;
    }

    this.doneCheckbox.prop("checked", this.done ? "checked" : null);

    addItem(this.getData());
}

/**
 * Removes the item from DOM and storage
 * @param {(id: string) => void} [onRemove] - Optional callback for removal
 * @returns {void}
 */
function remove(onRemove) {
    removeItem(this.id);
    $(this).remove();
    onRemove?.(this.id);
}

/**
 * Gets the current item data for storage/export
 * @returns {TodoItem & {id: string}} Item data with ID
 */
function getData() {
    return {
        id: this.id,
        title: this.title,
        text: this.text,
        done: this.done
    };
}
