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
class Key extends Pickups {
    //TODO adicionar id da chave: "key1" "key2"
    constructor(position) {
        super(position);
    }

    get image() {
        return 'Key.png'
    }
}

export {Meat, Hammer, Key}

export default Pickups
