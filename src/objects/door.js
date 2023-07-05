import imageTile from "../game/imageTile.js";

class Door extends imageTile {
    doorNumber;
    open = false
    destinationRoom;
    destinationDoorNumber;
    key;
    //campos em falta?

    constructor(position, open, doorNumber, destinationRoom, destinationDoorNumber, key) {
        super(position);
        this.open = open
        this.doorNumber = doorNumber
        this.destinationRoom = destinationRoom
        this.destinationDoorNumber = destinationDoorNumber
        this.key = key

    }

    get image() {
        if (this.open) {
            return "DoorOpen.png";
        }
        return "DoorClosed.png"
    }
}

export default Door;

