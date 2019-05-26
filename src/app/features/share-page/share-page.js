import {
    getSkeleton
} from "./share-page-ui";
import {
    ItemRecord
} from "../../components";

export class SharePage {
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
        this.rootRecords = this.root.querySelector('#records');
        this.rootQRcode = this.root.querySelector('#qrcode');
    }

    initEventsUI() {

        // listen database
        const hash = location.hash
        this.firebase.db.ref(hash.substring(2)).once('value').then((snapshot) => {
            const filedata = snapshot.val()
            const url = location.href
            const qrcodeUrl = `https://qrickit.com/api/qr.php?d=${encodeURIComponent(url)}&addtext=Voicescriber&txtcolor=000000&fgdcolor=000000&bgdcolor=ffffff&qrsize=150&t=p&e=m`
            console.log('sharePage', url, snapshot.val())
            new ItemRecord(this.rootRecords, this.firebase, filedata, false)
            this.rootQRcode.innerHTML = `<img src="${qrcodeUrl}">`

        }).catch(err => console.log('hash', err));
    }

    initComponents() {

    }
}