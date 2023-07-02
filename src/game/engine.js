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



class Engine {
    hero = new Hero(new Position(2, 7))
    room = new Room(2)
    gui = Interface.getInstance();
    statusbar = new StatusBar()



    init() {
        console.log("Engine init");


        let floorTiles = [];
        for(let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let position = new Position(x, y);
                floorTiles.push(new Floor(position));

            }
        }

        this.gui.addImages(floorTiles);


        //let room = new Room(0);

        this.gui.addImages(this.room.roomTiles);

        //this.hero.position = this.room.heroPosition //se comentar, consigo ver outras salas
        this.gui.addImage(this.hero);
        this.gui.addImages(this.statusbar.getBlackTiles())
        this.gui.addStatusImages(this.statusbar.getFireTiles())
        this.gui.addStatusImages(this.hero.healthBar.getHealthTiles())
        this.gui.addStatusImages(this.hero.items)





        //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
        //this.gui.addImage(fireball);
        //fireball.start();

        this.gui.start();
    }



   keyPressed(key) {
        if (key === "Space") {
            let fireballIndex = this.hero.fireball.findIndex(fireball => {
                return fireball instanceof Fireball
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
            return ;
        }
        //console.log("User pressed key", key);//ArrowUp, ArrowDown etc..
        //determinar a direcao com base na tecla pressionada
        let direction = key.split("Arrow")[1]//Down;Up;Right;Left
        let directionVector  = new Direction(direction.toUpperCase()).asVector() //console.log(directionVector)
        //mover o hero para a nova posicao
        let heroPosition = this.hero.position;
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
            //atualizar as posicoes dos inmigos
            let enemies = roomTiles.filter(imageTile => { //still confuso
                return imageTile instanceof Enemy
            })
            enemies.forEach((enemy) => {
                const distancia = Math.sqrt((this.hero.position.x - enemy.position.x)**2 + (this.hero.position.y - enemy.position.y)**2);
                //console.log(distancia)

                if(distancia <= 4) {
                    enemy.moveCloser(newHeroPosition,roomTiles);
                } else {
                    enemy.moveEnemiesRandom(roomTiles);
                }
            })
            if (nextTile instanceof Pickups) {
                try {
                    this.hero.pickItem(nextTile)
                    this.gui.removeImage(nextTile)
                    this.gui.addStatusImages(this.hero.items)//atencao que isto adiciona varias vezes o mesmo item
                    this.gui.update()
                    
                } catch (e) {
                    console.log("erro apanhar item", e)
                }
                
            }

            console.log(enemies)
            //enemies.forEach(enemy => enemy.moveEnemiesRandom(roomTiles))
        }

    }
}

export default Engine;
