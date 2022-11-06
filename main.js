
// nastaveni canvas
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// 
const context = canvas.getContext( "2d" );
// vytvoreni pruhu
const road = new Road( canvas.width / 2, canvas.width * 0.9 );
// vytvoreni auta (stred pruhu (cislo ve kterem se auto bude nachatet), pozice auta y, sirka, vyska )
const car = new Car(road.getLaneCenter(3), 100, 30, 50);

animate();

function animate() {
    //detekovani hranic senzoru
    car.update(road.borders);

    canvas.height = window.innerHeight;
    
    // jizda autem posun po ose y 
    context.save();
    context.translate( 0, -car.y + canvas.height*0.7 );
    
    road.draw( context );
    car.draw( context );
    
    ctx.restore();
    requestAnimationFrame(animate);
}   