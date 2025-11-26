import { v4 } from 'https://cdn.jsdelivr.net/npm/uuid@13.0.0/+esm'
import { removeItem, addItem } from "../storage.js";

export default function Item({ text, id }) {
    const self = $(`<li class="Item"></li>`);

    id = id ?? v4();

    addItem({ id, text });

    $('<span class="text"></span>').text(text).appendTo(self);

    $("<button></button>").text("Remove").on("click", () => {
        removeItem(id);
        self.remove();
    }).appendTo(self);

    return self;
}
