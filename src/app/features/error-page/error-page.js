import {
    getSkeleton
} from "./error-page-ui";

export class ErrorPage {
    constructor(parameters) {
        if (!parameters.root) return alert('ErrorPage Invalid htmlElement');
        if (!parameters.router) return alert('ErrorPage Unexisting router');
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