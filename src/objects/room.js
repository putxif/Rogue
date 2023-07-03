import room0 from "../../rooms/room0.js";
import room1 from "../../rooms/room1.js";
import room2 from "../../rooms/room2.js";
import Position from "../util/position.js";
import Wall from "./wall.js";
import Door from "./door.js";
import Hero from "./hero.js";

import Enemy, {Skeleton, Bat, Badguy} from "./enemies.js";
import Pickups, {Hammer, Key, Meat} from "./pickups.js";



 class Room {
    currentRoom;
    roomTiles = [];
    hero;
    constructor(currentRoom,hero) {
        this.currentRoom = currentRoom;
        this.hero = hero;

        let room = Room.getRoom(this.currentRoom);

        let lines = room.split("\n").filter(cut => !cut.startsWith("#"))//cut mas podia ser batatas =)
//split e filter para ele ignorar os # no Room     e currentRoom n sei bem pq

        for (let y = 0; y < lines.length; y++) {
            let actualLine = lines[y]
            let columns = actualLine.split("") //split do q?
            for (let x = 0; x <columns.length; x++) {
                let position = new Position(x, y)
                switch (columns[x]) {
                    case 'W' :
                        this.roomTiles.push(new Wall(position))
                        break;
                    case 'S' :
                        this.roomTiles.push(new Skeleton(position))
                        break;
                    case 'H' :
                        this.hero.position = position
                        this.roomTiles.push(this.hero)
                        break;
                    case 'B' :
                        this.roomTiles.push(new Bat(position))
                        break;
                    case 'G' :
                        this.roomTiles.push(new Badguy(position))
                        break;
                    case 'm' :
                        this.roomTiles.push(new Meat(position))
                        break;
                    case 'h' :
                        this.roomTiles.push(new Hammer(position))
                        break;
                    case 'k' :
                        this.roomTiles.push(new Key(position))
                        break;
                    default :
                        if(columns[x] === "1" || columns[x] === "2" || columns[x] === "0") this.roomTiles.push((new Door(position)))
                        break;

                }

            }
        }
    }

    static getRoom(roomNumber) { ////index ?
        if (roomNumber === 0) {
            return room0;
        } else if (roomNumber === 1) {
            return room1;
        } else {
            return room2;
        }
    }
}


export default Room;



