import {
    RecordingPage,
    MyRecordsPage,
    SettingsPage,
    LoginPage,
    LogoutPage,
    SharePage,
    ErrorPage
} from "../../features";
import {
    OverlayProcess
} from '../../components'

export class Router {
    constructor(root, firebase) {
        if (!root) return alert('Router Invalid root');
        if (!firebase) return alert('Router Unexisting firebase');

        this.root = root;
        this.firebase = firebase
        this.header = [{
            text: "Recording",
            icon: "keyboard_voice",
            path: "/recording",
            component: RecordingPage
        }, {
            text: "My Records",
            icon: "perm_camera_mic",
            path: "/my-records",
            component: MyRecordsPage
        }, {
            text: "Settings",
            icon: "settings",
            path: "/settings",
            component: SettingsPage
        }, {
            text: "Logout",
            icon: "power_settings_new",
            path: "/logout",
            component: LogoutPage
        }]

        this.footer = [{
            text: "Firebase",
            icon: "share",
            path: "https://voicescriber.firebaseapp.com/",
            component: null
        }, {
            text: "Nomades",
            icon: "share",
            path: "https://ateliers.nomades.ch/~reves/voicescriber/",
            component: null
        }, {
            text: "Cadze",
            icon: "share",
            path: "https://www.cadze.ch/portfolio/files/voicescriber/",
            component: null
        }]

        this.routes = [
            ...this.header,
            ...this.footer, {
                text: "Login",
                icon: "",
                path: "/login",
                component: LoginPage
            }, {
                text: "Share",
                icon: "",
                path: "#!",
                component: SharePage
            }, {
                text: "Error",
                icon: "",
                path: "/error",
                component: ErrorPage
            }
        ];
    }

    get(text) {
        return this.routes.find(r => r.text === text);
    }

    getHeader() {
        return this.header;
    }

    getFooter() {
        return this.footer;
    }

    navigate(url, dependencies = {}) {

        // external redirection
        if (url.indexOf(location.host) === -1) return location.href = url;

        // internal redirection
        url = url.substring(location.host.length + url.indexOf(location.host))
        if ('/' === url) return;
        console.log(url)


        const route = this.routes.find(r => r.path === url);
        console.log('route', route);
        if (!route) return new ErrorPage({
            root: this.root,
            router: this,
            firebase: this.firebase
        })
        return new route.component(Object.assign({}, {
                root: this.root,
                router: this,
                firebase: this.firebase
            },
            dependencies
        ));
    }

}