import imageTile from "../game/imageTile.js";

class Door extends imageTile {
    open = false
    //TODO adicionar campos em falta

    constructor(position, open) {
        super(position);
        this.open = open
    }

    get image() {
        if (this.open) {
            return "DoorOpen.png";
        }
        return "DoorClosed.png"
    }
}

export default Door;

