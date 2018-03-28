# POC - P2P Client connectivity

Dependencies:

* IPFS + [IPFS.js](https://github.com/ipfs/js-ipfs)

* [ipfs-pubsub-room](https://github.com/ipfs-shipyard/ipfs-pubsub-room)

Clients are assigned a unique ID and announce to other peers that they have joined a certain "room" (in this case 'presence-pod')

### Todos

* Add "Show own peerId" button/ screen
* Add service worker for "offline" capability—"offline" is becoming a fuzzy line :)

Demo latest release: https://distributed.now.sh

To run locally,

1. `git clone git@bitbucket.org:presencetools/p2p-poc-browser.git`
2. `npm install` or `yarn add`
3. `npm run dev` or `yarn run dev`

To add new components, create the .js file in `src` folder.
And Import them where used and don't worry about duplicating, webpack will shake it out
If element is used "top-level" in index.html, like `<app-shell></app-shell>`, import the component in `src/app.js`

All the config is in place to build React powered Web Components in `src/components/react-components`
For a very simple demo for wiring up a React App or component as a Web Component, check out L168-181 of `thinking-react.js`... the very bottom.
It's a copy/paste from the [React Docs](https://reactjs.org/docs/thinking-in-react.html).

I've written a couple more example components with a few different options for patterns.
Please, show me what you're working on, and I'll see how we can wire it together and make development pleasant for all!

To build for production, run `npm run build` and the `public` folder is ready to serve.
### Tooling

CSS toolkits:
tachyons.io: http://tachyons.io/
animate.css: https://github.com/daneden/animate.css

Web Components:
* built by extending the hyperHTMLElement: https://github.com/WebReflection/hyperHTML-Element
* find more info on [hyperHTML wires](https://viperhtml.js.org/hyperhtml/documentation/#api-1)
