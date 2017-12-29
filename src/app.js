const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')
const repo = () => `node/presence-poc/${Math.random()}`
const node = new IPFS({
    repo: repo(),
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Addresses: {
            Swarm: [
                '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
            ]
        }
    }
})

// announces when a new peer joins
const serveToast = (peerId, action) => {
    const toast = document.createElement('div')
    toast.className = 'fixed bottom-1 left-1 pa3 br3 bg-near-black white-70 hover-white tc'
    toast.innerText = `peer ${action} 
    ${peerId}`

    document.body.appendChild(toast)
    setTimeout(() => document.body.removeChild(toast), 3300)
}

node.once('ready', () => node.id((err, data) => {
    if (err) throw err

    console.log(`IPFS node ready with address ${data.id}`)

    const room = Room(node, 'presence-poc')

    room.on('peer joined', (peer) => serveToast(peer, 'joined'))
    room.on('peer left', (peer) => serveToast(peer, 'left'))

    room.on('message', (message) => {

        // build the message and add to messages output
        let msg = document.createElement('p')
        msg.className = 'pa2 bg-near-white near-black'
        msg.innerText = `${message.data} 
        from: ${message.from}`

        let output = document.getElementById('output')
        output.appendChild(msg)
    })

    const form = document.querySelector('form')
    form.onsubmit = (e) => {
        e.preventDefault()

        // broadcast the input of the form to all peers in the room
        room.broadcast(form[0].value)
        form.reset()
        return false
    }
}))
