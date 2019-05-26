import {
    VoiceRecorder
} from "../../components";

export class RecordingPage {
    constructor(parameters) {
        if (!parameters.root) return alert('RecordingPage Invalid root');
        if (!parameters.router) return alert('RecordingPage Unexisting router');
        Object.assign(this, parameters)
        this.run()
    }

    run() {
        this.initUI()
        this.initComponents()
    }

    initUI() {
        this.root.innerHTML = `
            <app-voice-recorder></app-voice-recorder>
            <app-voice-records></app-voice-records>
            `
    }

    initComponents() {
        //console.log(this.root.querySelector("app-footer"), this.root.querySelector("app-header"))

        new VoiceRecorder(this.root, this.firebase)


        //new Footer(this.root.querySelector("footer"))
        /*         new Searchbar(document.querySelector("#searchbar"))
                new Timer(document.querySelector("#timer"))
                new Say(document.querySelector("#say"), this.user.displayName || this.user.email)
                new Favoris(document.querySelector("#favoris"), this.db, this.auth)
                new Meteo(document.querySelector("#meteo")) */
    }
}