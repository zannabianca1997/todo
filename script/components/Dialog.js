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

    // Make dialog draggable
    makeDraggable(dialog, headingContainer);

    // Add close method to the dialog element
    dialog.close = () => {
        dialog.hide();
        if (onClose) onClose();
    };

    return dialog.append(headingContainer).append(contentElement);
}

/**
 * Makes a dialog element draggable by its header
 * @param {JQuery} dialogElement - The dialog element to make draggable
 * @param {JQuery} headerElement - The header element to use as drag handle
 */
function makeDraggable(dialogElement, headerElement) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    headerElement.css('cursor', 'move');

    headerElement.on('mousedown', function(e) {
        // Only allow dragging with left mouse button
        if (e.button !== 0) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        // Get current position
        const rect = dialogElement[0].getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        // Switch to fixed positioning for smooth dragging
        dialogElement.css({
            'position': 'fixed',
            'left': initialX + 'px',
            'top': initialY + 'px',
            'transform': 'none',
            'margin': '0'
        });

        e.preventDefault();
    });

    $(document).on('mousemove', function(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newX = initialX + deltaX;
        let newY = initialY + deltaY;

        // Boundary detection - keep dialog within viewport
        const dialogWidth = dialogElement.outerWidth();
        const dialogHeight = dialogElement.outerHeight();
        const maxX = window.innerWidth - dialogWidth;
        const maxY = window.innerHeight - dialogHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        dialogElement.css({
            'left': newX + 'px',
            'top': newY + 'px'
        });
    });

    $(document).on('mouseup', function() {
        isDragging = false;
    });
}