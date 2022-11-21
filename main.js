// nastaveni canvas
const carCanvas = document.getElementById( "carCanvas" );
carCanvas.width = 200;
const networkCanvas = document.getElementById( "networkCanvas" );
networkCanvas.width = 300;

const carContext = carCanvas.getContext( "2d" );
const networkContext = networkCanvas.getContext( "2d" );

// vytvoreni pruhu
const road = new Road( carCanvas.width / 2, carCanvas.width * 0.9 );
// vytvoreni auta (stred pruhu (cislo ve kterem se auto bude nachatet), pozice auta y, sirka, vyska, klic - pro urceni auta a jeho funkci )
const car = new Car( road.getLaneCenter( 1 ), 100, 30, 50, "AI" );
// pole pridanych aut - auto ve stejnem pruhu 
const traffic = [
    new Car( road.getLaneCenter( 1 ), -100, 30, 50, "DUMMY", 2 )
];

animate();

function animate( time ) {
    // cyklus ktery projde vsemi auty v provozu
    for ( let i = 0; i < traffic.length; i++ ) {
        traffic[ i ].update( road.borders, [] );
    }
    //detekovani hranic senzoru
    car.update( road.borders, traffic );

    // vykresleni pole trate a pole pro neuronovou sit
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // jizda autem posun po ose y 
    carContext.save();
    carContext.translate( 0, -car.y + carCanvas.height * 0.7 );

    // vykresleni aut
    road.draw( carContext );
    for ( let i = 0; i < traffic.length; i++ ) {
        traffic[ i ].draw( carContext, "red" );
    }
    car.draw( carContext, "blue" );

    carContext.restore();

    networkContext.lineDashOffset = -time / 50;
    Visualizer.drawNetwork( networkContext, car.brain );
    requestAnimationFrame( animate );
}   