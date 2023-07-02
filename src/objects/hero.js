import ImageTile from "../game/imageTile.js";
import {HealthBar} from "../status/healthbar.js";
import Fireball from "./fireball.js";
import Position from "../util/position.js";

class Hero extends ImageTile {
    healthBar = new HealthBar()
    fireball = [new Fireball(new Position(0,-1)),
        new Fireball(new Position(1,-1)),
        new Fireball(new Position(2,-1))]
    items = []

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

    useFireball() {
        //procurar fireball

        //remover fireball
        //devolve fireball
    }

    pickItem(item) {
        //verificar se pode apanhar item
        if (this.items.length === 3) {
            throw "Items cheio"
        } else {
            item.position = new Position(6 + this.items.length + 1, -1)
            this.items.push(item)
        }
        console.log(this.items)
    }

    useItem(itemNumber) {//1, 2, 3

    }

    getItemsTiles() {
        return this.items
    }

}


export default Hero;
