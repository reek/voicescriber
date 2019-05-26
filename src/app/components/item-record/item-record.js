import WaveSurfer from 'wavesurfer.js/dist/wavesurfer';
import ClipboardJS from "clipboard/dist/clipboard";
//import WaveSurferTimeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min';
//import WaveSurferMicrophone from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min';


import {
    OverlayProcess,
    FileUploadFB,
    FileDeleteFB
} from '../../components'
import {
    getTinyphURL
} from '../../providers'
import {
    getSkeleton
} from "./item-record-ui";
import * as utils from '../../utils/utils';


export class ItemRecord {
    constructor(root, firebase, filedata, isPrivate = true) {
        if (!root) return alert('FileData Unexisting root')
        if (!firebase) return alert('FileData Unexisting firebase')
        if (!filedata) return alert('FileData Unexisting filedata')
        this.root = root
        this.firebase = firebase
        this.filedata = filedata
        this.isPrivate = isPrivate
        console.log('ItemRecord', root, filedata)
        this.run()
    }

    run() {
        this.initUI()
        this.initWaveSurfer()
        this.initEventsUI()
        M.AutoInit();
    }

    initUI() {
        this.root.insertAdjacentHTML('afterbegin', getSkeleton(this.filedata, this.isPrivate));
        this.rootItem = this.root.querySelector('#' + this.filedata.itemid)
        this.rootTrack = this.root.querySelector('#' + this.filedata.trackid)
        this.rootPlay = this.root.querySelector('.play')
        this.rootCurrentTime = this.root.querySelector('.current-time')
        this.rootDuration = this.root.querySelector('.duration')
    }

    initWaveSurfer() {
        console.log('wavesurfer', this.rootTrack, this.filedata.trackid)
        this.wavesurfer = WaveSurfer.create({
            container: this.rootTrack,
            waveColor: 'teal',
            progressColor: 'red',
            cursorColor: 'grey',
            barWidth: 3,
            responsive: true
        });
        this.wavesurfer.load(this.filedata.url);
    }

    initEventsUI() {

        // make shortUrl for sharing
        const copyButton = this.root.querySelector('i.copy')
        if (copyButton) getTinyphURL(copyButton.getAttribute('data-clipboard-text')).then(shortUrl => copyButton.setAttribute('data-clipboard-text', shortUrl))

        this.wavesurfer.on("play", (e) => {
            //this.rootPlay.classList.remove('red')
            this.rootPlay.innerHTML = '<i class="material-icons play">pause</i>'
        })
        this.wavesurfer.on("pause", (e) => {
            //this.rootPlay.classList.add('red')
            this.rootPlay.innerHTML = '<i class="material-icons play">play_arrow</i>'
        })
        this.wavesurfer.on("ready", (e) => {
            const secs = this.wavesurfer.getDuration().toFixed(0) * 1000
            this.rootDuration.innerHTML = utils.getHumanTime(secs)
        })
        this.wavesurfer.on("audioprocess", (e) => {
            const secs = this.wavesurfer.getCurrentTime().toFixed(0) * 1000
            this.rootCurrentTime.innerHTML = utils.getHumanTime(secs)
        })


        this.rootItem.addEventListener("click", (e) => {
            e.preventDefault();
            console.log('rootItemclicked', e.target)

            // switch sign in
            if (e.target.classList.contains('backward')) return this.wavesurfer.skipBackward();
            if (e.target.classList.contains('play')) return this.wavesurfer.playPause()
            if (e.target.classList.contains('forward')) return this.wavesurfer.skipForward();
            if (e.target.classList.contains('download')) return utils.forceDownload(e.target.parentNode.href, e.target.parentNode.getAttribute("download"));
            if (e.target.classList.contains('copy')) {
                const clipboard = new ClipboardJS('.copy')
                    .on('success', (e) => {
                        alert('Share link copied!', e.text)
                        e.clearSelection();
                    });
            }
            if (e.target.classList.contains('rename')) {
                utils.dialogPrompt('Enter a new title for your record ?')
                    .then((title) => {
                        const ref = e.target.getAttribute('data-ref')
                        this.firebase.db.ref(ref).update({
                            "title": title
                        });
                        location.reload()
                        /*                         const route = this.router.get('My Records')
                                                new route.component({
                                                    root: this.root,
                                                    router: this.router,
                                                    firebase: this.firebase
                                                }); */
                    })
                    .catch(err => console.log(err.toString()))
            }
            if (e.target.classList.contains('save')) {
                this.rootItem.remove()
                new FileUploadFB(this.firebase, this.filedata)
            }
            if (e.target.classList.contains('delete')) {
                utils.dialogConfirm('Are you sure to delete this record ?')
                    .then(() => {
                        this.overlay = new OverlayProcess('deleting...')
                        if (this.filedata.saved) new FileDeleteFB(this.firebase, this.filedata)
                        this.rootItem.remove()
                        this.overlay.remove()
                    })
                    .catch(err => console.log(err.toString()))
            }
        })

    }
}