const {bind} = HyperHTMLElement

class LearnMore extends HyperHTMLElement {

    created() {
        this.className = 'db w4 mh2'
        this.render()
    }

    render() {
        return this.html`
            <div class="pointer glow pv2 br-pill ba b--purple bg-white-10"
            onclick=${this}>learn more</div>`
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
            
            <div class="pl4 pb5 center mw7 z-0 bg-washed-green">
                <div class="pb3 pr3 lh-copy center measure measure-wide-ns bg-light-gray">
                
                <h2 class="dib mv0 pa3 bg-washed-green f4 f3-ns lh-title dark-green">Thanks for taking the time to learn more!</h2>     
                <h2 id="how-do-i-use-distributed-chat" class="dib mb0 pa2 dark-green bg-washed-green athelas tj ttu lh-title">How do I use this?</h2>
                    <article class="pa2 lh-copy">                
                        <p>Enter the name of a room you want to join like "cat videos plz", and you'll enter that room. <br>
                        Anyone else who's entered that exact name will see you've joined.</p>
                        <p>You won't see any messages that were posted before you joined.</p>
                        <p>Start chatting! Type your message in the input near the bottom of the page. Trigger the > arrow button to broadcast to the room.</p>
                        <p>Upload files by selecting the paperclip button, choosing a file (or taking a picture/ video on mobile) and then triggering the > arrrow button.</p>
                    </article>               
                    
                <h2 id="what-is-distributed-chat" class="dib pa2 dark-green bg-washed-green athelas ttu lh-title">What is Distributed Chat?</h2>
                    <ul class="f4 lh-copy">
                        <li>a free-to-use communication tool</li> 
                        <li>a simple, IPFS-based chat system</li>
                        <li>an anonymous way to communicate on a distributed network</li>
                        <li>a type of digital chat that imitates conversations in the physical world</li>
                        <li>messages are broadcast only to peers present in the room</li>
                        <li>messages only last as long as the receivers keep them in memory</li>
                        <li>upload files to an IPFS node, running in the browser</li>
                    </ul>
                    <p class="ml3 pa2 f7">* <a href="//ipfs.io" class="link orange hover-blue tracked f6 lh-copy"> IPFS</a> is a peer-to-peer, hypermedia protocol; it is an alternative to HTTP and aims to replace it.</p>
                    
                    <article class="ml2 lh-copy">
                        <h3  id="nodes-and-peers" class="athelas f4 dark-blue lh-title">Nodes and Peers</h3>
                            <p class="ml3 pa2 dark-blue bg-lightest-blue tj">
                            When a browser navigates to <a href="//distributed.now.sh" class="link orange hover-blue">Distributed Chat</a>, it spawns a node on the IPFS network. <br><br>
                            Each time an IPFS node is created, a unique Id is assigned and used as a Peer ID. <br><br>
                            To communicate with others on the platform, enter a room name. <br><br> 
                            You'll join a room where messages may be broadcast. <br><br>
                            Peers already in the room will be notified that a new peer has joined. <br><br>
                            Exit a room, and peers will also be notified. <br><br>
                            Once you leave a room, all messages effectively vanish <br><br>
                            Leaving distributed chat will close the IPFS node. <br><br>
                            Refreshing the window will spawn a fresh IFPS node, with a new unique Peer Id. 
                            </p>
                        <h3 id="file-uploads" class="athelas f4 dark-red">File Uploads</h3>
                        <p class="ml3 pa2 dark-red">
                            When you upload a file, it is added to your IPFS node, and a link to an IPFS<>HTTP gateway is broadcast. <br><br> 
                            Be sure to save this link before navigating away from the chat or you won't be able to find it again! <br><br>
                            The file content will only persist as long as some node on the network hosts it. In this regard, it is similar to web torrents. <br><br>
                        </p>
                    
                    </article>
                <h2 id="how-is-distributed-chat-different" class="dib mv0 pa2 dark-green bg-washed-green athelas ttu">How is this different from SMS or email or Slack?</h2>
                    <article class="lh-copy">
                    
                    <p class="pa2">distributed chat complements these tools, but offers a unique experience.<br>
                        You have a private chat if you enter the same room as one other person.<br>
                        You have a group chat if more peers join the room.<br>
                        While you can't stop peers from joining your room, choosing a long or hard to guess name reduces the chance of others joining. <br>
                        Even if someone joins your room, they can't see what you've been chatting about—only what you say moving forward.
                        </p>
                    <ul class="list pl2">
                        <li class="mb2">🌐 <span class="i f4">Distributed</span>: once an <a class="link orange hover-blue courier bg-white" href="https://ipfs.io">InterPlanetary File System (IPFS)</a> node is running in the browser, it will connect directly to other nodes—so no central points of failure exist</li>
                        <li class="mb2">💯 <span class="i f4">Transparent</span>: the static site is 100% open sourced—simply add <code>/_src</code> to the end of any url to see the code</li>
                        <li class="mb2">🙅 <span class="i f4">P2P/ Truly Serverless</span>: send messages directly to your peers; there are <span class="b">no central servers</span></li>
                        <li class="mb2">⏳ <span class="i f4">Real-time only</span>: messages are broadcast <span class="b">only once</span> to the currently connected peers; new peers entering the room will not &quot;catch up," aka forward secrecy</li>
                        <li class="mb2">🌫 <span class="i f4">Ephemeral</span>: while IPFS object names are permanent (a hash based on the content), permalinks will only persist as long as some node requests it, for more info, see <a class="link orange hover-blue" href="https://discuss.ipfs.io/t/replication-on-ipfs-or-the-backing-up-content-model/372">Replication on IPFS</a> and <a class="link orange hover-blue" href="https://discuss.ipfs.io/t/how-permanent-is-data-stored-on-ipfs/354">Permanence != Persistance</a></li>
                        <li class="mb2">🎭 <span class="i f4">Anonymous + 🔒 Private</span>: only information you choose to share is available to others on the network</li>
                        <li class="mb2">🆗 <span class="i f4">Available</span>: runs in most browsers; decentralized and securely hosted: <a class="link orange hover-blue" href="https://distributed.now.sh">https://distributed.now.sh</a> &amp; <a class="link orange hover-blue" href="https://dc.now.sh">https://dc.now.sh</a></li>
                    </ul>
                    </article>
                    <p class="pa2">Be careful <br> This is an experiment. <br> 
                    Security and anonymity are difficult topics. You should carefully evaluate your risks and exposure with any software.
                    </p>

                <h2 id="why-do-i-want-distributed-chat" class="dib mb0 pa2 dark-green bg-washed-green athelas ttu lh-title">Why do I want this?</h2>
                    <article class="pa2 lh-copy">                
                        <p>You might not! It's a brittle means of communication. But it is a pretty cool tool.</p>
                        <p>It is a free-to-use and browser-based—Add to Homescreen for an app-like experience; and desktop distributions are in the pipeline.</p> 
                        <p>you never know when you need to reliably and securely chat or share resources with your network.</p>
                        <p>With Distributed Chat, you know how many peers are connected to a room and who sees the messages you send. You have some manner of undersight or inverse oversight or sousveillance.</p>
                    </article>
                    
                    <article class="ml2 pa2 lh-copy">
                        This chat tool transfers data differently from most communication systems, which are <span class="b tracked">centralized</span>.
                        
                        In a centralized system, servers receive messages, process data, and deliver messages & content to clients such as apps, web browsers, SMS/MMS, other servers, etc.<br><br>
                        
                        Distributed Chat is different; it is, as you guessed, <span class="b tracked">distributed</span>! <br><br>
                        
                        The client connects directly to other devices in a peer-to-peer fashion—there are no servers involved, no central points of failure or surveillance. <br>
                        The protocol that powers this transfer is called <a class="link orange hover-blue" href="https://ipfs.io">IPFS</a>.</article>
                        
                    <article class="pa4 mv0">
                        <blockquote class="ma0 pa3 bl br bw2 b--blue dark-blue">
                            <p class="cf f4 f3-ns lh-copy measure mv0 tc">
                                "If built right, [IPFS] could complement or replace HTTP. It could complement or replace even more. It sounds crazy. 
                                <a class="link orange hover-blue" href="https://github.com/ipfs/ipfs#overview">It is crazy.</a>"</p>
                            <cite class="fr f6 ttu tracked fs-normal">-Juan Benet</cite>
                        </blockquote>
                    </article>
                    
                    <article class="pl3">
                      <div class="aspect-ratio aspect-ratio--16x9 mb4">
                        <iframe class="aspect-ratio--object" width="560" height="315" src="https://www.youtube.com/embed/HUVmypx9HGI" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
                      </div>
                    </article>
                    
                <h2 id="how-much-does-distributed-chat-cost-price" class="dib mb0 pa2 dark-green bg-washed-green athelas ttu lh-title">How much does it cost?</h2>
                     <p class="ml3 pa2 dark-red bg-washed-red lh-copy"> 
                     Distributed Chat will always be free and the <a class="link blue hover-dark-gray" href="//distributed.now.sh/_src">source code</a> will remain open.</p>
        
                     <article class="flex flex-wrap justify-around lh-copy mb3 pa2 white-80 bg-dark-gray lh-copy">
                     
                        <p>If you'd like to offer a gift to the creators and maintainers, send currency to one of the following wallets:</p>
                        
                        <span class="nowrap">BTC: <span class="f7 f6-ns white-60">
                            33Q575HHLJ1VA2iSM3ezsswv6jvtymJc1s</span></span>
                        <span class="nowrap">ETH: <span class="f7 f6-ns white-60">
                            0xe59D6F05F574144C783ec5157f2B52C6EA03bcb3</span></span>
                        <span class="nowrap">BAT: <span class="f7 f6-ns white-60">
                            0x9Cb796205f26a0B0Ea0ede9BFd55F96cF6639392</span></span>
                    </article>
                <h2 id="what-tools-does-distributed-chat-use" class="dib mb0 pa2 dark-green bg-washed-green athelas ttu">How is this built?</h2>
                    <article class="pa2">
                    <a class="link orange hover-blue" href="https://github.com/WesleyDRobinson/distributed-chat">Source on Github</a><br>
                    <a class="link orange hover-blue" href="https://en.wikipedia.org/wiki/JavaScript">JavaScript</a><br>
                    <a class="link orange hover-blue" href="https://ipfs.io">IPFS</a>, of course <br>
                    
                    <a class="link orange hover-blue" href="https://medium.com/@WebReflection/hyperhtml-a-virtual-dom-alternative-279db455ee0e">hyperHTML</a> and 
                    <a class="link orange hover-blue" href="https://github.com/WebReflection/hyperHTML-Element">hyperHTMLElement</a> for building web components<br>

                    <a class="link orange hover-blue" href="https://tachyons.io">tachyons</a> and 
                    <a class="link orange hover-blue" href="https://daneden.github.io/animate.css/">animate</a> CSS systems
                    
                    <p>git version control, yarn package manager, Webpack module bundler, npm scripts, zeit's now, and the sweat of my brow</p>
                    </article>
                
                <h2 id="is-distributed-chat-finished-can-i-contribute" class="dib mb0 pa2 dark-green bg-washed-green athelas ttu">Is this finished?</h2>
                    <article class="pa2">
                        <p>While it's usable today, there are definitely enhancements in the works!</p> 
                        <p>And if you find any vulnerabilities or mistakes in the readme, please let us know!</p>
                        <p>My immediate goal is to have <a class="link orange hover-blue" href="https://github.com/ipfs/ipfs-service-worker">the IPFS node running in a service worker</a>. <br>
                        version 1.0 release milestones include the ability to continue chat while disconnected from internet, meaning the web app will be "offline first," reducing the bundle size, and the option to set usernames in a room. <br>
                        version 2.0 release milestones may include permanent users, live video chat, and more.
                        </p>
                        <p>Please check back periodically for updates.</p>
                        <p><a class="link orange hover-blue" href="https://wesley.now.sh">And get in touch</a> if you'd like to suggest features or contribute to the project.</p>
                    </article>

            </div>
            </div>`
    }

    onclick() {
        this.classList.add('fadeOut')
        setTimeout(() => this.remove(), 1000)
    }
}

LearnMoreModal.define('learn-more-modal')
