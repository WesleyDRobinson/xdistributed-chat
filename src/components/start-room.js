import IpfsRoom from './ipfs-room'

class StartRoom extends HyperHTMLElement {
    created() {
        this.className = 'db measure pa2 black-80'
        this.render()
    }

    onclick(e) {
        e.target.disabled = true
        const name = document.getElementById('room-name').value

        const appShell = document.querySelector('app-shell')
        const room = hyperHTML.bind(appShell)`<ipfs-room name="${name}"></ipfs-room>`
    }

    render() {
        return this.html`
            <label for="room-name" class="f6 b db mb2">Room Name</label>
            <input id="room-name" class="input-reset w-80 pa2 mb2 mr0 ba b--black-20"
                   type="text" aria-describedby="room-desc" placeholder="enter a room name">
            <button class="button-reset w-20 ph3 pv2 ml0 br0 bw0 bg-green pointer dim"
                    onclick="${this}">
                START
            </button>
            <small id="room-desc" class="f6 black-60 mb2">a room to connect to peers</small>`
    }
}

StartRoom.define('start-room')