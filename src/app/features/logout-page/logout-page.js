import {
    getSkeleton
} from "./logout-page-ui";

export class LogoutPage {
    constructor(parameters) {
        if (!parameters.root) return alert('LogoutPage Invalid root');
        if (!parameters.router) return alert('LogoutPage Unexisting router');
        Object.assign(this, parameters)
        this.run()
    }

    run() {
        this.initUI()
        this.signOut()
    }

    initUI() {
        this.root.innerHTML = getSkeleton()
    }

    signOut() {
        setTimeout(() => {
            this.firebase.auth.signOut();
            location.reload()
        }, 3000)
    }
}