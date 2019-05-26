import {
    OverlayProcess
} from '../../components'
import * as utils from '../../utils/utils';

export class FileDeleteFB {
    constructor(firebase, filedata) {
        this.firebase = firebase
        this.filedata = filedata
        this.overlay = new OverlayProcess('deleting...')
        this.run()
    }

    run() {
        this.deleteFileStorage()
    }

    deleteFileDatabase() {
        this.firebase.db.ref(this.filedata.ref).set(null, (error) => {
            if (error) {
                console.log('Data deleting failed...', error);
            } else {
                console.log('Data deleted successfully!.');
            }
            this.overlay.remove()
        });
    }

    deleteFileStorage() {
        this.fileRef = this.firebase.storage.ref(this.filedata.ref);
        this.fileRef.delete().then(() => {
            console.log('File deleted successfully!.');
            this.deleteFileDatabase()
        }).catch((error) => {
            console.log('File deleting failed...', error);
        });
    }

}