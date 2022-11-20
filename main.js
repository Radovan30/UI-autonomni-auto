// nastaveni canvas
const canvas = document.getElementById( "myCanvas" );
canvas.width = 200;
const networkCanvas = document.getElementById( "networkCanvas" );
networkCanvas.width = 300;

const carContext = canvas.getContext( "2d" );
const networkContext = networkCanvas.getContext( "2d" );

// vytvoreni pruhu
const road = new Road( canvas.width / 2, canvas.width * 0.9 );
// vytvoreni auta (stred pruhu (cislo ve kterem se auto bude nachatet), pozice auta y, sirka, vyska, klic - pro urceni auta a jeho funkci )
const car = new Car( road.getLaneCenter( 1 ), 100, 30, 50, "AI" );
// pole pridanych aut - auto ve stejnem pruhu 
const traffic = [
    new Car( road.getLaneCenter( 1 ), -100, 30, 50, "DUMMY", 2 )
];

animate();

function animate() {
    // cyklus ktery projde vsemi auty v provozu
    for ( let i = 0; i < traffic.length; i++ ) {
        traffic[ i ].update( road.borders, [] );
    }
    //detekovani hranic senzoru
    car.update( road.borders, traffic );

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // jizda autem posun po ose y 
    carContext.save();
    carContext.translate( 0, -car.y + canvas.height * 0.7 );

    road.draw( carContext );
    // vykresleni aut
    road.draw( carCtx );
    for ( let i = 0; i < traffic.length; i++ ) {
        traffic[ i ].draw( carContext, "red" );
    }
    car.draw( carContext, "blue" );

    carContext.restore();

    requestAnimationFrame( animate );
}   