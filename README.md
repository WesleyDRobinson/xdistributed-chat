# POC - P2P Client connectivity

Dependencies:

* IPFS + [IPFS.js](https://github.com/ipfs/js-ipfs)

* [ipfs-pubsub-room](https://github.com/ipfs-shipyard/ipfs-pubsub-room)

Clients are assigned a unique ID and announce to other peers that they have joined a certain "room" (in this case 'presence-pod')

Demo latest release: https://distributed.now.sh

To run locally,

1. `git clone git@bitbucket.org:presencetools/p2p-poc-browser.git`
2. `npm install` or `yarn add`
3. `npm run dev` or `yarn run dev`

To add new components, create the .js file in `src` folder.
And Import them where used and don't worry about duplicating, webpack will shake it out
If element is used "top-level" in index.html, like `<app-shell></app-shell>`, import the component in `src/app.js`

To build for production, run `npm run build` and the `public` folder is ready to serve.
### Tooling

CSS toolkits:
tachyons.io: http://tachyons.io/
animate.css: https://github.com/daneden/animate.css

Web Components:
* built by extending the hyperHTMLElement: https://github.com/WebReflection/hyperHTML-Element
* find more info on [hyperHTML wires](https://viperhtml.js.org/hyperhtml/documentation/#api-1)
