import '../../assets/styles/reset.css';
import '../../assets/styles/style.css';

import { LocalStorageService } from './Service/LocalStorageService';

const STORAGE_KEY = "lidem-post-it"; // key to recover data from local storage

class App {
    noteStorage = null;

    constructor() {
        this.noteStorage = new LocalStorageService( STORAGE_KEY );
    }

    /**
     * Start App
     */
    start() {
        console.log('App started');

    }

    render(data) {
       
    }

}

const instance = new App();

export default instance; // allows to import this class into another file only one instance of App - like a singleton (imports allways the same instance)