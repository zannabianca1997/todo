/**
 * @typedef {Object} DialogProps
 * @property {string} title - Dialog title
 * @property {string} modifier - CSS modifier class for dialog styling
 * @property {JQuery|string} content - Dialog content (form, div, etc.)
 * @property {Function} [onClose] - Optional callback function when dialog is closed
 */

/**
 * Creates a general dialog component with close button
 * @param {DialogProps} props - Dialog configuration
 * @returns {JQuery<HTMLDialogElement>} jQuery-enhanced dialog element with close method
 */
export default function Dialog({ title, modifier, content, onClose }) {
    const dialog = $(`<dialog class="${modifier}"></dialog>`);

    const headingContainer = $(`<div class="dialog-header"></div>`);
    const heading = $(`<h2>${title}</h2>`);
    const closeButton = $(`<button class="close-button" title="Close">&times;</button>`).on("click", () => {
        dialog.close();
    });

    headingContainer.append(heading).append(closeButton);

    // Convert content string to jQuery if needed
    const contentElement = typeof content === 'string' ? $(content) : content;

    // Add close method to the dialog element
    dialog.close = () => {
        dialog.hide();
        if (onClose) onClose();
    };

    return dialog.append(headingContainer).append(contentElement);
}