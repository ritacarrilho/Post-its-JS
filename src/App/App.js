import '../../assets/styles/reset.css';
import '../../assets/styles/style.css';

import { Nota } from './Entity/Nota';
import { LocalStorageService } from './Service/LocalStorageService';

const STORAGE_KEY = "lidem-post-it"; // key to recover data from local storage

class App {
    notesStorage = null;

    // post its array   
    arrNotas = [];
    // Editing mode flag
    isEditing = false;

    // UI elements
    elBtnBoardClean = null;
    elForm = null;
    elNewTitle = null;
    elNewContent = null;
    elBoard = null;

    constructor() {
        this.notesStorage = new LocalStorageService( STORAGE_KEY );

        this.elBtnBoardClean = document.getElementById( 'btn-board-clear' );
        this.elForm = document.forms[0];
        this.elNewTitle = document.getElementById( 'new-nota-title' );
        this.elNewContent = document.getElementById( 'new-nota-content' );
        this.elBoard = document.getElementById( 'board' );
    }

    /**
     * Start App
     */
    start() {
        console.info( 'Starting App...' );

        // - Initialisation des gestionnaires d'événement
        this.elBtnBoardClean.addEventListener( 'click', this.handlerBoardClear.bind(this) );
        this.elForm.addEventListener( 'submit', this.handlerSubmitNew.bind(this) );
        this.elNewTitle.addEventListener( 'focus', this.handlerRemoveError.bind(this) );
        this.elNewContent.addEventListener( 'focus', this.handlerRemoveError.bind(this) );


        // Evénements de la class Nota
        document.addEventListener( 'notaEdit', this.handlerNotaEdit.bind(this) );
        document.addEventListener( 'notaSave', this.handlerNotaSave.bind(this) );
        document.addEventListener( 'notaDelete', this.handlerNotaDelete.bind(this) );

        let itemStorage = this.notesStorage.getJSON();

        // Si le stockage n'est pas encore crée on ne pass à la suite
        if( itemStorage === null ) return;

        for( let notaJSON of itemStorage ) this.arrNotas.push( new Nota( notaJSON ) );

        this.render();
    }

    render() {
        // Tri par date
        /* arrNotas.sort( function( notaA, notaB ){
            return notaB.dateUpdate - notaA.dateUpdate;
        }); */

        // Syntaxe avec fonction fléchée
        this.arrNotas.sort( ( notaA, notaB ) => notaB.dateUpdate - notaA.dateUpdate );
            
        // Vidange de l'affichage actuelle
        this.elBoard.innerHTML = '';

        for( let nota of this.arrNotas ) this.elBoard.append( nota.getDOM() );
    }

    //Event Handlers
    /**
     * Gestionnaire d'événements désactivation erreur d'un champ de saise
     */
     handlerRemoveError(evt) {
        evt.target.classList.remove( 'error' );
    }

    /**
     * Gestionnaire d'événements de purge des Notas
     */
    handlerBoardClear() {
        if ( this.isEditing ) return;

        const userApprobation = confirm('Are you sure you want to clear the board and delete all Notas ?'); // TODO: replace this confirm for a html modal 

        // if the user click "Annuler" we exit this method
        if(!userApprobation) return;

        this.arrNotas = []; // Vidange du tableau de Notas
        this.elBoard.innerHTML = '';// Vidange du contenu affiché de board
        this.notesStorage.clear();
    }

    /**
     * Gestionnaire d'événements de soumission du formulaire d'ajout
     */
    handlerSubmitNew(evt) {
        // preventDefault() empêche le comportement initial de l'événement (ici le rechargement de la page)
        evt.preventDefault();

        if ( this.isEditing ) return;
            
        // Contrôle de la saisie
        let hasError = false,
            regAlphaNum = new RegExp('^[A-Za-z0-9 ]+$'),
            strTitle = this.elNewTitle.value.trim(),
            strContent = this.elNewContent.value.trim();

        // --- Traitement des erreur
        //  -- Title
        // - Si la chaine est vide 
        // - ou contient autre chose que des chiffres et des lettres 
        // => ERREUR
        if( !regAlphaNum.test( strTitle ) ) {
            hasError = true;
            this.elNewTitle.value = '';
            this.elNewTitle.classList.add( 'error' );
        }

        // -- Content
        // Si la chaine este vide: ERREUR
        if( strContent.length <= 0 ) {
            this.hasError = true;
            this.elNewContent.classList.add( 'error' );
        }

        // S'il y a au moins une erreur on interrompt le traitement
        if( hasError ) return; 

        // Vidange du formulaire
        this.elNewTitle.value 
            = this.elNewContent.value 
            = '';

        // Traitement des données 
        const newNota = {};

        newNota.dateCreate 
            = newNota.dateUpdate 
            = Date.now();
        newNota.title = strTitle;
        newNota.content = strContent;

        // Enregistrement
        // Array.push() permet d'insérer une valeur à fun d'un tableau
        this.arrNotas.push( new Nota(newNota) ); 

        // Mise à jour de l'affichage
        this.render();

        // Persistance des données
        this.notesStorage.setJSON( this.arrNotas );
    }

    handlerNotaEdit( evt ) {
        // console.log( evt );
        // console.log( this.arrNotas );

        this.isEditing = true;
    }

    handlerNotaSave( evt ) {
        // console.log( evt );
        // console.log( this.arrNotas );

        this.isEditing = false;
        // Mise à jour de l'affichage
        this.render();
        
        // Persistance des données
        this.notesStorage.setJSON( this.arrNotas );
    }

    handlerNotaDelete( evt ) {
        // console.log( evt );
        // console.log( this.arrNotas );

        // if the post it is in editing mode, disable delete feature
        if(this.isEditing) return;

        const
            nota = evt.detail.nota,
            userApprobation = confirm(
            `Are you sure you want to delete the Nota titled:
            "${nota.title}" ?`); // TODO: replace this confirm for a html modal 
        
        // if the user click "Annuler" we exit this method
        if(!userApprobation) return;

        // search array index
        const idxNota = this.arrNotas.indexOf(evt.detail.nota);
        // otherwise we delete
        this.arrNotas.splice(idxNota, 1); 
                                
        this.render();
        // replace old array of notas for the array withou the deleted nota 
        this.notesStorage.setJSON( this.arrNotas );
    }
}

const instance = new App();

export default instance; // allows to import this class into another file only one instance of App - like a singleton (imports allways the same instance)