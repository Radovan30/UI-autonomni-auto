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
        this.angle = 0;

        this.sensor = new Sensor( this );
        this.controls = new Controls();
    }

    update( roadBorders ) {
        if ( !this.damaged ) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage( roadBorders );
        }
        this.sensor.update( roadBorders );
    }
    
    #assessDamage( roadBorders ) {
        for ( let i = 0; i < roadBorders.length; i++ ) {
            if ( polysIntersect( this.polygon, roadBorders[ i ] ) ) {
                return true;
            }
        }
        return false;
    }
    
    // vytvoreni polygonu na detekovani kolizi
    #createPolygon() {
        const points = [];
        const rad = Math.hypot( this.width, this.height ) / 2;
        const alpha = Math.atan2( this.width, this.height );
        points.push( {
            x: this.x - Math.sin( this.angle - alpha ) * rad,
            y: this.y - Math.cos( this.angle - alpha ) * rad
        } );
        points.push( {
            x: this.x - Math.sin( this.angle + alpha ) * rad,
            y: this.y - Math.cos( this.angle + alpha ) * rad
        } );
        points.push( {
            x: this.x - Math.sin( Math.PI + this.angle - alpha ) * rad,
            y: this.y - Math.cos( Math.PI + this.angle - alpha ) * rad
        } );
        points.push( {
            x: this.x - Math.sin( Math.PI + this.angle + alpha ) * rad,
            y: this.y - Math.cos( Math.PI + this.angle + alpha ) * rad
        } );
        return points;
        
    }

    // posun auta, rychlost a akcelerace
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
                this.angle += 0.03 * flip;
            }
            if ( this.controls.right ) {
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin( this.angle ) * this.speed;
        this.y -= Math.cos( this.angle ) * this.speed;
    }

    // vykresleni auta do canvas
    draw( context ) {
        if ( this.damaged ) {
            context.fillStyle = "gray";
        } else {
            context.fillStyle = "black";
        }
        context.beginPath();
        context.moveTo( this.polygon[ 0 ].x, this.polygon[ 0 ].y );
        for ( let i = 1; i < this.polygon.length; i++ ) {
            context.lineTo( this.polygon[ i ].x, this.polygon[ i ].y );
        }
        context.fill();

        this.sensor.draw( context );

        /*
        context.save();
        // otaceni auta dle osy
        context.translate( this.x, this.y );
        context.rotate( -this.angle );
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
        // auto vykresli vlastni sensor
        this.sensor.draw( context );
        
        */
        
    }
}

