export class MessageError {
    constructor(root, message, error = null, position = false) {
        this.root = root
        this.message = message.toString()
        this.position = position
        this.error = error
        this.run()
    }

    run() {
        this.initUI()
    }

    initUI() {
        let skeleton = `
        <blockquote>
            <p>${this.message}</p>
        </blockquote>
        `;
        if (this.error) console.error(this.error)
        if (this.position) return this.root.insertAdjacentHTML(this.position, skeleton);
        this.root.innerHTML = skeleton;

    }
}