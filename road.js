// trida pro vykresleni okrajovych car

class Road {

    // konstruktor pro nastaveni pruhu ( x, vyska, pocet)
    constructor ( x, width, laneCount = 3 ) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = - infinity;
        this.bottom = infinity;

        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        // nastaveni maximalnich souradnic 
        this.borders = [
            [ topLeft, bottomLeft ],
            [ topRight, bottomRight ]
        ];
    }

    // zobrazeni uprostred pruhu
    getLaneCenter( laneIndex ) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 +
            Math.min( laneIndex, this.laneCount - 1 ) * laneWidth;
    }

    draw( context ) {
        context.lineWidth = 5;
        context.strokeStyle = "white";

        // cyklus pro vykresleni pruhu
        for ( let i = 0; i <= this.laneCount - 1; i++ ) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
            // prostredni pruhy budou rozdeleny po 20px -> 20 barva a 20 mezera
            context.setLineDash( [ 20, 20 ] );
            // vykresleni pruhu od zhora dolu
            context.beginPath();
            context.moveTo( x, this.top );
            context.lineTo( x, this.bottom );
            context.stroke();

        }

        // krajni pruhy jsou v cele bez mezer            
        context.setLineDash( [] );
        this.borders.forEach( border => {
            context.beginPath();
            context.moveTo( border[ 0 ].x, border[ 0 ].y );
            context.lineTo( border[ 1 ].x, border[ 1 ].y );

            context.stroke();
        } );
    }
}




