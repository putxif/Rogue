import imageTile from "../game/imageTile.js";

class Door extends imageTile {
    doorNumber;
    type;
    isOpen; //trocar o nome disto ta me a confundir p crl ou tirar mesmo pq n sei pq preciso disto
    destinationRoom;
    destinationDoorNumber;
    key; //maybe not?
    //campos em falta?

    constructor(position, isOpen, doorNumber, type, destinationRoom, destinationDoorNumber, key) {
        super(position);
        this.isOpen = isOpen
        this.type = type //isto foi o prof
        this.doorNumber = doorNumber
        this.destinationRoom = destinationRoom
        this.destinationDoorNumber = destinationDoorNumber
        this.key = key

    }

    get image() {
        if (this.type) {
            return "DoorOpen.png";
        }
        return "DoorClosed.png"
    }



}

export default Door;

