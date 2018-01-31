import React from 'react';
import ReactDOM from 'react-dom';
class ReactComponent extends HyperHTMLElement {
    static get observedAttributes() {
        return ['name'];
    }
    created() {
        // `this` refers to the Web Component
        this.name = this.name || 'Roger';
        this.className = 'db';
        this.render();
    }
    render() {
        const onClick = this.onClick;
        const mount = this.html`<div></div>`;
        return ReactDOM.render(React.createElement(
            'h1',
            { onClick: onClick, className: 'pa2 mv0 tc avenir' },
            React.createElement(
                'span',
                { className: 'pointer' },
                this.name
            ),
            ', welcome to using React in Web Components'
        ), mount);
    }

    onClick(e) {
        let reactComponent = e.target.parentElement.parentElement;
        reactComponent.name = reactComponent.name + ' ' + Math.random().toString(10).slice(4);
        reactComponent.render();
    }
}

ReactComponent.define('react-component');
class ReactSecond extends HyperHTMLElement {
    // an external api
    static get observedAttributes() {
        return ['name'];
    }

    // an internal state object
    // use this.setState() to manipulate
    get defaultState() {
        return { clicks: 0 };
    }

    // on created callback function
    created() {
        // set defaults for external api
        this.name = this.name || 'Roger';

        // className is a cool way to assign CSS classes
        this.className = 'db pa2 pointer ba b--gold gradientRG animated infinite';

        // don't forget to call the render method!
        this.render();
    }

    render() {
        // create explicit mount
        let mount = this.html`<div></div>`;

        // assign an id
        mount.id = 'react-second-element-assigned-id';

        // attach event listeners,
        // pass a reference to `this`, the Web Component
        // handleEvent API is implemented by HyperHTMLElement and this.on<event> will be called
        // this.render() called automatically after these events
        mount.addEventListener('click', this);
        mount.addEventListener('mouseover', this);
        mount.addEventListener('mouseleave', this);

        return ReactDOM.render(React.createElement(
            'h1',
            { className: 'mv0 tc courier' },
            this.name,
            ', welcome to using React in Web Components, clicks: ',
            this.state.clicks
        ), mount);
    }

    onclick() {
        // another cool way to manipulate via element's classList API
        // available methods: .add() .toggle() .remove()
        this.classList.toggle('gradientGR');
        this.firstElementChild.classList.toggle('avenir');
        this.firstElementChild.classList.toggle('courier');

        this.setState(this.state.clicks += 1);
    }

    onmouseover() {
        this.classList.add('light-blue', 'bg-near-black', 'shake');
    }

    onmouseleave() {
        this.classList.remove('light-blue', 'bg-near-black', 'shake');
    }
}

ReactSecond.define('react-second');
