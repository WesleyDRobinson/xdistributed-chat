class WelcomeHeading extends HyperHTMLElement {
  render() {
    const dcStyles = 'f3 fw7 ttu avenir tracked'
    const h1Styles = 'f2 fw2 tc dark-gray courier'
    return this.html`<h1 class=${h1Styles}>welcome to <span class=${dcStyles}>d</span>istributed <span class="${dcStyles}">c</span>hat</h1>`
  }
}

WelcomeHeading.define('welcome-heading')
