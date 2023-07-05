import imageTile from "../game/imageTile.js";

class Door extends imageTile {
    doorNumber;
    open = false
    destinationDoorNumber;
    //campos em falta?

    constructor(position, open, doorNumber, destinationDoorNumber) {
        super(position);
        this.open = open
        this.doorNumber = doorNumber
        this.destinationDoorNumber = destinationDoorNumber

    }

    get image() {
        if (this.open) {
            return "DoorOpen.png";
        }
        return "DoorClosed.png"
    }
}

export default Door;

