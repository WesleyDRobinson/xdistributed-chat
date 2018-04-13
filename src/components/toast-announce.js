class ToastAnnounce extends HyperHTMLElement {
    static get observedAttributes() {
        return ['timeout', 'entry', 'exit']
    }

    created() {
        this.timeout = this.timeout || 3300
        this.entry = this.entry || 'fadeInUp'
        this.exit = this.exit || 'fadeOutLeft'
        this.className = `db pa3 mt2 mw6 br1 bg-near-black white-70 hover-white tc lh-copy animated ${this.entry}`
        setTimeout(() => {
            this.classList.add(`${this.exit}`)
            setTimeout(() => this.remove(), 1000)
        }, this.timeout)
        this.render()
    }

    render() {
        return this.html`${this.textContent}`
    }
}

ToastAnnounce.define('toast-announce')
