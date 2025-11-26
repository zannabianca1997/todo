const itemsKey = "todo-items";

export function getItems() {
    return JSON.parse(localStorage.getItem(itemsKey)) ?? {};
}

export function addItem({ id, ...props }) {
    const items = getItems();
    items[id] = props;
    localStorage.setItem(itemsKey, JSON.stringify(items));
}

export function removeItem(id) {
    const items = getItems();
    delete items[id];
    localStorage.setItem(itemsKey, JSON.stringify(items));
}