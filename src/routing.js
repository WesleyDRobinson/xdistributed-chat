import LoadingConnector from './components/loading-connector'
import StartRoom from './components/welcome/start-room'
import IpfsRoom from './components/ipfs-room'

const { bind } = HyperHTMLElement
const oneSecondTimeout = (cb) => window.setTimeout(cb, 1000)
const appShell = document.getElementById('app-shell')

page('*', ipfsNodeCheck)
page('/', main)
page('/room', joinRoom)
page('/room/:name', joinRoom)
page('/user', '/')
page('*', '/')
page()

function ipfsNodeCheck(ctx, next) {
  if (window.ipfsNode) {
    next()
  } else {
    // show loader
    bind(appShell)`<loading-connector></loading-connector>`

    // create Ipfs repo and node
    const repoId = () => `node/distributed-chat/${Math.random()}`
    const node = new Ipfs({
      repo: repoId(),
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          Swarm: [
            // todo -- build own handshake servers
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
            '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
          ]
        }
      }
    })

    node.once('ready', () => node.id((err, data) => {
      if (err) throw err
      // make node accessible to window and note in ctx.state object
      window.ipfsNode = node
      ctx.state.ipfsNode = true

      // "logging"
      console.log(`IPFS node ready with address ${data.id}`)

      next()
    }))
  }
}

function joinRoom(ctx) {
  ctx.state.room = ctx.params.name || 'cat videos'
  appShell.firstElementChild.classList.add('fadeOut')
  oneSecondTimeout(() => bind(appShell)`<ipfs-room name="${ctx.state.room}"></ipfs-room>`)
}

function main(ctx, next) {
  // fadeout main contents
  appShell.firstElementChild.classList.add('fadeOut')
  // bind start-room element to app-shell
  oneSecondTimeout(bind(appShell)`<start-room></start-room>`)
}
