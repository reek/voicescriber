export const getSkeleton = (router = {}) => {
    return `
        <div class="fixed-action-btn direction-top" style="bottom: 45px; right: 24px;">
            <a class="btn-floating btn-large red">
                <i class="material-icons">more_vert</i>
            </a>
            <ul>
            ${router.getHeader().map(item => {
                return ` <li>
                <a href="${item.path}" class="btn-floating teal" style="opacity: 0; transform: scale(0.4) translateY(40px) translateX(0px);">
                    <i class="material-icons">${item.icon}</i>
                </a>
                </li>`;
            }).join('')}
            </ul>
        </div>

        <footer class="page-footer black">
            <div class="container">
                <div class="row">
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Mirrors</h5>
                        <ul>
                        ${router.getFooter().map(item => {
                            return `<li><a class="grey-text text-lighten-3" href="${item.path}">${item.text}</a></li>`;
                        }).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    © ${new Date().getFullYear()} Copyright Ricardo Reves
                </div>
            </div>
        </footer>
    `;
}