class ReactSecond extends HyperHTMLElement {
    // an external api
    static get observedAttributes() {
        return ['name']
    }

    // an internal state object
    // use this.setState() to manipulate
    get defaultState() {
        return {clicks: 0}
    }

    // on created callback function
    created() {
        // set defaults for external api
        this.name = this.name || 'Roger'

        // className is a cool way to assign CSS classes
        this.className = 'db pa2 pointer ba b--gold gradientRG animated infinite'

        // don't forget to call the render method!
        this.render()
    }

    render() {
        // create explicit mount
        let mount = this.html`<div></div>`

        // assign an id
        mount.id = 'react-second-element-assigned-id'

        // attach event listeners,
        // pass a reference to `this`, the Web Component
        // handleEvent API is implemented by HyperHTMLElement and this.on<event> will be called
        // this.render() called automatically after these events
        mount.addEventListener('click', this)
        mount.addEventListener('mouseover', this)
        mount.addEventListener('mouseleave', this)

        return ReactDOM.render(<h1 className='mv0 tc courier'>{this.name}, welcome to using React in Web Components,
            clicks: {this.state.clicks}</h1>, mount)
    }

    onclick() {
        // another cool way to manipulate via element's classList API
        // available methods: .add() .toggle() .remove()
        this.classList.toggle('gradientGR')
        this.firstElementChild.classList.toggle('avenir')
        this.firstElementChild.classList.toggle('courier')

        this.setState(this.state.clicks += 1)
    }

    onmouseover() {
        this.classList.add('light-blue', 'bg-near-black', 'shake')
    }

    onmouseleave() {
        this.classList.remove('light-blue', 'bg-near-black', 'shake')
    }
}

ReactSecond.define('react-second')
