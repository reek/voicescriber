import {
    getPreloaderCircularFlash,
} from '../../components'
import * as utils from '../../utils/utils';

export class OverlayProcess {
    constructor(message) {
        this.message = message
        this.id = 'overlay-' + utils.uuidv4()
        return this.run()
    }

    run() {
        let skeleton = `
        <div id="${this.id}" style="position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(255,255,255, .8);z-index:9999;cursor:pointer">
            <h4 id="overlay-text" class="center" style="position:absolute;top:50%;left:50%;font-size:50px;color:white;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)">
                ${getPreloaderCircularFlash()}
                <p class="center black-text" style="font-size:70%;">${this.message}</p>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', skeleton);
        return document.getElementById(this.id)
    }
}