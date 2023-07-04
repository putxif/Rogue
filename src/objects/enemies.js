import ImageTile from "../game/imageTile.js";
import Direction from "../util/direction.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Vector2d from "../util/vector2d.js";
import Hero from "./hero.js";
import Pickups from "./pickups.js";

class Enemy extends ImageTile {



    constructor(position) {
        super(position);
        this.health = 2
        this.dmg = 1
    }



    //funcao para movimentar que recebe uma lista com os surroundings
    moveEnemiesRandom(surroundings) {
        let directions = [Direction.DOWN, Direction.LEFT, Direction.UP, Direction.RIGHT]
        let randomIndex = Math.floor((Math.random() * directions.length))//pode ser 0, 1, 2 ou 3
       // console.log("random index", randomIndex)

        let nextPosition = this.position.plus(directions[randomIndex].asVector()) //(3, 2)
        //ver se next position é permitida
        let nextTile = surroundings.find(imageTile => {
            return nextPosition.equals(imageTile.position)
        })

        if (!(nextTile instanceof Wall || nextTile instanceof Door || nextTile instanceof Enemy || nextTile instanceof Hero ||nextTile instanceof Pickups)) {
            this.position = nextPosition

        }

    }
    moveCloser(positionHero, surroundings) {
        // diminuir sempre a maior distância
        // distancia em x e distancia em y (x do hero - x do enemy)
        let distanciaEmX = positionHero.x - this.position.x;
        let distanciaEmY = positionHero.y - this.position.y;

        // com new vector é possível utilizar distanceTo
        let position = new Vector2d(distanciaEmX, distanciaEmY);
        let nextPosition = this.position.plus(this.distanceTo(position).asVector()); //tive ajuda aqui

        let nextTile = surroundings.find(imageTile => {
            return nextPosition.equals(imageTile.position)
        })

        if (!(nextTile instanceof Wall || nextTile instanceof Door || nextTile instanceof Enemy || nextTile instanceof Hero || nextTile instanceof Pickups)) {

            this.position = nextPosition
        }
    }

    moveEnemies(hero, roomTiles) {
        const distancia = Math.sqrt((hero.position.x - this.position.x) ** 2 + (hero.position.y - this.position.y) ** 2);
        //console.log(distancia)

        if (distancia <= 4) {
            this.moveCloser(hero.position, roomTiles);
        } else {
            this.moveEnemiesRandom(roomTiles);
        }
    }


    distanceTo(position) {
        if(Math.abs(position.i) >= Math.abs(position.j)){
            // move horizontal
            return position.i > 0 ? Direction.RIGHT : Direction.LEFT
        }else{
            // move vertical
            return position.j > 0 ? Direction.DOWN : Direction.UP
        }
    }

    enemyLoseHealth(dmg){
        this.health -= dmg
        return this.health

    }

   fightHero(hero) {
        this.enemyLoseHealth(hero.dmg)
        console.log(this)
    }


}






class Bat extends Enemy {
    constructor(position) {
        super(position);
    }

    get image() {
        return 'Bat.gif'
    }
}

class Skeleton extends Enemy {

    constructor(position) {
        super(position);
    }

    get image() {
        return 'Skeleton.gif';
    }
}

class Badguy extends Enemy {

    constructor(position) {
        super(position);
    }

    get image() {
        return 'BadGuy.gif'
    }

}


export {Skeleton, Bat, Badguy};
export default Enemy;