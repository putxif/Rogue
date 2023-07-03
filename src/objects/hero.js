import ImageTile from "../game/imageTile.js";
import {HealthBar} from "../status/healthbar.js";
import Fireball from "./fireball.js";
import Position from "../util/position.js";
import Direction from "../util/direction.js";
import Wall from "./wall.js";
import Enemy from "./enemies.js";

class Hero extends ImageTile {
    healthBar = new HealthBar()
    fireball = [new Fireball(new Position(0,-1)),
        new Fireball(new Position(1,-1)),
        new Fireball(new Position(2,-1))]
    items = []
    
    constructor(position) {
        super(position);
    }

    get image() {
        return "Hero.png";
    }

    moveHero(key) {
        console.log("hello")
        let direction = key.split("Arrow")[1]//Down;Up;Right;Left
        let directionVector = new Direction(direction.toUpperCase()).asVector() //console.log(directionVector)
        //mover o hero para a nova posicao
        let heroPosition = this.position;
        let newHeroPosition = heroPosition.plus(directionVector) //possivel futura posicao
        //ver o que está na nova posicao
        let roomTiles = this.room.roomTiles;
        //console.log(roomTiles)
        let nextTile = roomTiles.find(imageTile => {
            return newHeroPosition.equals(imageTile.position)
        })
        //atualizar posicao do hero caso o nextTile nao seja Wall
        if (!(nextTile instanceof Wall || nextTile instanceof Enemy)) {
            this.hero.position = newHeroPosition;
        }
    }



    /*useFireball() {
        let fireballIndex = this.hero.fireball.findIndex(fireball => {
            return fireball instanceof Fireball
            console.log(fireballIndex)
        })
        //selecionar fireball
        let fireball = this.hero.fireball[fireballIndex] //caso exista, devolve e remove da lista de fireballs do hero
        if (fireball) {
            this.gui.removeStatusImage(fireball)
            fireball.room = this.room
            fireball.position = this.hero.position
            this.gui.addImage(fireball)
            this.hero.fireball.splice(fireballIndex, 1)
            this.gui.update()
            fireball.start()
        }
        //return ;


    } */

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
