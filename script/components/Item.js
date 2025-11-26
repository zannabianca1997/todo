import { v4 } from 'https://cdn.jsdelivr.net/npm/uuid@13.0.0/+esm'
import { removeItem, addItem } from "../storage.js";

export default function Item({ text, id, done }) {
    const self = $(`<li class="Item"></li>`);

    id = id ?? v4();
    done = done ?? false;

    addItem({ id, text, done });

    $('<input type="checkbox" class="check">').prop("checked", done ? "checked" : null).on(
        "change",
        (e) => {
            const done = e.target.checked;
            addItem({ id, done, text });
        }
    ).appendTo(self);

    $('<span class="text"></span>').text(text).appendTo(self);

    $("<button></button>").text("Remove").on("click", () => {
        removeItem(id);
        self.remove();
    }).appendTo(self);

    return self;
}
