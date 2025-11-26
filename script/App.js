import List from "./components/List.js";
import Dialog from "./components/Dialog.js";
import { getItems } from "./storage.js";

export default function App({ }) {

    const list = new List({});

    for (const [id, { text }] of Object.entries(getItems())) {
        list.addItem({ text, id });
    }

    const dialog = new Dialog({
        addItem: (text) => {
            list.addItem({ text });
        }
    });

    const button = $("<button class='add-item'>Add Item</button>").on("click", () => {
        dialog.show();
    });

    return $(`<main class="App"></main>`).append(list).append(button).append(dialog);
}