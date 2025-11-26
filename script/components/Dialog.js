export default function Dialog({ addItem }) {
    const dialog = $(`<dialog class="Dialog"></dialog>`);

    const heading = $(`<h2>Create new todo</h2>`);

    const submit = $(`<button>Add</button>`).attr("disabled", "disabled");

    const titleInput = $(`<input type="text" class="title" placeholder="Title"></input>`);
    const textArea = $(`<textarea class="text" placeholder="Description"></textarea>`);

    // Validation: enable submit if title or text has content
    const validateForm = () => {
        const hasTitle = titleInput.val().trim().length > 0;
        const hasText = textArea.val().trim().length > 0;
        if (hasTitle || hasText) {
            submit.removeAttr("disabled");
        } else {
            submit.attr("disabled", "disabled");
        }
    };

    titleInput.on("input", validateForm);
    textArea.on("input", validateForm);

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

    return dialog.append(heading).append(form);
}