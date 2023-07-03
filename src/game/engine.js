import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/hero.js";
import Interface from "./interface.js";
import Room from "../objects/room.js";
import Direction from "../util/direction.js";
import Wall from "../objects/wall.js";
import Enemy from "../objects/enemies.js";
import {StatusBar} from "../status/barstatus.js";
import Fireball from "../objects/fireball.js";
import Pickups from "../objects/pickups.js";
import direction from "../util/direction.js";
import hero from "../objects/hero.js";



class Engine {
    hero = new Hero(new Position(3,7))
    room = new Room(2,this.hero)
    gui = Interface.getInstance();
    statusbar = new StatusBar(this.hero);

    init() {
        console.log("Engine init");


        let floorTiles = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let position = new Position(x, y);
                floorTiles.push(new Floor(position));

            }
        }

        this.gui.addImages(floorTiles);


        this.gui.addImages(this.room.roomTiles);
        let isHeroInRoom = this.room.roomTiles.find((tile) => tile === this.hero);
        if(!isHeroInRoom) this.room.roomTiles.push(this.hero);

        this.gui.addImage(this.hero);
        this.gui.addImages(this.statusbar.getBlackTiles())
        this.gui.addStatusImages(this.statusbar.getFireTiles())
        this.gui.addStatusImages(this.hero.healthBar.getHealthTiles())
        this.gui.addStatusImages(this.hero.items)


        this.gui.start();
    }

    keyPressed(key) {
        if (key === "Space") {
            this.hero.useFireball(this.room)
            return;
        }

        let direction = key.split("Arrow")[1]//Down;Up;Right;Left
        if (direction === "Down" || direction === "Up" || direction === "Left" || direction === "Right") {
            let roomTiles = this.room.roomTiles;
            let { nextTile, newHeroPosition } = this.hero.moveHero(direction,roomTiles)
            if (!(nextTile instanceof Wall || nextTile instanceof Enemy)) {
                this.hero.position = newHeroPosition;
                //atualizar as posicoes dos inmigos
                let enemies = roomTiles.filter(imageTile => {
                    return imageTile instanceof Enemy
                })
                enemies.forEach((enemy) => {
                    enemy.moveEnemies(this.hero, this.room.roomTiles,)
                })

                if (nextTile instanceof Pickups) {
                    try {
                        this.hero.pickItem(nextTile)
                        this.gui.removeImage(nextTile)
                        this.gui.addStatusImage(nextTile)//atencao que isto adiciona varias vezes o mesmo item
                        this.gui.update()

                    } catch (e) {
                        console.log("erro apanhar item", e)
                    }

                }

                //console.log(enemies)
            }
        }
        if (key === "1" || key === "2" || key === "3") {
            try {
                let item = this.hero.dropItem(key, this.room.roomTiles);
                this.gui.removeStatusImage(item);
                item.position = this.hero.position;
                this.gui.addImage(item, this.hero)
                this.room.roomTiles.push(item)
                this.gui.update()



            } catch(e) {
                console.log(e.message)

            }
        }


        //atualizar posicao do hero caso o nextTile nao seja Wall


    }
}




export default Engine;
