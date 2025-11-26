import Item from "./Item.js";


export default function List({ }) {
    const self = $(`<ul class="List"></ul>`);

    self.addItem = addItem.bind(self);

    return self;
}

function addItem(props) {
    const item = new Item(props);
    this.append(item);
}


