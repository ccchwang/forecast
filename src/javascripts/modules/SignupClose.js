export default class SignupClose {
    constructor(el) {
      this.el = el;
      this.closeBtn = document.getElementById("mailchimp-close");

      this.closeBtn.addEventListener('click', event => {
        this.el.remove();
      })
    }
  }
  