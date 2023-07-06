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
import Pickups, {Key} from "../objects/pickups.js";
import direction from "../util/direction.js";
import hero from "../objects/hero.js";
import Enemies from "../objects/enemies.js";
import Door from "../objects/door.js";


class Engine {
    hero = new Hero(new Position(3, 7))
    gui = Interface.getInstance();
    statusbar = new StatusBar(this.hero);
    currentRoom = 0
    rooms = [
        new Room(0, this.hero),
        new Room(1),
        new Room(2)
    ]

    //rooms[currentRoom]

t
    updateStatusImages() {
        //LIMPA
        this.gui.clearStatusImages()
        //PREENCHE NOVAMENTE
        this.gui.addStatusImages(this.statusbar.getFireTiles())
        this.gui.addStatusImages(this.hero.healthBar.getHealthTiles())
        this.gui.addStatusImages(this.hero.items)
    }

    reconstructRoom() {
        this.gui.clearImages()
        this.gui.addImages(this.statusbar.getBlackTiles())
        let floorTiles = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let position = new Position(x, y);
                floorTiles.push(new Floor(position));

            }
        }

        this.gui.addImages(floorTiles);


        const currentRoom = this.rooms[this.currentRoom]
        let isHeroInRoom = currentRoom.roomTiles.find((tile) => tile === this.hero);
        if (!isHeroInRoom) currentRoom.roomTiles.push(this.hero);
        this.gui.addImages(currentRoom.roomTiles);

        return currentRoom
    }

    init() {
        console.log("Engine init");
        const currentRoom = this.reconstructRoom()




        this.gui.addImage(this.hero)
        this.updateStatusImages()
        this.gui.start();
    }

    handleRoomChange(roomNumber, destinationDoorNumber) {
        const currentRoom = this.rooms[this.currentRoom]
        this.currentRoom = roomNumber
        const nextRoom = this.reconstructRoom()
        const destinationDoor = nextRoom.roomTiles.find(t => t instanceof Door && t.doorNumber === destinationDoorNumber)
        this.hero.position = destinationDoor.position
    }




    keyPressed(key) {
        try {
            if (key === "Space") {
                this.hero.useFireball(this.rooms[this.currentRoom])
                return;
            }

            let direction = key.split("Arrow")[1]//Down;Up;Right;Left
            let roomTiles = this.rooms[this.currentRoom].roomTiles;

            if (["Down", "Up", "Right", "Left"].includes(direction)) {
                let {nextTile, newHeroPosition} = this.hero.moveHero(direction, roomTiles)
                let enemies = roomTiles.filter(imageTile => {
                    return imageTile instanceof Enemy
                })

                if (!(nextTile instanceof Wall || nextTile instanceof Enemy || nextTile instanceof Door)) {
                    this.hero.position = newHeroPosition;
                    //atualizar as posicoes dos inmigos
                    enemies.forEach((enemy) => {
                        enemy.moveEnemies(this.hero, roomTiles)
                    })

                    if (nextTile instanceof Pickups) {
                        try {
                            this.hero.pickItem(nextTile)
                            this.gui.removeImage(nextTile)
                            this.gui.addStatusImage(nextTile)
                            let currentTileIndex = roomTiles.findIndex(imageTile => {
                                return nextTile.position.equals(imageTile.position)
                            })
                            roomTiles.splice(currentTileIndex,1)

                        } catch (e){
                            console.log("erro apanhar item", e)
                        }

                    }

                }else if (nextTile instanceof Door) {
                    const destinationRoomNumber = Number(nextTile.destinationRoom)
                    const destinationDoorNumber = nextTile.destinationDoorNumber
                    if (!nextTile.key) {
                        //está aberta
                        this.handleRoomChange(destinationRoomNumber, destinationDoorNumber)
                    } else {
                        //está trancada
                        const heroKeys = this.hero.items.filter(i => i instanceof Key)
                        const doorKey = heroKeys.find(k => k.keyId === nextTile.key)
                        if (doorKey) this.handleRoomChange(destinationRoomNumber, destinationDoorNumber)

                    }

                }
                else if (nextTile instanceof Enemy) {
                    //lutar
                    this.hero.fightEnemy(nextTile, roomTiles)
                    nextTile.fightHero(this.hero, roomTiles)


                }
            }

            if (key === "1" || key === "2" || key === "3") {

                let item = this.hero.dropItem(key, roomTiles, this.hero.position);
                this.gui.removeStatusImage(item);
                item.position = this.hero.position;
                this.gui.addImage(item, this.hero)
                roomTiles.push(item)

            }
            this.updateStatusImages()
            this.gui.update()
        } catch (e) {
            this.gui.showMessage(e.message || e, "error")
        }
    }
}


export default Engine;
