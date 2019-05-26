import {
  getSkeleton
} from "./footer-ui";


export class Footer {
  constructor(root, router, dependencies) {
    this.root = root;
    this.router = router;
    this.dependencies = dependencies
    this.run();
  }

  run() {
    this.initUI();
    this.initEventsUI();
    M.AutoInit();
  }

  initUI() {
    this.root.innerHTML = getSkeleton(this.router)
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

  }
}