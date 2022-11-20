// trida controls - ovladani auta
class Controls {
    // konstruktor nastaveni pohybu -> false, type pro klic auta
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        // urceni specivikace pro dane auto
        switch ( type ) {
            case "KEYS":
            this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }

    // # -> privatni metoda
    // zaznamenani udalosti pohybu na klavesnici a zmena -> true 
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
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case 'ArrowUp':
                    this.forward = false;
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    break;
            }
            //debug
            //console.table(this);
        }
    }
}