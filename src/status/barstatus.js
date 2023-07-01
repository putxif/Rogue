import {Black} from "./healthtiles.js";
import Position from "../util/position.js";
import Firetile from "../game/firetile.js";
import Fireball from "../objects/fireball.js";

export class StatusBar {



    getBlackTiles() {
        let blackBar = []
        for (let i = 0; i <= 9; i++) blackBar.push(new Black(new Position(0 + i, -1)))

        return blackBar
    }


    getFireTiles() {
        let firetiles = [] ;
        for (let i= 0; i < 3; i++) firetiles.push(new Fireball(new Position(0 + i,-1)))
        return firetiles
    }





}