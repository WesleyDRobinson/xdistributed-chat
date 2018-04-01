const {bind} = HyperHTMLElement

class LearnMore extends HyperHTMLElement {

    created() {
        this.className = 'db ph3'
        this.render()
    }

    render() {
        return this.html`
            <a class="pointer w4 pv2 ph3 br-pill b--light-blue bg-light-gray near-black tracked f7 tc animated pulse"
            onclick=${this}>learn more about DC</a>`
    }

    onclick() {
        const body = document.querySelector('body')
        const modal = document.createElement('learn-more-modal')
        body.appendChild(modal)
    }
}

LearnMore.define('learn-more')

class LearnMoreModal extends HyperHTMLElement {

    created() {
        this.className = "fixed z-999 left-0 top-0 w-100 vh-100 overflow-y-auto near-black bg-white-60 avenir animated fadeIn"
        this.render()
    }

    render() {
        return this.html`
            <div class="pointer dt fixed bottom-1 left-1 h3 w3 br-100 bg-black-90 tc" onclick=${this}><span class="dtc v-mid white-90 f4">X</span></div>
                <div class="pl5 center measure measure-wide-ns z-0 bg-washed-green">
                    <div class="pv2 pr3 lh-copy center measure measure-wide-ns bg-light-gray">
                    <h2 id="what-is-distributed-chat" class="pa2 dark-green bg-washed-green athelas tj ttu">What is it?</h2>
                        <ul class="f4">
                            <li>a simple, IPFS-based chat system</li>
                            <li>an anonymous way to communicate with a network</li>
                            <li>a type of digital chat that imitates conversations in the physical world</li>
                            <li>Information is broadcast only to those present in the room</li>
                            <li>messages only last as long as the receivers keep them in memory</li>
                            <li>an IPFS file uploader!</li>
                        </ul>
                        <p class="ml3 pa2 f7">* <a href="//ipfs.io" class="link dark-blue tracked f6"> IPFS</a> is a peer-to-peer, hypermedia protocol; it is an alternative to HTTP and aims to replace it.</p>
                        
                        <div class="ml2">
                        <h3 class="athelas f4 dark-blue">Nodes and Peers</h3>
                            <p class="ml3 pa2 dark-blue bg-lightest-blue tj">
                            When a browser navigates to <a href="//distributed.now.sh" class="link orange">Distributed Chat</a>, it spawns a node on the IPFS network. <br><br>
                            Each time an IPFS node is created, a unique Id is assigned and used as a Peer ID. <br><br>
                            To communicate with others on the platform, enter a room name. <br><br> 
                            You'll join a room where messages may be broadcast. <br><br>
                            Peers already in the room will be notified that a new peer has joined. <br><br>
                            Exit a room, and peers will also be notified. <br><br>
                            Once you leave a room, all messages effectively vanish <br><br>
                            Leaving distributed chat will close the IPFS node. <br><br>
                            Refreshing the window will spawn a fresh IFPS node, with a new unique Peer Id. 
                            </p>
                        <h3 class="athelas f4 dark-red">File Uploads</h3>
                        <p class="ml3 pa2 dark-red bg-near-white">
                            When you upload a file, it is added to your IPFS node, and a link to an IPFS<>HTTP gateway is broadcast. <br><br> 
                            Be sure to save this link before navigating away from the chat or you won't be able to find it again! <br><br>
                            The file content will only persist as long as some node on the network hosts it. In this regard, it is similar to web torrents. <br><br>
                        </p>
                        
                        </div>
                    <h2 id="how-is-distributed-chat-different" class="pa2 dark-green bg-washed-green athelas ttu">How is this different from SMS or email or Slack?</h2>
                        <ul class="list pl0">
                        <li class="mb2">🌐<span class="i f4">Distributed</span>: once an <a href="https://ipfs.io">InterPlanetary File System (IPFS)</a> node is running in the browser, it will connect directly to other nodes—so no central points of failure exist</li>
                        <li class="mb2">💯<span class="i f4">Transparent</span>: the static site is 100% open sourced—simply add <code>/_src</code> to the end of any url to see the code</li>
                        <li class="mb2">🙅<span class="i f4">P2P/ Truly Serverless</span>: send messages directly to your peers; there are <span class="b">no central servers</span></li>
                        <li class="mb2">⏳<span class="i f4">Realtime only</span>: messages are broadcast <span class="b">only once</span> to the currently connected peers; new peers entering the room will not &quot;catch up&quot;</li>
                        <li class="mb2">🌫<span class="i f4">Ephemeral</span>: while IPFS object names are permanent, your &quot;permalinks&quot; will only persists as long as some node requests it, for more info, see <a href="https://discuss.ipfs.io/t/replication-on-ipfs-or-the-backing-up-content-model/372">Replication on IPFS</a> and <a href="https://discuss.ipfs.io/t/how-permanent-is-data-stored-on-ipfs/354">Permanence != Persistance</a></li>
                        <li class="mb2">🎭<span class="i f4">Anonymous + 🔒 Private</span>: only information you choose to share is available to others on the network</li>
                        <li class="mb2">🆗<span class="i f4">Available</span>: runs in any browser; securely hosted: <a href="https://distributed.now.sh">https://distributed.now.sh</a> &amp; <a href="https://dc.now.sh">https://dc.now.sh</a></li>
                        </ul>
                        
                    <h2 id="why-do-i-want-distributed-chat" class="mb0 pa2 dark-green bg-washed-green athelas tj ttu">Why do I want this?</h2>
                        <div class="pa2 bg-near-white">                
                            <p>You might not! It's a brittle means of communication. But it is a unique tool as far as I can tell.</p>
                            <p>It is a free-to-use and powerful browser-based, zero-surveillance communication tool.</p> 
                            <p>you never know when you need to reliably and securely chat or share resources with your network.</p>
                        </div>
                    <h2 id="how-much-does-distributed-chat-cost-price" class="mb0 pa2 dark-green bg-washed-green athelas tj ttu">How much does it cost?</h2>
                         <p class="ml3 pa2 dark-red bg-washed-red">
                         Distributed Chat will always be free and the <a href="//distributed.now.sh/_src">source code</a> will always be available.</p>
            
                             <div class="flex flex-wrap justify-around lh-copy mb3 pa2 white-80 bg-dark-gray">
                                <p>If you'd like to offer a gift to the creators and maintainers, use one of the following wallets</p>
                                <span class="nowrap">BTC: <span class="f7 f6-ns white-60">13GJTQKn2cZ4y2bhQoaJ39VYqSbp74WKwS</span></span>
                                <span class="nowrap">ETH: <span
                                        class="f7 f6-ns white-60">0x86a8c0f28555e56FADDF55B7b0567B729Dfc4d9a</span></span>
                                <span class="nowrap">BAT: <span
                                        class="f7 f6-ns white-60">0x9Cb796205f26a0B0Ea0ede9BFd55F96cF6639392</span></span>
                                <span class="nowrap">USD: <span class="f7 f6-ns white-60"><a href="https://www.paypal.me/4wesley/20"
                                                                                             class="link b tracked green">Paypal</a></span></span>
                            </div>
            </div>
            </div>`
    }

    onclick() {
        this.classList.add('fadeOut')
        setTimeout(() => this.remove(), 1000)
    }
}

LearnMoreModal.define('learn-more-modal')
