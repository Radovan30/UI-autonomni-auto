// trida neuronove site a jeji definice
class NeuralNetwork {
    constructor ( neuronCounts ) {
        this.levels = [];
        for ( let i = 0; i < neuronCounts.length - 1; i++ ) {
            this.levels.push( new Level(
                neuronCounts[ i ], neuronCounts[ i + 1 ]
            ) );
        }
    }

    // dopredny algoritmus pro dane vstupy a prvni urovni site
    static feedForward( givenInputs, network ) {
        let outputs = Level.feedForward(
            // vola prvni uroven pro vytvoreni vystupu
            givenInputs, network.levels[ 0 ] );
        // cyklus pro prochazeni zbyvajicich urovni a vrati vyslednou hodnotu do 2 urovne
        for ( let i = 1; i < network.levels.length; i++ ) {
            outputs = Level.feedForward(
                outputs,
                network.levels[ i ] );
        }
        return outputs;
    }
}


// vytvoreni tridy neuronove site 1 urovne
class Level {
    //konstruktor vrstvy pro vstupy a vystupy
    constructor ( inputCount, outputCount ) {
        // vstupni pole
        this.inputs = new Array( inputCount );
        // vystupni pole
        this.outputs = new Array( outputCount );
        // pole pro zkresleni
        this.biases = new Array( outputCount );

        // propojeni kazdeho neuronu s kazdym (vaha)
        this.weights = [];
        for ( let i = 0; i < inputCount; i++ ) {
            this.weights[ i ] = new Array( outputCount );
        }
        // nastaveni nahodnou hotnot vaham
        Level.#randomize( this );
    }

    // staticka metoda pro serealizaci metod
    static #randomize( level ) {
        for ( let i = 0; i < level.inputs.length; i++ ) {
            for ( let j = 0; j < level.outputs.length; j++ ) {
                // ziskame hodnotu mezu 1 a -1 
                level.weights[ i ][ j ] = Math.random() * 2 - 1;
            }
        }

        // cyklus pro kontrolu otaceni auta
        for ( let i = 0; i < level.biases.length; i++ ) {
            level.biases[ i ] = Math.random() * 2 - 1;
        }
    }

    // vypocet hodnot dopredneho algoritmu
    static feedForward( givenInputs, level ) {
        // projdeme vsechny urovne vstupu
        for ( let i = 0; i < level.inputs.length; i++ ) {
            // nastavim je na hodnoty ze senzoru
            level.inputs[ i ] = givenInputs[ i ];
        }

        // cyklus pro ziskani vystupu
        for ( let i = 0; i < level.outputs.length; i++ ) {
            // soucet mezi hodnotou vstupu a vahou
            let sum = 0
            for ( let j = 0; j < level.inputs.length; j++ ) {
                sum += level.inputs[ j ] * level.weights[ j ][ i ];
            }

            // kontrola souctu zda je vetsi nez zkresleni vystupniho neuronu a pokud ano nastavime neuron na 1
            if ( sum > level.biases[ i ] ) {
                level.outputs[ i ] = 1;
            } else {
                level.outputs[ i ] = 0;
            }
        }

        return level.outputs;
    }
}