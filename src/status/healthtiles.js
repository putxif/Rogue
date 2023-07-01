import ImageTile from "../game/imageTile.js";
import imageTile from "../game/imageTile.js";


class HealthGreen extends ImageTile {

    constructor(position) {
        super(position);
    }

    get image() {
        return 'Green.png';
    }
}

class HealthRed extends ImageTile {

    constructor(position) {
        super(position);
    }

    get image() {
        return 'Red.png';
    }
}

class HealthHalfHalf extends ImageTile {

    constructor(position) {
        super(position);
    }

    get image() {
        return 'RedGreen.png';
    }
}

class Black extends imageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Black.png";
    }

}

export {HealthGreen, HealthRed, HealthHalfHalf, Black}