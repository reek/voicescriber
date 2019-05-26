import {
    FileUploadFB,
    FileData
} from '../../components'
import {
    getSkeleton
} from "./file-import-ui";
import * as utils from '../../utils/utils';

export class FileImport {
    constructor(root, firebase, title, fileAllowed = ['wav', 'mp3', 'aac', 'm4a', 'flac', 'ogg', 'webm'], fileSizeMax = 20971520) {
        this.root = root
        this.firebase = firebase
        this.title = title
        this.fileAllowed = fileAllowed
        this.fileSizeMax = fileSizeMax // 20 MB
        this.run()
    }

    run() {
        this.initUI()
        this.initEventsUI()
        M.AutoInit()
    }

    initUI() {
        this.root.innerHTML = getSkeleton(this.fileAllowed.join(', '), utils.humanSize(this.fileSizeMax));
        this.fileInput = this.root.querySelector('#file')
        this.nameInput = this.root.querySelector('#fileName')
        this.browseButton = this.root.querySelector('#browseButton')
        this.importButton = this.root.querySelector('#importButton')
    }

    initEventsUI() {
        this.root.addEventListener("click", (e) => {
            //if (e.target.type !== 'file') return e.preventDefault();
            console.log('clicked', e.target)
            if (e.target.classList.contains('import')) {
                utils.dialogConfirm('Are you sure to want import this audio file ?')
                    .then(() => {
                        this.importFile()
                    })
                    .catch(err => console.log(err.toString()))
            }
            if (e.target.classList.contains('browse')) {
                this.fileInput.click()
            }
        })

        this.fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0],
                extension = utils.getAudioTypeExtention(file.type)
            console.log(file.type, extension, utils.humanSize(file.size))
            this.nameInput.value = file.name

            if (this.fileAllowed.indexOf(extension) === -1) {
                this.importButton.classList.add('hide')
                return alert("Sorry, this file format is not allowed !")
            }
            if (file.size > this.fileSizeMax) {
                this.importButton.classList.add('hide')
                return alert("Sorry, this file is too big ! (max: " + utils.humanSize(this.fileSizeMax) + ")")
            }
            this.importButton.classList.remove('hide')
        })
    }

    importFile() {
        const file = this.fileInput.files[0];
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            console.log('fileReaderLoaded', fileReader.readyState); // readyState will be 1
            const bufferArray = e.target.result; // put in an array
            const filedata = new FileData({
                uid: this.firebase.auth.currentUser.uid,
                title: file.name,
                buffer: [bufferArray],
                type: file.type
            })
            new FileUploadFB(this.firebase, filedata)
        };

        fileReader.onprogress = (e) => {
            console.log('fileReaderLoading', fileReader.readyState); // readyState will be 1
        };

        fileReader.onerror = (err) => {
            console.log('fileReaderError', err, fileReader.error); // readyState will be 2
        };

        fileReader.readAsArrayBuffer(file);
    }
}