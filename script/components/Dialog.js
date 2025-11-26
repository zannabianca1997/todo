export default function Dialog({ addItem }) {
    const dialog = $(`<dialog class="Dialog"></dialog>`);

    const headingContainer = $(`<div class="dialog-header"></div>`);
    const heading = $(`<h2>Create new todo</h2>`);
    const closeButton = $(`<button class="close-button" title="Close">&times;</button>`).on("click", () => {
        dialog.hide();
    });

    headingContainer.append(heading).append(closeButton);

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

    const form = $(`<form></form>`).on("submit", (e) => {
        e.preventDefault();
        const title = titleInput.val().trim();
        const text = textArea.val().trim();

        if (!title && !text) {
            return;
        }

        addItem({ title, text });
        titleInput.val("");
        textArea.val("");
        submit.attr("disabled", "disabled");
        dialog.hide();
    }).append(titleInput).append(submit).append(textArea);

    return dialog.append(headingContainer).append(form);
}