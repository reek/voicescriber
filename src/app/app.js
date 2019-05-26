import {
    Header,
    Footer,
    OverlayProcess,
    ItemRecord
} from "./components";

import {
    Router
} from './providers';

import * as utils from './utils/utils';
import firebase from "firebase";


export class App {
    constructor(root) {
        this.root = root
        this.run()
    }

    run() {
        this.initUI()
        this.initFirebase()
        this.initRouter()
    }

    initFirebase() {
        /*
        fix CORS issue
        sudo pip install gsutil
        https://console.cloud.google.com/home
        mint: software manager =>  google-cloud-sdk 
        gcloud init
        restart terminal
        gsutil cors set cors.json gs://voicescriber.appspot.com

        Le processus suivant se produit lorsqu'un navigateur envoie une requête simple à Cloud Storage :

        Le navigateur ajoute l'en-tête Origin à la requête. L'en-tête Origin contient l'origine de la ressource cherchant à partager les ressources de l'autre domaine, par exemple Origin:http://www.example.appspot.com.

        Cloud Storage compare la méthode HTTP de la requête et la valeur de l'en-tête Origin aux informations sur les méthodes et les origines de la configuration CORS du bucket cible, afin de déterminer s'il existe des correspondances. Le cas échéant, Cloud Storage inclut l'en-tête Access-Control-Allow-Origin dans sa réponse. L'en-tête Access-Control-Allow-Origin contient la valeur de l'en-tête Origin de la requête initiale.

        Le navigateur reçoit la réponse et vérifie si la valeur Access-Control-Allow-Origin correspond au domaine spécifié dans la requête d'origine. Si c'est le cas, la requête aboutit. S'ils ne correspondent pas ou si l'en-tête Access-Control-Allow-Origin n'est pas présent dans la réponse, la requête échoue.

        */
        const config = {
            apiKey: "AIzaSyAbIFo7cc428xVT3xIU0fm9N_9ymb7lWYE",
            authDomain: "voicescriber.firebaseapp.com",
            databaseURL: "https://voicescriber.firebaseio.com",
            projectId: "voicescriber",
            storageBucket: "voicescriber.appspot.com",
            messagingSenderId: "40101980909"
        };
        firebase.initializeApp(config);

        this.firebase = {
            db: firebase.database(),
            refs: {
                records: firebase.database().ref('records'),
                settings: firebase.database().ref('settings')
            },
            auth: firebase.auth(),
            storage: firebase.storage(),
            providers: {
                google: new firebase.auth.GoogleAuthProvider(),
                twitter: new firebase.auth.TwitterAuthProvider(),
                facebook: new firebase.auth.FacebookAuthProvider()
            }
        }

        this.firebase.auth.onAuthStateChanged((user) => {

            // #!records/6p7KObnbB9ZD0UWD3EowybmFGnl2/b84c19c5-def2-42dd-8067-c4b8c30f9949
            // http://localhost:3000/#!records/6p7KObnbB9ZD0UWD3EowybmFGnl2/b84c19c5-def2-42dd-8067-c4b8c30f9949
            const overlay = new OverlayProcess('loading...')
            if (location.hash.indexOf("#!records/") === 0) {
                const route = this.router.get('Share')
                console.log(route)
                new route.component({
                    root: this.appMain,
                    router: this.router,
                    firebase: this.firebase
                });
            } else if (user) {
                // User is signed in.
                console.log('User is signed in.');
                new Header(this.appHeader, this.router, user)
                const route = this.router.get('My Records')
                new route.component({
                    root: this.appMain,
                    router: this.router,
                    firebase: this.firebase
                });
                new Footer(this.appFooter, this.router)
            } else {
                // No user is signed in.
                console.log('No user is signed in.', this.router.loginRoute);
                const route = this.router.get('Login')
                new route.component({
                    root: this.root,
                    router: this.router,
                    firebase: this.firebase
                });
            }
            overlay.remove()
        });

    }

    initUI() {
        this.root.innerHTML = `
        <app-header></app-header>
        <app-main></app-main>
        <app-footer></app-footer>
        `;
        this.appHeader = this.root.querySelector("app-header")
        this.appMain = this.root.querySelector("app-main")
        this.appFooter = this.root.querySelector("app-footer")
    }


    initRouter() {
        this.router = new Router(this.appMain, this.firebase)
    }


    initShare() {
        if (!"onhashchange" in window) return alert("Xour browser not support hashchange event!");
        window.addEventListener("hashchange", (e) => {
            if (location.hash === "#!track/ok") {
                this.appMain.innerHTML = '<h2>My shared record (hashchange)</h2>'
                this.appMain.innerHTML = '<h2>My shared record</h2>'
            }
        });

        const interval = setInterval(() => {
            if (location.hash === "#!track/ok") {
                this.appMain.innerHTML = '<h2>My shared record (setInterval)</h2>'
                clearInterval(interval)
            } else {

            }
        }, 100);
    }
}










/**
To install or update nvm, you can use the install script using cURL:

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

or Wget:

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

Note: If the environment variable $XDG_CONFIG_HOME is present, it will place the nvm files there.

export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm



create .bash_profile and past generated code

nvm install 10
nvm use 10
 *  */