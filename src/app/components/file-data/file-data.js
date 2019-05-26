import * as utils from '../../utils/utils';

export class FileData {
    constructor(filedata) {
        /* require: buffer, uid, title, type */
        if (!filedata.buffer) return alert('FileData Unexisting buffer')
        if (!filedata.uid) return alert('FileData Unexisting uid')
        if (!filedata.type) return alert('FileData Unexisting type')
        if (!filedata.title) return alert('FileData Unexisting title')
        this.filedata = filedata
        console.log('FileData', filedata)
        return this.run()
    }

    run() {
        //new Uint8Array(this.filedata.buffer)
        this.filedata.saved = false;
        //console.log(this.filedata.buffer, this.filedata.buffer[0] instanceof Blob)
        this.filedata.blob = new Blob(this.filedata.buffer, {
            type: this.filedata.type
        });
        this.filedata.bytes = this.filedata.blob.size
        this.filedata.size = utils.humanSize(this.filedata.bytes)
        this.filedata.url = window.URL.createObjectURL(this.filedata.blob);
        this.filedata.id = utils.uuidv4()
        this.filedata.timestamp = utils.getTimestamp()
        this.filedata.datetime = new Date().toString()
        this.filedata.title = utils.titlize(this.filedata.title)
        this.filedata.itemid = "record-item-" + this.filedata.id
        this.filedata.trackid = "record-track-" + this.filedata.id
        this.filedata.type = this.filedata.type
        this.filedata.extension = utils.getAudioTypeExtention(this.filedata.type)
        this.filedata.ref = ['records', this.filedata.uid, this.filedata.id].join('/')
        console.log(this.filedata.blob);
        return this.filedata
    }
}