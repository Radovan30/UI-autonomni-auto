// nastaveni canvas
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// 
const context = canvas.getContext( "2d" );
// vytvoreni pruhu
const road = new Road( canvas.width / 2, canvas.width * 0.9 );
// vytvoreni auta (stred pruhu (cislo ve kterem se auto bude nachatet), pozice auta y, sirka, vyska, klic - pro urceni auta a jeho funkci )
const car = new Car( road.getLaneCenter( 1 ), 100, 30, 50, "KEYS" );
// pole pridanych aut - auto ve stejnem pruhu 
const traffic = [
    new Car( road.getLaneCenter( 1 ), -100, 30, 50, "DUMMY",2 )
];


animate();


function animate() {
    // cyklus ktery projde vsemi auty v provozu
    for ( var i = 0; i < traffic.length; i++ ) {
        traffic[ i ].update( road.borders, [] );
    }

    //detekovani hranic senzoru
    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;
    
    // jizda autem posun po ose y 
    context.save();
    context.translate( 0, -car.y + canvas.height*0.7 );
    
    road.draw( context );
    // vykresleni aut
    for ( let i = 0; i < traffic.length; i++ )  {
        traffic[i].draw( context, "red" );
    }
    car.draw( context, "blue" );
    
    context.restore();
    requestAnimationFrame(animate);
}   