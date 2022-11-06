class Sensor {

    // konstruktor pro sensory na auto
    constructor ( car ) {
        this.car = car;
        this.rayCount = 5; // 5 senzory
        this.rayLength = 150; // 100px dlouhe
        this.raySpread = Math.PI / 2; // vypocet uhlu jak jsou od sebe
        
        this.rays = [];
        this.readings = []; // cteni hodnod pro hranice
    }


    // pouziti roadBorders v update nam poslouzu k ziskani informaci pro senzory
    update( roadBorders ) {
        // provatni metoda senzoru
        this.#castRays();
        this.readings = [];

        // nastaveni hranic jako parametr
        for ( let i = 0; i < this.rays.length; i++ ) {
            this.readings.push(
                this.#getReadings( this.rays[ i ], roadBorders )
            );
        }
    }

    // funkce najdeme prunik bodou ktera najde nejblozsi bod stredtnuti paprsku
    #getReadings( ray, roadBorders ) {
        let touches = [];

        // cyklus pro ziskani hodnot v polich
        for ( let i = 0; i < roadBorders.length; i++ ) {
            const touch = getIntersection(
                ray[ 0 ],
                ray[ 1 ],
                roadBorders[ i ][ 0 ],
                roadBorders[ i ][ 1 ]
            );
            if ( touch ) {
                touches.push( touch );
            }
        }

        // ziskani minimalni vzdalenosti stretu u senzoru
        if ( touches.length == 0 ) {
            return null;
        } else {
            const offsets = touches.map( e => e.offset );
            const minOffset = Math.min( ...offsets );
            return touches.find( e => e.offset == minOffset );
        }
    }

    #castRays() {
        this.rays = [];
        for ( let i = 0; i < this.rayCount; i++ ) {
            // zjisteni uhlu kazdeho jednotliveho pole
            const rayAngle = lerp(
                this.raySpread / 2,
                - this.raySpread / 2,
                this.rayCount == 1 ? 0.5 : i / ( this.rayCount - 1 )
            ) + this.car.angle;

            // vypocet bodu pro senzor
            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x -
                    Math.sin( rayAngle ) * this.rayLength,
                y: this.car.y -
                    Math.cos( rayAngle ) * this.rayLength
            };
            // vlozeno dovnitr pole
            this.rays.push( [ start, end ] );
        }
    }


    // nakresli senzor
    draw( context ) {
        for ( let i = 0; i < this.rayCount; i++ ) {
            let end = this.rays[ i ][ 1 ];
            if ( this.readings[ i ] ) {
                end = this.readings[ i ];
            }

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(
                this.rays[ i ][ 0 ].x,
                this.rays[ i ][ 0 ].y
            );
            context.lineTo(
                end.x,
                end.y
            );
            context.stroke();

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.moveTo(
                this.rays[ i ][ 1 ].x,
                this.rays[ i ][ 1 ].y
            );
            context.lineTo(
                end.x,
                end.y
            );
            context.stroke();
        }
    }
}  