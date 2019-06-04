export const getSkeleton = () => {
    return `
        <div class="container ">
        <div class="center row section">
            <i class="material-icons large red-text">graphic_eq</i>
            <h1 class="black-text"><app-brand>Voicescriber</app-brand></h1>
            <p class="light center">Voice Scriber is a online tool that uses the API of your browser to record your voice using a microphone and save it on
            the cloud.</p>
        </div>
        < <div class="row">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s3"><a class="active" href="#login">Login</a></li>
                    <li class="tab col s3"><a href="#register">Register</a></li>
                </ul>
            </div>
            <div id="login" class="col s12">
                <h3 class="red-text">Log In</h3>
                <form id="login-form">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">mail_outline</i>
                        <input id="login-email" type="email" value="test@mail.com" required>
                        <label for="login-email">Email</label>
                    </div>
                    <div class="input-field col s12">
                       <i class="material-icons prefix">lock_outline</i>
                        <input id="login-password" type="password" value="" min="8" required>
                        <label for="login-password">Password</label>
                    </div>
                    
                    <div><button class="waves-effect waves-light btn red login" type="submit"><i class="material-icons right">send</i>Login</button></div>

                    <div class="section row center">
                    <h5>Or login with</h5>
                    <div class="col s12 hide-on-medium-and-down hide-on-small-only">
                        <span class="col s3"></span>
                        <button class="col s2 btn waves-effect waves-red red google">Google</button>
                        <button class="col s2 btn waves-effect waves-indigo indigo facebook">Facebook</button>
                        <button class="col s2 btn waves-effect waves-blue blue twitter">Twitter</button>
                        <span class="col s3"></span>
                    </div>
                    <div class="col s12 hide-on-med-and-up">
                        <button class="col s12 btn waves-effect waves-red red google">Google</button>
                        <button class="col s12 btn waves-effect waves-indigo indigo facebook">Facebook</button>
                        <button class="col s12 btn waves-effect waves-blue blue twitter">Twitter</button>
                    </div>
                    </div>
                </form>
            </div>
            <div id="register" class="col s12">
                <h3 class="red-text">Create an account</h3>
                <form id="register-form">
               
                <div class="input-field col s12">
                <i class="material-icons prefix">person_outline</i>
                <input id="register-username" type="text" required>
                <label for="register-username">Username</label>
            </div>
                    <div class="input-field col s12">
                    
                    <i class="material-icons prefix">mail_outline</i>
                        <input id="register-email" type="email" required>
                        <label for="register-email">Email</label>
                    </div>
                    <div class="input-field col s12">
                    <i class="material-icons prefix">lock_outline</i>
                        <input id="register-password" type="password" min="8" required>
                        <label for="register-password">Password</label>
                        <span class="helper-text" data-error="wrong" data-success="right">Minimum: 8 length.</span>
                    </div>
                    <div class="input-field col s12">
                    <i class="material-icons prefix">lock_outline</i>
                        <input id="register-password-confirm" type="password" min="8" required>
                        <label for="register-password-confirm">Password (Confirm)</label>
                        <span class="helper-text" data-error="wrong" data-success="right">Minimum: 8 length.</span>
                    </div>
                    <div><button type="submit" class="waves-effect waves-light btn red register"><i class="material-icons right">send</i>Register</button></div>
                </form>
            </div>
        </div>
        <div id="error"></div>
        </div>
    `;
}