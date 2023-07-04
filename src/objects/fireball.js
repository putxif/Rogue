import firetile from "../game/firetile.js";
import direction from "../util/direction.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Enemy from "./enemies.js";
import Interface from "../game/interface.js";
import Blood from "./blood.js";
import FireTile from "../game/firetile.js";


class Fireball extends FireTile {
    room;
    gui = Interface.getInstance();


    constructor(position) {
        super(position, direction.UP);
    }

    get image() {
        return "Fire.gif"
    }

   validateImpact() {
        let nextTileIndex = this.room.roomTiles.findIndex(imageTile => {
            return this.position.equals(imageTile.position)
        })
        let nextTile = this.room.roomTiles[nextTileIndex]
        if (!(nextTile instanceof Wall || nextTile instanceof Door || nextTile instanceof Enemy)) {
            return false
        } else if (nextTile instanceof Enemy) {
                //mata o enemy
                this.gui.removeImage(nextTile)
                this.room.roomTiles.splice(nextTileIndex, 1)
                let dead = new Blood(nextTile.position)
                this.gui.addImage(dead)
                //
            return true;
        }
        return false;

    }
}

export default Fireball;