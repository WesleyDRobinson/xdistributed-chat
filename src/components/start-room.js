import IpfsRoom from './ipfs-room'

class StartRoom extends HyperHTMLElement {
    created() {
        this.className = 'dtc v-mid measure pa2 black-80 avenir fadeIn animated'
        this.render()
    }

    onsubmit(e) {
        e.preventDefault()
        const name = document.getElementById('room-name').value

        const appShell = document.querySelector('app-shell')
        setTimeout(() => {
            hyperHTML.bind(appShell)`<ipfs-room name="${name}"></ipfs-room>`
        }, 1000)
        this.classList.add('slideOutLeft')
    }

    render() {
        return this.html`
            <!-- include the custom element by name or use via document.createElement('react-component')-->
            <react-component name="Joe"></react-component>
            <react-second name="Sriram"></react-second>
            <react-component class="fixed bottom-1"></react-component>
            <h1 class="f2 fw2 tc near-white courier">welcome to <span class="f3 fw7 near-black ttu avenir tracked">d</span>istributed <span class="f3 fw7 near-black ttu avenir tracked">c</span>hat</h1>
            
            <form class="flex flex-column justify-center items-center mw6 center" onsubmit="${this}">
                <label id="room-desc" for="room-name" class="mb3 near-black fw5">create or join a room</label>
                <input id="room-name" class="input-reset w-80 pt2 mb3 bg-transparent ba b--light-purple bt-0 bl-0 br-0 bg-animate hover-bg-lightest-blue tc outline-transparent"
                       type="text" aria-describedby="room-desc" placeholder="room name" autofocus>
                <input class="button-reset w4 ph4 pv2 br-pill bn bg-purple pointer o-80 glow ttu tracked near-white"
                        type="submit" value="go">
            </form>
            <div class="mw5 center mt3 pv2 ph3 orange bg-animate bg-light-blue hover-bg-orange hover-light-blue tc" onclick="${this}">Thinking in React</div>`
    }
    onclick() {
        this.appendChild(hyperHTML.wire()`<thinking-react></thinking-react>`)
    }
}

StartRoom.define('start-room')