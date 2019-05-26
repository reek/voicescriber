import {
    getPreloaderCircularFlash,
    OverlayProcess,
    MessageError,
    FileData,
    ItemRecord,
    VoiceVisualizer
} from '../../components'
import * as utils from '../../utils/utils';


export class VoiceRecorder {
    constructor(root, firebase) {
        this.root = root
        this.firebase = firebase
        this.run()
    }

    run() {
        this.initUI()
        this.initVoiceRecorder()
        this.initEventsUI()
        //this.initWaveSurferMic()
    }

    initUI() {
        this.root.innerHTML = ` 
        <div class="container">
            <div class="row center">
                <h1>Recording</h1>
                <div id="recording">
                ${getPreloaderCircularFlash()}
            </div>
            <div class="row center">
                <h3>Unsaved</h3>
                <div id="records"></div>
            </div>
         </div>
`;
        this.rootRecording = this.root.querySelector('#recording');
        this.rootRecords = this.root.querySelector('#records');
    }

    initWaveSurferMic() {
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            cursorColor: '#0f0',
            barWidth: 3,
            plugins: [
                WaveSurferMicrophone.create({})
            ]
        });
    }

    initRecordButton() {
        this.rootButton.addEventListener("click", (e) => {
            if (this.mediaRecorder.state === "inactive") {
                this.mediaRecorder.start();
                this.rootButton.classList.toggle('red')
                this.rootButton.classList.toggle('pulse')
                this.rootButton.innerHTML = '<i class="material-icons">stop</i>'
                console.log("recorder start");
            } else {
                this.mediaRecorder.stop();
                this.rootButton.classList.toggle('red')
                this.rootButton.classList.toggle('pulse')
                this.rootButton.innerHTML = '<i class="material-icons">mic</i>'
                console.log("recorder stop");
            }
        })
    }


    initEventsUI() {

    }

    initVoiceRecorder() {
        this.buffer = [];

        // cross-getUserMedia
        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        if (navigator.getUserMedia) {

            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then((stream) => {

                this.rootRecording.innerHTML = `
                <div class="section">
                    <canvas id="visualizer" height="60px"></canvas>
                    <a class="btn-floating pulse btn-large waves-effect waves-light red record"><i class="material-icons">mic</i></a>
                </div>`;

                this.rootButton = this.root.querySelector('.record');
                this.rootVisualiser = this.root.querySelector('#visualizer')
                this.initRecordButton()
                // console.log(utils.getAudioMimeTypes())
                 console.log(utils.getAudioSupportedPlayTypes())
                // console.log(utils.getAudioSupportedRecorderTypes())

                const options = {
                    audioBitsPerSecond: 192000,
                    mimeType: 'audio/webm' // compatible with all browsers
                }
                this.mediaRecorder = new MediaRecorder(stream, options);
                this.mediaRecorder.onstop = (e) => {
                    console.log("recorder stopped");
                    utils.dialogPrompt('Enter a title for your record ?')
                        .then(title => {
                            const filedata = new FileData({
                                uid: this.firebase.auth.currentUser.uid,
                                buffer: this.buffer,
                                title: title,
                                type: options.mimeType
                            })
                            new ItemRecord(this.rootRecords, this.firebase, filedata)
                            this.buffer = []; // reset 
                        })
                        .catch(err => {
                            this.buffer = []; // reset 
                            new MessageError(this.rootRecording, err.toString(), err);
                        })
                }
                this.mediaRecorder.ondataavailable = (e) => {
                    this.buffer.push(e.data);
                }
                console.log(stream)
                new VoiceVisualizer(this.rootVisualiser, stream)
            }).catch((err) => {
                new MessageError(this.rootRecording, err.message, err);
            });
        } else {
            new MessageError(this.rootRecording, 'your browser not supported getUserMedia!');
        }
    }

}