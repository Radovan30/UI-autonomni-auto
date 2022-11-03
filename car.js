
// trida auto
class Car {

    // construktor pro auto, nastavi souradnice a velikost auta
    constructor ( x, y, width, height ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // nastaveni rychlosti a akcelerace
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angel = 0;

        this.controls = new Controls();
    }

    update() {
        this.#move()
    }
    
    // posun auta, rychlosti a akcelerace
    #move() {
        if ( this.controls.forward ) {
            this.speed += this.acceleration;
        }
        if ( this.controls.reverse ) {
            this.speed -= this.acceleration;
        }

        if ( this.speed > this.maxSpeed ) {
            this.speed = this.maxSpeed;
        }
        if ( this.speed < - this.maxSpeed / 2 ) {
            this.speed = - this.maxSpeed / 2;
        }

        if ( this.speed > 0 ) {
            this.speed -= this.friction;
        }
        if ( this.speed < 0 ) {
            this.speed += this.friction;
        }
        if ( Math.abs( this.speed ) < this.friction ) {
            this.speed = 0;
        }

        if ( this.speed !== 0 ) {
            // jestli auto stoji tak se neotoci
            const flip = this.speed > 0 ? 1 : -1;
            // posun do leva/prava
            if ( this.controls.left ) {
                this.angel += 0.03;
            }
            if ( this.controls.right ) {
                this.angel -= 0.03;
            }
        }

        this.x -= Math.sin( this.angel ) * this.speed;
        this.y -= Math.cos( this.angel ) * this.speed;
    }

    // vykresleni auta do canvas
    draw( context ) {
        context.save();
        // otaceni auta dle osy
        context.translate( this.x, this.y );
        context.rotate( -this.angel );
        // vykresleni
        context.beginPath();
        context.rect(
            // resi umisteni na stredu verticalne
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height
        );
        context.fill();

        context.restore();
    }
}