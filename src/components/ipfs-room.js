const Room = require('ipfs-pubsub-room')
const toBuffer = require('blob-to-buffer')
import StartRoom from './start-room'
import ToastAnnounce from './toast-announce'

const {bind, wire} = HyperHTMLElement

class IpfsRoom extends HyperHTMLElement {
    static get observedAttributes() {
        return ['name']
    }

    get defaultState() {
        return {peerCount: 0}
    }

    created() {
        this.className = 'db h-100 flex flex-column justify-between animated zoomIn'

        // generate a new Room
        this.name = this.name || 'cat videos plz'
        let room = Room(window.ipfsNode, this.name)
        this.room = room

        // add functionality to the room
        // announces when a new peer joins the room
        room.on('peer joined', (peer) => {
            this.setState({peerCount: this.state.peerCount + 1})
            this.serveToast(`${peer.slice(41)} joined the room`)
        })

        // announces when a peer leaves the room
        room.on('peer left', (peer) => {
            this.setState({peerCount: this.state.peerCount - 1})
            this.serveToast(`${peer.slice(41)} left the room`)
        })

        // build the message and add to messages output
        room.on('message', (message) => {
            // message.data is a buffer
            let msgDiv = wire(message)`
                <div class="flex flex-wrap justify-between items-baseline near-black bg-transparent lh-copy slideInUp animated">
                    <div class="ph2 pt1 measure measure-wide-ns bg-animate hover-bg-near-white overflow-x-auto f4" data-call=copyText onclick=${this}>${message.data.toString()}</div>
                    <div class="dn db-ns mt1 ml2 mr1 ba b--purple b--dotted bl-0 bt-0 br-0 flex-grow-1 flex-shrink-1 f7"></div>
                    <div class="ph2 pa2-ns f7 black-60">from: ${message.from.slice(41)},</div>
                    <div class="pv1 ph2-ns f6 black-60">${new Date().toTimeString()}</div>
                </div>`

            let output = document.getElementById('output')
            output.classList.add('bl', 'bw1', 'b--light-blue')
            output.appendChild(msgDiv)
            output.scrollTop = output.scrollHeight
        })

        this.render()
    }

    render() {
        this.html`
            <article id="room-heading" class="animated zoomInUp">
                <div class="flex justify-around items-center w-100 cf pa2 gradientGO avenir">
                    <div class="pointer grow ph2 pv2 br-pill ba b--purple bg-purple near-white tracked tc ttu f7" 
                            data-call="showPeers" onclick="${this}">${this.state.peerCount} peers</div>
                    <div class="flex justify-center items-center ph3">
                        <h1 class="mv0 mr2 pa2 br1 lh-title f4 f3-ns fw2 near-white bg-black-60">${this.name}</h1> 
                        <div class="pointer pv2 ph3 br-pill ba b--light-yellow bg-light-yellow gray tracked tc ttu f7"
                            data-call=exit onclick=${this}>exit</div>        
                    </div>
                    <div class="pointer grow  ph2 pv2 br-pill ba b--blue bg-blue near-white tracked tc ttu f7" 
                            data-call="showId" onclick="${this}">my id</div>
                </div>   
            </article>
            
            <article id="messaging" class="flex flex-column justify-end pa3 overflow-y-hidden animated zoomInDown">
                <div id="output" class="mw8 mb1 overflow-y-scroll"></div>
                
                <form id="send-message" data-call="sendIt" onsubmit="${this}">
                        <div class="mw9 flex justify-around items-baseline ba b--gold bl-0 bt-0 br-0">
                            <label for="message-entry" id="message-desc" class="clip">broadcast a message to the room</label>
                            <input id="message-entry" class="input-reset f4 pl2 flex-grow-1 ba b--gold bl-0 bt-0 br-0 bg-transparent outline-transparent lh-copy o-80"
                                   type="textarea" aria-describedby="message-desc" autocomplete="off" autofocus style="caret-color:#ffb700">
                            
                            <label id="file-attachment-desc" class="clip">share an image with the room</label>
                            <label for="file-attachment" class="pointer ph3 pv2 mr1 br2 br--top ba b--gold bg-gold f5 lh-copy">📷</label>
                            <input id="file-attachment" type="file" class="clip" accept="image/*" aria-describedby="file-attachment-desc">
                            
                            <label for="message-submit" class="clip">submit the message and file</label>
                            <input id="message-submit" class="pointer ph3 pv2 br2 br--top ba b--gold bg-gold purple f5 fw9 lh-copy"
                                   type="submit" value="➤">
                        </div>
                </form>
            </article>`
    }

    copyText(e) {
        copyTextToClipboard(e.target.textContent)
        this.serveToast('copied to clipboard')
    }

    exit() {
        this.room.leave()
        this.classList.add('zoomOut')
        setTimeout(() => {
            const appShell = document.querySelector('app-shell')
            appShell.innerHTML = ''
            bind(appShell)`<start-room></start-room>`
        }, 1000)
    }

    // triggered by... data-call="sendIt" onclick="${this}"
    sendIt(e) {
        e.preventDefault()
        let form = e.target // [0] == 'message-entry', [1] == 'file-attachment', [2] == 'message-submit'
        form[2].blur()
        let msg = form[0].value
        let fileList = form[1].files
        let file = fileList[0]

        if (file && file.type.startsWith('image/')) {
            msg += 'tap or click the link to copy'
            toBuffer(file, (err, buffer) => {
                if (err) return console.error(err)
                const files = [
                    {
                        path: `/files/${file.name}`,
                        content: buffer
                    }
                ]
                window.ipfsNode.files.add(files, (err, res) => {
                    if (err) return console.error(err)
                    const url = new URL(`https://ipfs.io/ipfs/${res[0].hash}/${file.name}`).href
                    this.room.broadcast(url)
                })
            })
        }

        this.room.broadcast(`${msg}`)
        form.reset()
    }

    showPeers() {
        let peers = this.room.getPeers()
        let msg = peers.length === 0 ? `you are alone in this room` : `peers in the room: ${peers.map(peer => peer.slice(41)).join(', ')}`
        this.serveToast(msg)
    }

    showId() {
        window.ipfsNode.id().then(data => {
            this.serveToast(`your peer id is ${data.id.slice(41)}`)
        })
    }

    serveToast(msg) {
        const toast = wire()`<toast-announce entry="fadeInDown" exit="fadeOutRight">${msg}</toast-announce>`

        let toastContainer = document.getElementById('toast-container')
        if (!toastContainer) {
            toastContainer = document.createElement('article')
            toastContainer.id = 'toast-container'
            toastContainer.className = `z-0 mt5 pa2 fixed top-2 right-1`
            this.appendChild(toastContainer)
        }
        toastContainer.appendChild(toast)
    }
}

IpfsRoom.define('ipfs-room')

// todo -- split into module
function copyTextToClipboard(text) {
    // for today
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text)
        return
    }

    // for the future!
    navigator.clipboard.writeText(text)
        .then(() => console.log('Async: Copying to clipboard was successful!'))
        .catch(err => console.error('Async: Could not copy text: ', err))
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea")
    textArea.classList.add('clip')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
        const successful = document.execCommand('copy')
        const msg = successful ? 'successful' : 'unsuccessful'
        console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
}
