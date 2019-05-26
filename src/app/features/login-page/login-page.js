import {
    MessageError
} from '../../components'
import {
    getSkeleton
} from "./login-page-ui";


export class LoginPage {
    constructor(parameters) {
        if (!parameters.root) return alert('Invalid htmlElement in LoginPage');
        if (!parameters.router) return alert('Unexisting router in LoginPage');
        Object.assign(this, parameters)
        this.run()
    }

    run() {
        this.initUI()
        this.initEventsUI()
        M.AutoInit()
    }

    initUI() {
        this.root.querySelector("app-main").innerHTML = getSkeleton()
        this.rootLoginForm = this.root.querySelector("#login-form")
        this.rootRegisterForm = this.root.querySelector("#register-form")
        this.rootError = this.root.querySelector("#error")
    }

    initEventsUI() {

        this.rootLoginForm.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(e.target)

            // switch sign in
            if (e.target.classList.contains('google')) return this.signInProvider(this.firebase.providers.google)
            if (e.target.classList.contains('facebook')) return this.signInProvider(this.firebase.providers.facebook)
            if (e.target.classList.contains('twitter')) return this.signInProvider(this.firebase.providers.twitter)
            if (e.target.classList.contains('login')) {
                const inputValues = [...this.rootLoginForm.querySelectorAll('input')].map(input => {
                    if (['email', 'password'].indexOf(input.type) !== -1) {
                        return input.value
                    }
                })
                console.log(inputValues)
                if (inputValues.length === 2) return this.signIn(...inputValues)
            }
        })

        this.rootRegisterForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputValues = [...e.target.querySelectorAll('input')].map(input => {
                if (['text', 'email', 'password'].indexOf(input.type) !== -1) {
                    return input.value
                }
            })

            console.log(inputValues)
            if (inputValues.length !== 4) return
            const {
                username,
                email,
                password,
                confirm
            } = inputValues

            if (password !== confirm) {
                return new MessageError(this.rootError, "The password and confirmation password do not match.")
            }
            this.signUp(...inputValues)
        })
    }

    signUp(username, email, password, confirm) {
        this.firebase.auth.createUserWithEmailAndPassword(email, password)
            .then(data => {
                console.log("signUpOk", data)
                data.user.updateProfile({
                    displayName: username,
                    photoURL: null
                  })
            })
            .catch((error) => {
                console.log("signUpErr", error)
                return new MessageError(this.rootError, error.message)
            });
    }

    signIn(email, password) {
        console.log(0, email, password)
        this.firebase.auth.signInWithEmailAndPassword(email, password)
            .then(data => {
                console.log("signInOk", data)
            }).catch((error) => {
                console.log("signInErr", error)
                this.root.querySelector('#alert').innerHTML = error.message
            });
    }

    signInProvider(provider) {
        this.firebase.auth.signInWithPopup(provider)
            .then((result) => {
                const token = result.credential.accessToken;
                const user = result.user;
                console.log('signInProviderOk', result);
            }).catch((error) => {
                console.log('signInProviderErr', error);
            });
    }

}