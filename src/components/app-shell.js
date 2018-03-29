import LoadingConnector from './loading-connector'
import StartRoom from './start-room'
const {bind} = HyperHTMLElement

class AppShell extends HyperHTMLElement {
    created() {
        this.className = 'dt vh-100 w-100 bg-near-white gradientSquare'
        bind(this)`<loading-connector></loading-connector>`

        // create Ipfs repo and node
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

        node.once('ready', () => node.id((err, data) => {
            if (err) throw err
            // make node accessible on app-shell
            window.ipfsNode = node

            // bind start-room element to app-shell
            bind(this)`<start-room></start-room>`


            // "logging"
            console.log(`IPFS node ready with address ${data.id}`)
        }))

        this.render()
    }

    render() {return this}
}

AppShell.define('app-shell')
