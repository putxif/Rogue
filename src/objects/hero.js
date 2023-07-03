import ImageTile from "../game/imageTile.js";
import {HealthBar} from "../status/healthbar.js";
import Fireball from "./fireball.js";
import Position from "../util/position.js";
import Direction from "../util/direction.js";
import Wall from "./wall.js";
import Enemy from "./enemies.js";
import Combat from "../game/combat.js";
import Interface from "../game/interface.js";

class Hero extends Combat {
    gui = Interface.getInstance();
    healthBar = new HealthBar()
    fireball = [new Fireball(new Position(0,-1)),
        new Fireball(new Position(1,-1)),
        new Fireball(new Position(2,-1))]
    items = []
    constructor(position) {
        super(position);
        this.dmg = 1
    }

    get image() {
        return "Hero.png";
    }


    moveHero(direction, roomTiles) {
        let directionVector = new Direction(direction.toUpperCase()).asVector() //console.log(directionVector)
        //mover o hero para a nova posicao
        let heroPosition = this.position;
        let newHeroPosition = heroPosition.plus(directionVector) //possivel futura posicao
        //ver o que está na nova posicao
        //console.log(roomTiles)
        let nextTile = roomTiles.find(imageTile => {
            return newHeroPosition.equals(imageTile.position)
        })
        return {
            nextTile,
            newHeroPosition
        }
    }



    useFireball(room) {
        let fireballIndex = this.fireball.findIndex(fireball => {
            return fireball instanceof Fireball
        })
        //selecionar fireball
        let fireball = this.fireball[fireballIndex] //caso exista, devolve e remove da lista de fireballs do hero
        if (fireball) {
            this.gui.removeStatusImage(fireball)
            fireball.room = room
            fireball.position = this.position
            this.gui.addImage(fireball)
            this.fireball.splice(fireballIndex, 1)
            this.gui.update()
            fireball.start()
        }

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

    dropItem(itemNumber, roomTiles) {//1, 2, 3
        let itemIndex = this.items.findIndex(item => item.position.x === +itemNumber + 6)
        let item = this.items[itemIndex]
        if(item) {
            let tile = roomTiles.find(tile => tile.position.equals(item.position))
            if (!tile) throw new Error("Items nao podem estar na mesma posicao") // ainda n esta a funcionar
            else { this.items.splice(itemIndex, 1)
                return item
                }
        } else throw new Error("Item não foi encontrado")


    }

    getItemsTiles() {
        return this.items
    }

}




export default Hero;
