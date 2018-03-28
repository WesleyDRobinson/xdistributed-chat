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
class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "th",
                { colSpan: "2" },
                category
            )
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name : React.createElement(
            "span",
            { style: { color: 'red' } },
            product.name
        );

        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                name
            ),
            React.createElement(
                "td",
                null,
                product.price
            )
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach(product => {
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(React.createElement(ProductCategoryRow, {
                    category: product.category,
                    key: product.category }));
            }
            rows.push(React.createElement(ProductRow, {
                product: product,
                key: product.name
            }));
            lastCategory = product.category;
        });

        return React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "Name"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Price"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                rows
            )
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return React.createElement(
            "form",
            null,
            React.createElement("input", {
                type: "text",
                placeholder: "Search...",
                value: this.props.filterText,
                onChange: this.handleFilterTextChange
            }),
            React.createElement(
                "p",
                null,
                React.createElement("input", {
                    type: "checkbox",
                    checked: this.props.inStockOnly,
                    onChange: this.handleInStockChange
                }),
                ' ',
                "Only show products in stock"
            )
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(SearchBar, {
                filterText: this.state.filterText,
                inStockOnly: this.state.inStockOnly,
                onFilterTextChange: this.handleFilterTextChange,
                onInStockChange: this.handleInStockChange
            }),
            React.createElement(ProductTable, {
                products: this.props.products,
                filterText: this.state.filterText,
                inStockOnly: this.state.inStockOnly
            })
        );
    }
}

const PRODUCTS = [{ category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' }, { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' }, { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' }, { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' }, { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' }, { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }];

class ThinkingReact extends HyperHTMLElement {
    created() {
        this.className = 'flex justify-center mt3';
        this.render();
    }

    render() {
        return ReactDOM.render(React.createElement(FilterableProductTable, { products: PRODUCTS }), this.html`<div></div>`);
    }
}
ThinkingReact.define('thinking-react');

/*
* Usage:
* */
