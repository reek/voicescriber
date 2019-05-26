import {
    OverlayProcess
} from '../../components'
import * as utils from '../../utils/utils';


export class FileUploadFB {
    constructor(firebase, filedata) {
        this.firebase = firebase
        this.filedata = filedata
        this.overlay = new OverlayProcess('saving...')
        this.run()
    }

    run() {
        this.putFileStorage()
    }

    setFileDatabase() {
        const filedata = Object.assign({
            ...this.filedata
        }, { // remove 
            blob: null,
            buffer: null,
            saved: true
        });

        this.firebase.db.ref(this.filedata.ref).set(filedata, (error) => {
            if (error) {
                console.log('The write failed...', error);
            } else {
                // document.getElementById(this.filedata.itemid).remove()
                console.log('Data saved successfully!.');
            }
            this.overlay.remove()
        });
    }

    putFileStorage() {
        this.fileRef = this.firebase.storage.ref(this.filedata.ref);
        this.uploadTask = this.fileRef.put(this.filedata.blob, { // metadata
                contentType: this.filedata.type,
                cacheControl: "public, max-age=31536000",
                contentDisposition: `attachment; filename="${this.filedata.id}.${this.filedata.extension}"`
            })
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .then((downloadURL) => {
                console.log('File uploaded and available at ', downloadURL);
                this.filedata.url = downloadURL
                this.setFileDatabase()
            })
            .catch(err => alert(err.toString()))
    }
}