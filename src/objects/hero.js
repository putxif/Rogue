import ImageTile from "../game/imageTile.js";
import {HealthBar} from "../status/healthbar.js";

class Hero extends ImageTile {
    healthBar = new HealthBar()

    constructor(position) {
        super(position);
    }

    get image() {
        return "Hero.png";
    }


}


export default Hero;
