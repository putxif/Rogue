import {Black} from "./healthtiles.js";
import Position from "../util/position.js";
import Firetile from "../game/firetile.js";
import Fireball from "../objects/fireball.js";
import Hero from "../objects/hero.js";

export class StatusBar {
    hero

    constructor(hero) {
        this.hero = hero;
    }



    getBlackTiles() {
        let blackBar = []
        for (let i = 0; i <= 9; i++) blackBar.push(new Black(new Position( 0 + i, -1)))

        return blackBar
    }


   getFireTiles() {
        return this.hero.fireball;

    }





}