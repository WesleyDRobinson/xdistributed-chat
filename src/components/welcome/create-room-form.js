class CreateRoomForm extends HyperHTMLElement {
  render() {
    return this.html`
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

  onsubmit(e) {
    e.preventDefault()
    const name = document.getElementById('room-name').value
    page(`/room/${name}`)
  }
}

CreateRoomForm.define('create-room-form')
