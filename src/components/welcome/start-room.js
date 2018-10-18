import WelcomeHeading from './welcome-heading'
import CreateRoomForm from './create-room-form'
import FeaturedRooms from './featured-rooms'

class StartRoom extends HyperHTMLElement {
  created() {
    this.className = 'tc pa2 avenir animated fadeIn near-black'
    this.render()
  }

  render() {
    return this.html`
            <welcome-heading />            
            <featured-rooms />
            <create-room-form />`
  }
}

StartRoom.define('start-room')
