import { v4 } from 'https://cdn.jsdelivr.net/npm/uuid@13.0.0/+esm'
import { removeItem, addItem } from "../utils/storage.js";

export default function Item({ text, title, id, done, onRemove }) {
    const self = $(`<li class="Item"></li>`);

    self.id = id ?? v4();
    self.done = done ?? false;

    self.title = title ?? (text ? text : '');
    self.text = text ?? '';

    $('<input type="checkbox" class="check">').prop("checked", self.done ? "checked" : null).on(
        "change",
        (e) => {
            self.done = e.target.checked;
            addItem(self.getData());
        }
    ).appendTo(self);

    const content = $('<div class="content"></div>').appendTo(self);

    $('<span class="title"></span>').text(self.title).appendTo(content);

    if (text) {
        $('<span class="description"></span>').text(self.text).appendTo(content);
    }

    self.remove = remove.bind(self, onRemove);
    self.getData = getData.bind(self);

    addItem(self.getData());

    $("<button></button>").text("Remove").on("click", () => {
        self.remove();
    }).appendTo(self);

    return self;
}

function remove(onRemove) {
    removeItem(this.id);
    $(this).remove();
    onRemove?.(this.id);
}

function getData() {
    return {
        id: this.id,
        title: this.title,
        text: this.text,
        done: this.done
    };
}