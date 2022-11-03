
// trida auto
class Car {

    // construktor pro auto, nastavi souradnice a velikost auta
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.controls = new Controls();
    }

    update() {
        if (this.controls.forward) {
            this.y -= 2;
        }
        if (this.controls.reverse) {
            this.y += 2;
        }
    }

    // vykresleni auta do canvas
    draw(context) {
        context.beginPath();
        context.rect(
            // resi umisteni na stredu verticalne
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        context.fill();
    }
}