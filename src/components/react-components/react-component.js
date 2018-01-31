class ReactComponent extends HyperHTMLElement {
    static get observedAttributes() {
        return ['name']
    }
    created() {
        // `this` refers to the Web Component
        this.name = this.name || 'Roger'
        this.className = 'db'
        this.render()
    }
    render() {
        const onClick = this.onClick
        const mount = this.html`<div></div>`
        return ReactDOM.render(<h1 onClick={onClick} className='pa2 mv0 tc avenir'><span className='pointer'>{this.name}</span>, welcome to using React in Web Components</h1>, mount)
    }

    onClick(e) {
        let reactComponent = e.target.parentElement.parentElement
        reactComponent.name = reactComponent.name + ' ' + Math.random().toString(10).slice(4)
        reactComponent.render()
    }
}

ReactComponent.define('react-component')
