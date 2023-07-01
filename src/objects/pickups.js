import ImageTile from "../game/imageTile.js";

class Pickups extends ImageTile {


    constructor(position) {
        super(position);
    }
}


class Hammer extends Pickups {
    constructor(position) {
        super(position);
    }

    get image() {
        return 'Hammer.png'
    }
}

class Meat extends Pickups {
    constructor(position) {
        super(position);
    }

    get image() {
        return 'GoodMeat.png'
    }
}

export {Meat, Hammer}

export default Pickups
