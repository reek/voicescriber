export const getSkeleton = () => {
    return `
        <div class="container">
            <div class="center row section">
                <i class="material-icons large red-text">graphic_eq</i>
                <h1 class="black-text"><app-brand>Voicescriber</app-brand></h1>
                <p class="light center">We have provided detailed documentation as well as specific code examples to help new
                    users get started.</p>
            </div>
            <div class="row center">
                <h2>Share</h2>
                <div id="records"></div>
                <p>Scan this QR code with your mobile phone to get redirected to this page</p>
                <div id="qrcode"></div>
            </div>
        </div>
`;
}