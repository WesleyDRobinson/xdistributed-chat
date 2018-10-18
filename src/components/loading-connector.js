class LoadingConnector extends HyperHTMLElement {
    created() {
        this.className = `h-100 flex flex-column justify-center`
        setInterval(() => {
            this.firstElementChild.classList.toggle('fadeIn')
            this.firstElementChild.classList.toggle('fadeOut')
        }, 1200)

        this.render()
    }

    render() {
        return this.html`
            <div class="pa3 tc athelas tracked near-black bg-white-60 fw3 f2 animated fadeIn">
              CREATING IPFS NODE AND CONNECTING TO THE NETWORK
            </div>`
    }
}

LoadingConnector.define('loading-connector')
