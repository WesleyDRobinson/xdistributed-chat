// const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')
const repo = () => `node/presence-poc/${Math.random()}`
const node = new Ipfs({
    repo: repo(),
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
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
}))

const startRoom = (name) => {
    const room = Room(node, name)

    room.on('peer joined', (peer) => {
        serveToast(peer, 'joined')
        document.getElementById('send-it').disabled = false
        document.getElementById('message-desc').textContent = 'Publish your message to connected peers'
    })
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

    document.getElementById('room-heading').textContent = name
    let roomElement = document.getElementById('room')
    roomElement.classList.remove('dn')

    const form = document.getElementById('send-message')
    form.onsubmit = (e) => {
        e.preventDefault()

        // broadcast the input of the form to all peers in the room
        room.broadcast(form[0].value)
        form.reset()
        return false
    }
}

const roomForm = document.getElementById('start-room')
roomForm.onsubmit = (e) => {
    e.preventDefault()
    roomForm[1].disabled = true
    let name = roomForm[0].value || 'default room name'
    startRoom(name)
    roomForm.reset()
    return false
}