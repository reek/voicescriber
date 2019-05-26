import {
    getSkeleton
} from "./my-records-page-ui";
import {
    FileImport,
    ItemRecord
} from "../../components";

export class MyRecordsPage {
    constructor(parameters) {
        if (!parameters.root) return alert('MyRecordsPage Invalid root');
        if (!parameters.router) return alert('MyRecordsPage Unexisting router');
        Object.assign(this, parameters)
        this.run()
    }

    run() {
        this.initUI()
        this.initComponents()
        this.initEventsUI()
    }

    initUI() {
        this.root.innerHTML = getSkeleton()
        this.rootImport = this.root.querySelector('#import');
        this.rootRecords = this.root.querySelector('#records');
    }

    initEventsUI() {

        // listen database
        const ref = this.firebase.db.ref('records/' + this.firebase.auth.currentUser.uid).orderByChild('timestamp');
        ref.on('child_added', (snapshot) => { // filedata
            console.log('child_added', snapshot.val());
            new ItemRecord(this.rootRecords, this.firebase, snapshot.val())
        });
    }

    initComponents() {
        new FileImport(this.rootImport, this.firebase)
    }
}