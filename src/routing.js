import * as page from 'page'

import AppShell from './components/app-shell'
import StartRoom from './components/start-room'
import IpfsRoom from './components/ipfs-room'

window.page = page

const {bind} = hyperHTML
const create = element => document.createElement(element)
const appShell = document.querySelector('app-shell')

page('*', ipfsNodeCheck)
page('/', start)
page('/room', joinRoom)
page('/room/:name', joinRoom)
page('/user/', user)
page()

function ipfsNodeCheck(ctx, next) {
    if (ctx.state.ipfsNode) {
        next()
    } else {
        // create Ipfs repo and node
        const repoId = () => `node/presence-poc/${Math.random()}`
        const node = new Ipfs({
            repo: repoId(),
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

        node.once('ready', () => node.id((err, data) => {
            if (err) throw err
            // make node accessible on ctx.state object
            ctx.state.ipfsNode = node

            // "logging"
            console.log(`IPFS node ready with address ${data.id}`)

            next()
        }))
    }
}


function user() {
}

function joinRoom(ctx) {
    ctx.state.room = ctx.params.name || 'default-room-name'
    bind(appShell)`<ipfs-room name="${ctx.state.room}"></ipfs-room>`
}

function start(ctx, next) {

    // create tracker and send initial pageview to Google Analytics
    window.ga = window.ga || function () {
        (ga.q = ga.q || []).push(arguments)
    }
    ga.l = +new Date
    // ga('create', 'UA-68515019-1', 'auto')
    ga('send', 'pageview')

    // bind start-room element to app-shell
    bind(appShell)`<start-room></start-room>`
}

// needed to enable correct forward/back button with bfcache browsers:
// https://developer.mozilla.org/en-US/Firefox/Releases/1.5/Using_Firefox_1.5_caching
window.onpageshow = event => {
    if (event.persisted) window.location.reload()
}