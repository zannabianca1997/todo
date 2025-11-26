import { v4 } from 'https://cdn.jsdelivr.net/npm/uuid@13.0.0/+esm'
import { removeItem, addItem } from "../storage.js";

export default function Item({ text, title, id, done, onRemove }) {
    const self = $(`<li class="Item"></li>`);

    self.id = id ?? v4();
    self.done = done ?? false;

    title = title ?? (text ? text : '');
    text = text ?? '';

    addItem({ id: self.id, title, text, done: self.done });

    $('<input type="checkbox" class="check">').prop("checked", self.done ? "checked" : null).on(
        "change",
        (e) => {
            self.done = e.target.checked;
            addItem({ id: self.id, done: self.done, title, text });
        }
    ).appendTo(self);

    const content = $('<div class="content"></div>').appendTo(self);

    $('<span class="title"></span>').text(title).appendTo(content);

    if (text) {
        $('<span class="description"></span>').text(text).appendTo(content);
    }

    self._jremove = self.remove;
    self._onRemove = onRemove;

    self.remove = remove.bind(self);

    $("<button></button>").text("Remove").on("click", () => {
        self.remove();
    }).appendTo(self);

    return self;
}

function remove() {
    removeItem(this.id);
    this._jremove();
    this._onRemove?.(this.id);
}