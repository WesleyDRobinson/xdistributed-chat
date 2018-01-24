const Room = require('ipfs-pubsub-room')
import ToastAnnounce from './toast-announce'

function serveToast(msg) {
    const toast = hyperHTML.wire()`<toast-announce>${msg}</toast-announce>`
    document.getElementById('toast-container').appendChild(toast)
}

class IpfsRoom extends HyperHTMLElement {
    static get observedAttributes() {
        return ['name']
    }

    created() {
        this.name = this.name || 'default-room-name'

        // create Room
        let room = Room(window.ipfsNode, this.name)

        // add room functionality
        // announces when a new peer joins the room
        room.on('peer joined', (peer) => {
            serveToast(`peer joined: ${peer}`)
            document.forms['send-message'][1].disabled = false
            document.getElementById('message-desc').textContent = 'Publish your message to connected peers'
        })

        // announces when a peer leaves the room
        room.on('peer left', (peer) => serveToast(`peer left: ${peer}`))

        // build the message and add to messages output
        room.on('message', (message) => {
            // message.data is a buffer
            let string = message.data.toString()
            let msg = hyperHTML.wire()`
                <p class="pa2 mt0 mb2 bg-near-white near-black lh-copy">
                    ${string} 
                    <small class="db">from: ${message.from}</small>
                </p>`

            let output = document.getElementById('output')
            output.classList.add('bl', 'bw2', 'b--light-blue')
            output.appendChild(msg)
        })

        this.room = room
        this.className = 'db pa2'
        this.render()
    }

    render() {
        this.html`
            <div class="flex items-center avenir">
                <h1 id="room-heading" class="mr4 lh-title">${this.name}</h1>
                <div class="pointer mw4 pv2 ph3 br2 bg-light-blue black-70 tc ttu f7" 
                    data-call="showPeers" onclick="${this}">show peers</div>
            </div>
            <div class="flex justify-start flex-wrap">
                <div class="w-100 mw6">
                    <form disabled id="send-message" data-call="sendIt" onsubmit="${this}">
                        <div class="measure">
                            <label for="message-entry" class="f6 b db mb2 black-80">new message</label>
                            <input id="message-entry" class="input-reset ba b--black-20 pa2 mb2 db w-100"
                                   type="text" aria-describedby="message-desc">
                            <button id="send-it" disabled class="button-reset f4 fw9 pointer dim ph3 pv2 mr2 br0 bw0 w-20 bg-green">
                                ➤
                            </button>
                            <small id="message-desc" class="f6 black-60 mb2">waiting for peers to join the room</small>
                        </div>
                    </form>
                </div>
    
                <div class="w-100 mw7-l ml2">
                    <h1 class="pa2 f5 tc ttu tracked lh-title near-white bg-dark-blue">Messages</h1>
                    <div id="output" class="pa2 measure"></div>
                </div>
            </div>`
    }

    // triggered by... data-call="functionName" onclick="${this}"
    sendIt(e) {
        e.preventDefault()
        let form = e.target
        form[1].blur()
        let msg = form[0].value
        this.room.broadcast(`${msg}`)
        form.reset()
    }

    showPeers() {
        let peers = this.room.getPeers()
        serveToast(`connected peers: ${peers.join(', ')}`)
    }
}

IpfsRoom.define('ipfs-room')
