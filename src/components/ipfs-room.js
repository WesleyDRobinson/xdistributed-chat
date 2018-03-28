const Room = require('ipfs-pubsub-room')
const toBuffer = require('blob-to-buffer')
import ToastAnnounce from './toast-announce'

class IpfsRoom extends HyperHTMLElement {
    static get observedAttributes() {
        return ['name']
    }

    get defaultState() {
        return {peers: 0}
    }

    created() {
        // generates a new Room
        this.name = this.name || 'default-room-name'
        let room = Room(window.ipfsNode, this.name)

        // add room functionality
        // announces when a new peer joins the room
        room.on('peer joined', (peer) => {
            this.setState({peers: this.state.peers + 1})
            this.serveToast(`peer joined: ${peer}`)
        })

        // announces when a peer leaves the room
        room.on('peer left', (peer) => {
            this.setState({peers: this.state.peers - 1})
            this.serveToast(`peer left: ${peer}`)
        })

        // build the message and add to messages output
        room.on('message', (message) => {
            // message.data is a buffer
            let msgDiv = hyperHTML.wire(message)`
                <div class="flex flex-wrap justify-between items-baseline near-black bg-transparent lh-copy slideInUp animated">
                    <div class="ph2 pt1 measure measure-wide-ns bg-animate hover-bg-near-white overflow-x-auto" data-call=copyText onclick=${this}>${message.data.toString()}</div>
                    <div class="dn db-ns mt1 ml3 mr1 ba b--purple b--dotted bl-0 bt-0 br-0 flex-grow-1 flex-shrink-1 f7"></div>
                    <div class="pl2 pa0-ns f7 black-60">from: ${message.from}</div>
                </div>`

            let output = document.getElementById('output')
            output.classList.add('bl', 'bw1', 'b--light-blue')
            output.appendChild(msgDiv)
        })

        this.room = room
        this.className = 'db h-100 flex flex-column justify-between animated slideInLeft'
        this.render()
    }

    render() {
        this.html`
            <div id="room-heading" class="o-80 flex justify-between items-center w-100 cf pa2 gradientGY avenir">
                <div class="pointer grow ph2 pv2 br-pill ba b--purple bg-purple near-white tracked tc ttu f7" 
                        data-call="showPeers" onclick="${this}">${this.state.peers} peers</div>
                <h1 class="mv0 mr2 pv2 lh-title f3 f2-ns fw2 tj near-white">${this.name}</h1> 
                <div class="pointer grow  ph2 pv2 br-pill ba b--blue bg-blue near-white tracked tc ttu f7" 
                        data-call="showId" onclick="${this}">my id</div>
            </div>
            
            <div id="messaging" class="flex flex-column justify-end pa2">
                <div id="output" class="mw8 mb1"></div>
                <form id="send-message" class="mw9 flex justify-around items-baseline ba b--gold bl-0 bt-0 br-0" data-call="sendIt" onsubmit="${this}">
                        <label for="message-entry" id="message-desc" class="clip">broadcast a message to the room</label>
                        <input id="message-entry" class="input-reset pl2 flex-grow-1 ba b--gold bl-0 bt-0 br-0 bg-transparent outline-transparent lh-copy"
                               type="textarea" aria-describedby="message-desc" autocomplete="off" autofocus style="caret-color:#ffb700">
                        
                        <label id="file-attachment-desc" class="clip">share a file with the room</label>
                        <label for="file-attachment" class="pointer ph3 pv2 mr1 br2 br--top ba b--gold bg-gold f5 lh-copy">📎</label>
                        <input id="file-attachment" type="file" class="clip" accept="image/*" aria-describedby="file-attachment-desc">
                        
                        <label for="message-submit" class="clip">submit the message and file</label>
                        <input id="message-submit" class="pointer ph3 pv2 br2 br--top ba b--gold bg-gold purple f5 fw9 lh-copy"
                               type="submit" value="➤">
                </form>
            </div>`
    }

    copyText(e) {
        copyTextToClipboard(e.target.textContent)
        this.serveToast('copied to clipboard')
    }

    // triggered by... data-call="sendIt" onclick="${this}"
    sendIt(e) {
        e.preventDefault()
        let form = e.target // [0] == 'message-entry', [1] == 'file-attachment', [2] == ''
        form[2].blur()
        let msg = form[0].value
        let fileList = form[1].files
        let file = fileList[0]
        if (file && file.type.startsWith('image/')) {
            msg += 'file uploaded, permalink: '
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
        this.serveToast(`connected peers: ${peers.join(', ')}`)
    }

    showId() {
        window.ipfsNode.id().then(data => {
            this.serveToast(`my peerId: ${data.id}`)
        })
    }

    serveToast(msg) {
        const toast = hyperHTML.wire()`<toast-announce entry="fadeInDown" exit="fadeOutUp">${msg}</toast-announce>`

        let toastContainer = document.getElementById('toast-container')
        if (!toastContainer) {
            toastContainer = document.createElement('div')
            toastContainer.id = 'toast-container'
            toastContainer.className = `fixed top-1 right-1`
            document.body.appendChild(toastContainer)
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
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!')
    }, function(err) {
        console.error('Async: Could not copy text: ', err)
    })
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
