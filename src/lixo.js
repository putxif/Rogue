import Fireball from "./objects/fireball.js";
import Direction from "./util/direction.js";
import Wall from "./objects/wall.js";
import Enemy from "./objects/enemies.js";
import Pickups from "./objects/pickups.js";
/*
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
        let enemies = roomTiles.filter(imageTile => {
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

        //console.log(enemies)
    }

}

*/