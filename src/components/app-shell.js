import StartRoom from './start-room'

class AppShell extends HyperHTMLElement {
    created() {

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
            hyperHTML.bind(this)`<start-room></start-room>`

            // "logging"
            console.log(`IPFS node ready with address ${data.id}`)
        }))

        this.className = 'db vh-100 bg-near-white'
        this.render()
    }

    render() {return this}
}

AppShell.define('app-shell')