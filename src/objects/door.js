import imageTile from "../game/imageTile.js";

class Door extends imageTile {
    doorNumber;
    type;
    destinationRoom;
    destinationDoorNumber;
    key;

    //campos em falta?

    constructor(position, doorNumber, type, destinationRoom, destinationDoorNumber, key) {
        super(position);
        this.doorNumber = doorNumber
        this.type = type //isto foi o prof
        this.destinationRoom = destinationRoom
        this.destinationDoorNumber = destinationDoorNumber
        this.key = key

    }

    get image() {
        if (this.type === 'E') {
            return "DoorWay.png";
        } else if (this.type === "D" && !this.key)
            return "DoorOpen.png"
        return "DoorClosed.png"
    }

}

export default Door;

