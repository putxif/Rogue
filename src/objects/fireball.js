import firetile from "../game/firetile.js";

class Fireball extends firetile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Fire.gif"
    }
}


export default Fireball;