import Item from "./Item.js";


export default function List({ }) {
    const self = $(`<ul class="List"></ul>`);

    self.items = {};

    self.addItem = addItem.bind(self);
    self.removeDone = removeDone.bind(self);

    return self;
}

function addItem(props) {
    const item = new Item({ ...props, onRemove: (id) => { delete this.items[id]; } });
    this.items[item.id] = item;
    this.append(item);
}

function removeDone() {
    const items = Object.values(this.items).filter((item) => item.done);
    items.forEach((item) => item.remove());
}