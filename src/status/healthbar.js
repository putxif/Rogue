import {HealthGreen, HealthHalfHalf, HealthRed} from "./healthtiles.js";
import Position from "../util/position.js";


export class HealthBar {
    health = 8





    getHealthTiles() { // udpdate
        let healthBar = []
        for (let i = 0; i < 8; i += 2) {
            let pos = new Position(3 + i / 2, -1);
            if (this.health >= 2 + i) healthBar.push(new HealthGreen(pos))
            else if (this.health >= 1 + i) healthBar.push(new HealthHalfHalf(pos))
            else healthBar.push(new HealthRed(pos))
        }

        return healthBar;
    }
}


   /* getHealthTiles() { //
        let healthBar = []
        if (this.health === 8) {
            healthBar.push(new HealthGreen(new Position(3, -1)))
            healthBar.push(new HealthGreen(new Position(4, -1)))
            healthBar.push(new HealthGreen(new Position(5, -1)))
            healthBar.push(new HealthGreen(new Position(6, -1)))
        }
        if (this.health === 7) {
            healthBar.push(new HealthGreen(new Position(3, -1)))
            healthBar.push(new HealthGreen(new Position(4, -1)))
            healthBar.push(new HealthGreen(new Position(5, -1)))
            healthBar.push(new HealthHalfHalf(new Position(6, -1)))
        }
        if (this.health === 6) {
            healthBar.push(new HealthGreen(new Position(3, -1)))
            healthBar.push(new HealthGreen(new Position(4, -1)))
            healthBar.push(new HealthGreen(new Position(5, -1)))
            healthBar.push(new HealthRed(new Position(6, -1)))
        }
        if (this.health === 5) {
            healthBar.push(new HealthGreen(new Position(3, -1)))
            healthBar.push(new HealthGreen(new Position(4, -1)))
            healthBar.push(new HealthHalfHalf(new Position(5, -1)))
            healthBar.push(new HealthRed(new Position(6, -1)))
        }
        if (this.health === 4) {
            healthBar.push(new HealthGreen(new Position(3, -1)))
            healthBar.push(new HealthGreen(new Position(4, -1)))
            healthBar.push(new HealthRed(new Position(5, -1)))
            healthBar.push(new HealthRed(new Position(6, -1)))
        }
        if (this.health === 3) {
            healthBar.push(new HealthGreen(new Position(3, -1)))
            healthBar.push(new HealthHalfHalf(new Position(4, -1)))
            healthBar.push(new HealthRed(new Position(5, -1)))
            healthBar.push(new HealthRed(new Position(6, -1)))
        }
        if (this.health === 2) {
            healthBar.push(new HealthGreen(new Position(3, -1)))
            healthBar.push(new HealthRed(new Position(4, -1)))
            healthBar.push(new HealthRed(new Position(5, -1)))
            healthBar.push(new HealthRed(new Position(6, -1)))
        }
        if (this.health === 1) {
            healthBar.push(new HealthHalfHalf(new Position(3, -1)))
            healthBar.push(new HealthRed(new Position(4, -1)))
            healthBar.push(new HealthRed(new Position(5, -1)))
            healthBar.push(new HealthRed(new Position(6, -1)))
        }
        if (this.health === 0) {
            healthBar.push(new HealthRed(new Position(3, -1)))
            healthBar.push(new HealthRed(new Position(4, -1)))
            healthBar.push(new HealthRed(new Position(5, -1)))
            healthBar.push(new HealthRed(new Position(6, -1)))
        }
        return healthBar;


    }

} */







