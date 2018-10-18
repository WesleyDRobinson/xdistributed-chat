const { wire } = HyperHTMLElement

class FeaturedRooms extends HyperHTMLElement {
  render() {
    const featuredRooms = ['Privacy Advocates', 'Coffee Enthusiasts ☕', 'Board Gamers']
    const containerClass = 'flex justify-center items-center ma2'
    const buttonClass = 'pointer dim pv2 ph3 ma2 br-pill ba bw1 b--blue bg-light-yellow'

    return this.html`
      <h4 class="mt2 mb0 fw5">check out a featured room</h4>
      
      <div id="featured-rooms-container" class=${containerClass} data-call=featuredRoom>
        ${featuredRooms.map(roomName => wire()`<span class=${buttonClass} onclick=${this} data-room=${roomName}>${roomName}</span>`)}
      </div>`
  }

  onclick(e) {
    page(`/room/${e.target.getAttribute('data-room')}`)
  }
}

FeaturedRooms.define('featured-rooms')
