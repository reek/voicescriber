export const getSkeleton = (router, user) => {
    return `
        <nav>
            <div class="nav-wrapper red">
                <a href="#!" class="brand-logo right">
                    <app-brand>Voicescriber</app-brand>
                </a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger left"><i class="material-icons">graphic_eq</i></a>
                <ul class="left hide-on-med-and-down">
                    <li><a><div class="chip transparent white-text">${user.name}<img src="${user.photo}" class="userPhoto"></div></a></li>
                        ${router.getHeader().map(item => {
                            return ` <li><a href="${item.path}"><i class="material-icons left">${item.icon}</i>${item.text}</a></li>`;
                        }).join('')}
                </ul>
            </div>
        </nav>

        <ul class="sidenav" id="mobile-demo">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img class="responsive-img" src="images/microphone.jpg">
                    </div>
                    <a href="#user"><img class="circle userPhoto" src="${user.photo}"></a>
                    <a href="#name"><span class="black-text name">${user.name}</span></a>
                    <a href="#email"><span class="grey-text email">${user.email}</span></a>
                </div>
            </li>
            ${router.getHeader().map(item => {
                return ` <li><a href="${item.path}"><i class="material-icons left">${item.icon}</i>${item.text}</a></li>`;
            }).join('')}
        </ul>
    `;
}