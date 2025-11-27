import Dialog from "./Dialog.js";

/**
 * @typedef {Object} ExportDialogProps
 * @property {Function} exportMarkdown - Callback function to export as markdown
 */

/**
 * Creates a dialog component for exporting todos
 * @param {ExportDialogProps} props - Dialog configuration
 * @returns {JQuery<HTMLDialogElement>} jQuery-enhanced dialog element
 */
export default function ExportDialog({ exportMarkdown }) {
    const optionsContainer = $(`<div class="export-options"></div>`);

    const dialog = new Dialog({
        title: "Export Options",
        clazz: "Export",
        content: optionsContainer
    });

    // Markdown export option
    $(`<button>Markdown</button>`).on("click", () => {
        exportMarkdown();
        dialog.close();
    }).appendTo(optionsContainer);

    return dialog;
}