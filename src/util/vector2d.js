import imageTile from "../game/imageTile.js";

class Vector2d extends imageTile {
    #i;
    #j;

    constructor(i, j,position) {
        super(position)
        this.#i = i;
        this.#j = j;
    }

    plus(vector) {
        return new Vector2d(this.#i + vector?.i, this.#j + vector?.j);
    }

    minus(vector) {
        return new Vector2d(this.#i - vector?.i, this.#j - vector?.j);
    }

    get i() {
        return this.#i;
    }

    get j() {
        return this.#j;
    }

    equals(vector) {
        return this.#i === vector?.i && this.#j === vector?.j;
    }

    toString() {
        return "[" + this.#i + ", " + this.#j + "]";
    }
}

export default Vector2d;
