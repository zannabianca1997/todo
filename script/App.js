import List from "./components/List.js";
import Dialog from "./components/Dialog.js";
import { getItems } from "./utils/storage.js";

export default function App({ }) {

    const list = new List({});

    for (const [id, props] of Object.entries(getItems())) {
        list.addItem({ id, ...props });
    }

    const dialog = new Dialog({
        addItem: (props) => {
            list.addItem(props);
        }
    });

    const addItem = $("<button class='add-item'>Add Item</button>").on("click", () => {
        dialog.show();
    });

    const removeDone = $("<button class='remove-done'>Remove Done</button>").on("click", () => {
        list.removeDone();
    });

    const exportTodos = $("<button class='export-todos'>Export</button>").on("click", () => {
        list.exportTodos();
    });

    this.main = $(`<main class="App"></main>`).append(list).append(dialog);
    this.buttonContainer = $("<div class='button-container'></div>").append(addItem).append(removeDone).append(exportTodos);

    this.install = install.bind(this);
}

function install({ main, buttonContainer }) {
    $(main).replaceWith(this.main);
    $(buttonContainer).replaceWith(this.buttonContainer);
}