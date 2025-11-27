import Dialog from "./Dialog.js";

/**
 * @callback AddItemCallback
 * @param {TodoItem} todoData - The todo item to add
 * @returns {void}
 */

/**
 * @typedef {Object} AddDialogProps
 * @property {AddItemCallback} addItem - Callback function to add new todo
 */

/**
 * Creates a dialog component for adding new todos
 * @param {AddDialogProps} props - Dialog configuration
 * @returns {JQuery<HTMLDialogElement>} jQuery-enhanced dialog element
 */
export default function AddDialog({ addItem }) {
    const submit = $(`<button>Add</button>`).attr("disabled", "disabled");

    const titleInput = $(`<input type="text" class="title" placeholder="Title"></input>`);
    const textArea = $(`<textarea class="text" placeholder="Description"></textarea>`);

    titleInput.on("input", () => {
        const hasTitle = titleInput.val().trim().length > 0;
        if (hasTitle) {
            submit.removeAttr("disabled");
        } else {
            submit.attr("disabled", "disabled");
        }
    });

    const form = $(`<form></form>`).append(titleInput).append(submit).append(textArea);

    const dialog = new Dialog({
        title: "Create new todo",
        modifier: "Add",
        content: form,
        onClose: () => {
            // Reset form when dialog is closed
            titleInput.val("");
            textArea.val("");
            submit.attr("disabled", "disabled");
        }
    });

    form.on("submit", (e) => {
        e.preventDefault();
        const title = titleInput.val().trim();
        const text = textArea.val().trim();

        if (!title && !text) {
            return;
        }

        addItem({ title, text });
        dialog.close();
    })

    return dialog;
}