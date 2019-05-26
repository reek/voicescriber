import {
    getSkeleton
} from "./settings-page-ui";

export class SettingsPage {
    constructor(parameters) {
        if (!parameters.root) return alert('SettingsrPage Invalid htmlElement');
        if (!parameters.router) return alert('SettingsrPage Unexisting router');
        Object.assign(this, parameters)
        this.run();
    }

    run() {
        this.initUI()
        this.initEventsUI()
    }

    initUI() {
        this.root.innerHTML = getSkeleton()
    }

    initEventsUI() {

    }
    
}