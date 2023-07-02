import ImageTile from "../game/imageTile.js";
import {HealthBar} from "../status/healthbar.js";
import Fireball from "./fireball.js";
import Position from "../util/position.js";

class Hero extends ImageTile {
    healthBar = new HealthBar()
    fireball = [new Fireball(new Position(0,-1)),
        new Fireball(new Position(1,-1)),
        new Fireball(new Position(2,-1))]

    static #instance;
    static getInstance() {
        if(Hero.#instance === undefined) {
            Hero.#instance = new Hero();
        }
        return Hero.#instance;
    }

    constructor(position) {
        super(position);
    }

    get image() {
        return "Hero.png";
    }


}


export default Hero;
