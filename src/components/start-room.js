import IpfsRoom from './ipfs-room'
import LearnMore from './learn-more'

const {bind} = HyperHTMLElement

class StartRoom extends HyperHTMLElement {
    created() {
        this.className = 'tc pa2 avenir animated fadeIn near-black'
        this.render()
    }

    onsubmit(e) {
        e.preventDefault()
        const name = document.getElementById('room-name').value

        const appShell = document.querySelector('app-shell')
        setTimeout(() => {
            bind(appShell)`<ipfs-room name="${name}"></ipfs-room>`
        }, 1000)
        this.classList.add('zoomOut')
    }

    render() {
        return this.html`
            <h1 class="f2 fw2 tc dark-gray courier">welcome to <span class="f3 fw7 ttu avenir tracked">d</span>istributed <span class="f3 fw7 ttu avenir tracked">c</span>hat</h1>
            <h4 class="mt2 mb0">check out a featured room</h4>            
            <div id="featured-rooms" class="flex justify-center items-center ma2" data-call=featuredRoom onclick=${this}> 
                <p class="pointer dim pv2 ph3 ma2 br-pill ba bw1 b--blue bg-light-yellow">Privacy Advocates</p> 
                <p class="pointer dim pv2 ph3 ma2 br-pill ba bw1 b--blue bg-light-yellow">Coffee Enthusiasts ☕</p> 
                <p class="pointer dim pv2 ph3 ma2 br-pill ba bw1 b--blue bg-light-yellow">web developers</p>
            </div>      
            
            <form class="flex flex-column justify-center mb3 items-center mw6 center" onsubmit="${this}">
                <label id="room-desc" for="room-name" class="mb3 fw5">or start your own room</label>
                <input id="room-name" class="input-reset w-80 pt2 mb3 bg-transparent ba b--light-purple bt-0 bl-0 br-0 bg-animate hover-bg-lightest-blue tc outline-transparent"
                       type="text" aria-describedby="room-desc" placeholder="room name" autofocus>
                <div class="w-100 flex justify-center">
                    <input class="w4 pv2 mh2 br-pill bn bg-purple pointer dim ttu tracked near-white"
                            type="submit" value="go">
                    <learn-more></learn-more>
                </div>
            </form>`
    }

    featuredRoom(e) {
        let target = e.target
        if (target.nodeName !== 'P') return e

        const appShell = document.querySelector('app-shell')
        setTimeout(() => {
            bind(appShell)`<ipfs-room name="${e.target.innerHTML}"></ipfs-room>`
        }, 1000)

        this.classList.add('zoomOut')
    }
}

StartRoom.define('start-room')
