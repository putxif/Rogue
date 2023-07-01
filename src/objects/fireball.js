import firetile from "../game/firetile.js";
import direction from "../util/direction.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Enemy from "./enemies.js";

class Fireball extends firetile {
    room;

    constructor(position) {
        super(position, direction.UP);
    }

    get image() {
        return "Fire.gif"
    }

    validateImpact() {
        let nextTile = this.room.find(imageTile => {
            return this.position.equals(imageTile.position)
        })
        if (nextTile instanceof Wall || nextTile instanceof Door || nextTile instanceof Enemy) {
            return true;
        }
        return false
    }
}

export default Fireball;