import List from "./components/List.js";
import EditDialog from "./components/EditDialog.js";
import ExportDialog from "./components/ExportDialog.js";
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
    const main = $(`<main class="App"></main>`)

    const editDialogs = {};

    const list = new List({
        onEdit({ id, ...initial }) {
            if (editDialogs[id]) {
                editDialogs[id].show();
                return;
            }

            editDialogs[id] = new EditDialog({
                submitText: "Edit",
                headerText: "Edit todo",
                initial,
                addItem: (props) => {
                    console.log(props);
                    editDialogs[id].remove();
                    delete editDialogs[id];
                    list.updateItem({ id, ...props });
                }
            });

            editDialogs[id].appendTo(main).show();
        }
    });

    for (const [id, props] of Object.entries(getItems()).toSorted(([id1], [id2]) => id1 < id2 ? -1 : 1)) {
        list.addItem({ id, ...props });
    }

    const addDialog = new EditDialog({
        submitText: "Add",
        headerText: "Create new todo",
        addItem: (props) => {
            list.addItem(props);
        },
        resetOnClose: true
    });

    const exportDialog = new ExportDialog({
        exportMarkdown: () => {
            list.exportTodos('markdown');
        },
        exportJSON: () => {
            list.exportTodos('json');
        },
        exportYAML: () => {
            list.exportTodos('yaml');
        }
    });

    const addItem = $("<button>Add Item</button>").on("click", () => {
        addDialog.show();
    });

    const removeDone = $("<button>Remove Done</button>").on("click", () => {
        list.removeDone();
    });

    const exportTodos = $("<button>Export</button>").on("click", () => {
        exportDialog.show();
    });

    /** @type {JQuery<HTMLElement>} */
    this.main = main.append(list).append(addDialog).append(exportDialog);
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