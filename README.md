# P2P Client connectivity

![distributed chat screenshot](https://cldup.com/CQeFdCBUx7.png)

> latest release: https://distributed.now.sh

## What is it?
- An anonymous way to communicate with a network; digital chat that is similar to vocal conversation in the physical world. The text is broadcast only to those present in the room. Messages only last as long as the receivers keep them in memory.
- a chat client + IPFS file uploader!

To effectively communicate with other people, enter the same room name.

Peers are assigned a unique ID and announce to other peers when they join or leave any room.

## How is this different from SMS or email or Slack?

Distributed Chat is

- * Distributed*: once an [InterPlanetary File System (IPFS)](https://ipfs.io) node is running in the browser, it will connect directly to other nodes with no central points of failure
- *💯 Transparent*: the static site is 100% open sourced—simply add `/_src` to the end of any url to see the code
- *🙅‍ P2P/ Truly Serverless*: send messages directly to your peers; there are **no central servers**
- *⏳ Realtime only*: messages are broadcast **only once** to the currently connected peers; new peers entering the room will not "catch up"
- *🌫 Ephemeral*: while IPFS object names are permanent, your "permalinks" will only persists as long as some node requests it, for more info, see [Replication on IPFS](https://discuss.ipfs.io/t/replication-on-ipfs-or-the-backing-up-content-model/372) and [Permanence != Persistance](https://discuss.ipfs.io/t/how-permanent-is-data-stored-on-ipfs/354)
- *🎭 Anonymous + 🔒 Private*: only information you choose to share is available to others on the network
- * Avaialable*: runs in any browser; securely hosted and serverd by a global service: https://distributed.now.sh & https://dc.now.sh

## Why do I want this?
You might not—it's a somewhat brittle means of communication. But in my experience, nothing else like this exists.
 A free-to-use and powerful browser-based, zero-surveillance communication tool; you never know when you need to reliably and securely chat or share resources with your network.

### Contributing


#### Running locally

1. `git clone git@bitbucket.org:presencetools/p2p-poc-browser.git`
2. `npm install` or `yarn add`
3. `npm run dev` or `yarn run dev`

To add new components, create a `COMPONENT-NAME.js` file in `src` folder.
`import` them where used and don't worry about duplicating, webpack will only include the
If element is used "top-level" in index.html, like `<app-shell></app-shell>`, import the component in `src/app.js`

All the config is in place to build React powered Web Components in `src/components/react-components`
For a very simple demo for wiring up a React App or component as a Web Component, check out L168-181 of `thinking-react.js`... the very bottom.
It's a copy/paste from the [React Docs](https://reactjs.org/docs/thinking-in-react.html).

I've written a couple more example components with a few different options for patterns.
Please, show me what you're working on, and I'll see how we can wire it together and make development pleasant for all!

To build for production, run `npm run build` and the `public` folder is ready to serve.

### Dependencies & Tooling

* IPFS + [IPFS.js](https://github.com/ipfs/js-ipfs)
* [ipfs-pubsub-room](https://github.com/ipfs-shipyard/ipfs-pubsub-room)
* CSS toolkits: [tachyons.io](http://tachyons.io/), [animate.css](https://github.com/daneden/animate.css)
* Web Components built by extending the [hyperHTMLElement](https://github.com/WebReflection/hyperHTML-Element)
* The app makes heavy use of [hyperHTML wires](https://viperhtml.js.org/hyperhtml/documentation/#api-1)
* For future development, it's possible to use React inside Web Components.
