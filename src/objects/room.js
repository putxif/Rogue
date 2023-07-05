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
        let doorsInfo = room.split("\n").filter(cut => !cut.startsWith("# k") && cut.startsWith("# ")).map(linha => {
            const linhaInfo = linha.split(" ");
            //console.log("linha info da door",linhaInfo)


            return {
                doorNumber: linhaInfo[1],
                open: linhaInfo[2] === "E", //devolve true ou false
                destinationRoom: linhaInfo[3],
                destinationDoorNumber: linhaInfo[4],
                key: linhaInfo[5]
            };
        })
        let keysInfo = room.split("\n").filter(cut => cut.startsWith("# k")).map(line => {
            const lineInfo = line.split( " ");
           // console.log("linha info da key", lineInfo)


            return {
                keyId: lineInfo[2]
            }

        })
        //console.log("posicao da key na linha",keysInfo)





        //criar uma lista [
        //{
        //doorNumber: 0 ou 1 ou 2 etc....
        //"open": true/false ("E" ou "D")
        //"destinationRoom": room1.txt por exemplo
        //"destinationDoorNumber": 1 por exemplo
        //"key": undefined OU key1
        //}
        //]
      // console.log("doorsInfo",  doorsInfo)

        let lines = room.split("\n").filter(cut => !cut.startsWith("#"))//cut mas podia ser batatas =)
//split e filter para ele ignorar os # no Room     e currentRoom n sei bem pq
        // console.log("lines", lines)
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
                        let keyInfo = keysInfo.find(k => k.keyId === "key1" || k.keyId === "key2"  ) // === columns[x]       erro aqui seguro
                        this.roomTiles.push(new Key(position,keyInfo.keyId))
                        console.log("keyInfo",keyInfo)
                        console.log("keysInfo", keysInfo)
                        break;
                    default :
                        if(columns[x] === "1" || columns[x] === "2" || columns[x] === "0")  {
                            let doorInfo = doorsInfo.find(d => d.doorNumber === columns[x] || d.open === columns[x] || d.destinationDoorNumber=== columns[x])
                            //enviar a informacao da porta
                            this.roomTiles.push((new Door(position, doorInfo.open, doorInfo.doorNumber, doorInfo.destinationRoom, doorInfo.destinationDoorNumber)))
                        }
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

   /* removeTile(tile) {
        let roomTileIndex = this.roomTiles.findIndex(obj => obj.position.equals(tile.position))
        if(roomTileIndex > -1) this.roomTiles.splice(roomTileIndex, 1)

    } */
}


export default Room;



