/**
 * @typedef {Object} DialogProps
 * @property {string} title - Dialog title
 * @property {string} clazz - CSS modifier class for dialog styling
 * @property {JQuery|string} content - Dialog content (form, div, etc.)
 * @property {Function} [onClose] - Optional callback function when dialog is closed
 */

/**
 * Creates a general dialog component with close button
 * @param {DialogProps} props - Dialog configuration
 * @returns {JQuery<HTMLDialogElement>} jQuery-enhanced dialog element with close method
 */
export default function Dialog({ title, clazz, content, onClose }) {
    const dialog = $(`<dialog class="${clazz}"></dialog>`);

    const headingContainer = $(`<div class="dialog-header"></div>`);
    const heading = $(`<h2>${title}</h2>`);
    const closeButton = $(`<button class="close-button" title="Close">&times;</button>`).on("click", () => {
        dialog.close();
    });

    headingContainer.append(heading).append(closeButton);

    // Convert content string to jQuery if needed
    const contentElement = typeof content === 'string' ? $(content) : content;

    // Make dialog draggable
    const unregisterDraggable = makeDraggable(dialog, headingContainer);

    // Add close method to the dialog element
    dialog.close = () => {
        dialog.hide();
        if (onClose) onClose();
    };

    const oldRemove = dialog.remove;
    dialog.remove = (() => {
        unregisterDraggable();
        oldRemove.apply(this, arguments);
    }).bind(dialog);

    return dialog.append(headingContainer).append(contentElement);
}

/**
 * Dialog stack
 * 
 * @type {Array<{symbol: symbol, onMove: (pos: number) => void}>}
 */
const dialog_stack = [];

/**
 * 
 * @param {(pos: number) => void} onMove
 * @returns {{moveOnTop: () => void, unregister: () => void}}
 */
function register(onMove) {
    const symbol = Symbol();

    // start from top of stack
    onMove(dialog_stack.length);
    dialog_stack.push({ symbol, onMove });

    return {
        moveOnTop() {
            const index = dialog_stack.findIndex(item => item.symbol === symbol);

            if (index === -1) {
                throw new Error('Symbol not found in dialog stack');
            }

            const [item] = dialog_stack.splice(index, 1);
            dialog_stack.push(item);

            for (let i = index; i < dialog_stack.length; i++) {
                dialog_stack[i].onMove(i);
            }
        },
        unregister() {
            const index = dialog_stack.findIndex(item => item.symbol === symbol);
            dialog_stack.splice(index, 1);
        }
    };
}


const BASE_Z_INDEX = 10;

/**
 * Makes a dialog element draggable by its header
 * @param {JQuery} dialogElement - The dialog element to make draggable
 * @param {JQuery} headerElement - The header element to use as drag handle
 */
function makeDraggable(dialogElement, headerElement) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    const { moveOnTop, unregister } = register((pos) => {
        dialogElement.css("z-index", BASE_Z_INDEX + pos);
    });

    const oldShow = dialogElement.show;
    dialogElement.show = (function () {
        moveOnTop();
        oldShow.apply(this, arguments);
    }).bind(dialogElement);

    headerElement.css('cursor', 'move');

    headerElement.on('mousedown', function (e) {
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


        moveOnTop();

        e.preventDefault();
    });

    $(document).on('mousemove', function (e) {
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

    $(document).on('mouseup', function () {
        isDragging = false;
    });

    return unregister;
}