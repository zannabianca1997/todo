import Dialog from "./Dialog.js";

/**
 * @callback EditCallback
 * @param {import("../utils/storage.js").TodoItem} todoData - The todo item to add/update
 * @returns {void}
 */

/**
 * @typedef {Object} EditDialogProps
 * @property {EditCallback} addItem - Callback function to add/update todo
 * @property {Partial<import("../utils/storage.js").TodoItem>} [initial] - Initial todo item to prefill the form
 * @property {string} submitText - Text to display in the submit button
 */

/**
 * Creates a dialog component for adding/editing todos
 * @param {EditDialogProps} props - Dialog configuration
 * @returns {JQuery<HTMLDialogElement>} jQuery-enhanced dialog element
 */
export default function EditDialog({ addItem, initial, submitText, headerText, resetOnClose }) {
    const submit = $(`<button></button>`).text(submitText);

    const titleInput = $(`<input type="text" class="title" placeholder="Title"></input>`).val(initial?.title ?? "");
    const textArea = $(`<textarea class="text" placeholder="Description"></textarea>`).val(initial?.text ?? "");

    if (titleInput.val().trim().length == 0) {
        submit.attr("disabled", "disabled");
    }

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
        title: headerText,
        clazz: "Edit",
        content: form,
        onClose: resetOnClose ? () => {
            // Reset form when dialog is closed
            titleInput.val("");
            textArea.val("");
            submit.attr("disabled", "disabled");
        } : undefined
    });

    form.on("submit", (e) => {
        e.preventDefault();
        const title = titleInput.val().trim();
        const text = textArea.val().trim();

        if (!title && !text) {
            return;
        }

        dialog.close();
        addItem({ title, text, done: initial?.done ?? false });
    })

    return dialog;
}