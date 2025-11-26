export default function Dialog({ addItem }) {
    const dialog = $(`<dialog class="Dialog"></dialog>`);

    const submit = $(`<button>Add</button>`).attr("disabled", "disabled");

    const input = $(`<input type="text"></input>`).on("input", () => {
        if (input.val().trim().length > 0) {
            submit.removeAttr("disabled");
        } else {
            submit.attr("disabled", "disabled");
        }
    });

    const form = $(`<form></form>`).on("submit", (e) => {
        e.preventDefault();
        if (input.val().trim().length === 0) {
            return;
        }
        addItem({ text: input.val() });
        input.val("");
        dialog.hide();
    }).append(input).append(submit);

    return dialog.append(form);
}