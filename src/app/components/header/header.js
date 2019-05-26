import {
  getSkeleton
} from "./header-ui";

export class Header {
  constructor(root, router, user) {
    this.root = root;
    this.router = router;
    this.defaultPhoto = `https://avatars.dicebear.com/v2/male/${user.uid}.svg` // male, female, identicon, gridy, avataaars or jdenticon
    this.user = {
      name: user.displayName || user.email.split("@")[0] || user.uid.substring(0, 12),
      email: user.email || '',
      photo: user.photoURL || this.defaultPhoto
    }
    this.run();
  }

  run() {
    this.initUI();
    this.initEventsUI();
    M.AutoInit();
  }

  initUI() {
    this.root.innerHTML = getSkeleton(this.router, this.user)
  }

  initEventsUI() {

    [...this.root.querySelectorAll('ul')].map(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        console.log(e.target)
        if (e.target.nodeName === 'A') return this.router.navigate(e.target.href);
        if (e.target.nodeName === 'I' && e.target.parentNode.nodeName === 'A') return this.router.navigate(e.target.parentNode.href);
      })
    });

    [...this.root.querySelectorAll('.userPhoto')].map(el => {
      el.addEventListener('error', e => {
        el.src = this.defaultPhoto
      })
    });

  }

}