// trida controls - ovladani auta
class Controls {
    // konstruktor nastaveni pohybu na false
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners();
    }

    // # -> privatni metoda
    // zaznamenani udalosti pohybu na klavesnici na true 
    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case 'ArrowUp':
                    this.forward = true;
                    break;
                case 'ArrowDown':
                    this.reverse = true;
                    break;
            }
            //debug
            //console.table(this);
        }
        // zaznamenani udalosti pohybu na klavesnici na false 
        document.onkeyup = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.left = false;
                    console.log('ArrowLeft');
                    break;
                case 'ArrowRight':
                    this.right = false;
                    console.log('ArrowRight');
                    break;
                case 'ArrowUp':
                    this.forward = false;
                    console.log('ArrowUp');
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    console.log('ArrowDown');
                    break;
            }
            //debug
            //console.table(this);
        }
    }



}