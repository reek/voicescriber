export class VoiceVisualizer {
    constructor(root, stream, color = {
        fg: "#000",
        bg: "#fff"
    }) {
        this.root = root
        this.stream = stream
        this.color = color
        this.run()
    }

    run() {
        // visualiser setup - create web audio api context and canvas
        this.canvas = this.root;
        this.audioContext = new(window.AudioContext || webkitAudioContext)();
        this.canvasContext = this.canvas.getContext("2d");
        this.source = this.audioContext.createMediaStreamSource(this.stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.source.connect(this.analyser);
        //this.analyser.connect(this.audioContext.destination);
        this.draw()
        // resize canvas
        window.onresize = () => {
            this.canvas.width = this.canvas.parentNode.offsetWidth
        }
        window.onresize();

    }

    draw() {
        let width = this.canvas.width
        let height = this.canvas.height;

        //requestAnimationFrame(this.drawVoiceVisualizer.bind(this));
        requestAnimationFrame(() => this.draw());

        this.analyser.getByteTimeDomainData(this.dataArray);
        this.canvasContext.fillStyle = this.color.bg;
        this.canvasContext.fillRect(0, 0, width, height);
        this.canvasContext.lineWidth = 3;
        this.canvasContext.strokeStyle = this.color.fg;
        this.canvasContext.beginPath();

        let sliceWidth = width * 1.0 / this.bufferLength;
        let x = 0;
        for (let i = 0; i < this.bufferLength; i++) {
            let v = this.dataArray[i] / 128.0;
            let y = v * height / 2;
            if (i === 0) {
                this.canvasContext.moveTo(x, y);
            } else {
                this.canvasContext.lineTo(x, y);
            }
            x += sliceWidth;
        }
        this.canvasContext.lineTo(width, height / 2);
        this.canvasContext.stroke();
    }
}