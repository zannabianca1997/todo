import List from "./components/List.js";
import Dialog from "./components/Dialog.js";
import { getItems } from "./utils/storage.js";

/**
 * @typedef {Object} AppProps
 * @property {Object} props - App configuration (currently empty)
 */

/**
 * @typedef {Object} InstallProps
 * @property {HTMLElement|string} main - Main content container selector or element
 * @property {HTMLElement|string} buttonContainer - Button container selector or element
 */

/**
 * Main application constructor that initializes todo functionality
 * @param {AppProps} props - Application configuration
 * @returns {Object} App instance with install method
 */
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

    const addItem = $("<button>Add Item</button>").on("click", () => {
        dialog.show();
    });

    const removeDone = $("<button>Remove Done</button>").on("click", () => {
        list.removeDone();
    });

    const exportTodos = $("<button>Export</button>").on("click", () => {
        list.exportTodos();
    });

    /** @type {JQuery<HTMLElement>} */
    this.main = $(`<main class="App"></main>`).append(list).append(dialog);
    /** @type {JQuery<HTMLElement>} */
    this.buttonContainer = $("<div class='button-container'></div>").append(addItem).append(removeDone).append(exportTodos);

    this.install = install.bind(this);
}

/**
 * Installs the app by replacing existing DOM elements
 * @param {InstallProps} containers - Container elements or selectors
 * @returns {void}
 */
function install({ main, buttonContainer }) {
    $(main).replaceWith(this.main);
    $(buttonContainer).replaceWith(this.buttonContainer);
}