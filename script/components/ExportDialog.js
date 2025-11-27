import Dialog from "./Dialog.js";

/**
 * @typedef {Object} ExportDialogProps
 * @property {Function} exportMarkdown - Callback function to export as markdown
 * @property {Function} exportJSON - Callback function to export as JSON
 * @property {Function} exportYAML - Callback function to export as YAML
 */

/**
 * Creates a dialog component for exporting todos
 * @param {ExportDialogProps} props - Dialog configuration
 * @returns {JQuery<HTMLDialogElement>} jQuery-enhanced dialog element
 */
export default function ExportDialog({ exportMarkdown, exportJSON, exportYAML }) {
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

    // JSON export option
    $(`<button>JSON</button>`).on("click", () => {
        exportJSON();
        dialog.close();
    }).appendTo(optionsContainer);

    // YAML export option
    $(`<button>YAML</button>`).on("click", () => {
        exportYAML();
        dialog.close();
    }).appendTo(optionsContainer);

    return dialog;
}