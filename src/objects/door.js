import imageTile from "../game/imageTile.js";

class Door extends imageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "DoorOpen.png";
    }
}

export default Door;

