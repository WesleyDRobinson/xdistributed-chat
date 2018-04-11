# P2P Client connectivity

![distributed chat screenshot](https://cldup.com/CQeFdCBUx7.png)

> latest release: https://distributed.now.sh

## How do I use it?

If you enter the same room as one other person, it's a private chat... chat away!

A room turns into a group chat if more peers join.

While you can't stop peers from joining your room, choosing a long or hard to guess name reduces the chance of others joining.

Even if someone joins your room, they can't see what you've been chatting about—only what you say moving forward.

With Distributed Chat, you always know how many peers are connected to a room and who can see the messages you send. You have some manner of undersight or inverse oversight or sousveillance.

## What is it?

- a free-to-use communication tool
- a simple, *IPFS-based chat system
- an anonymous way to communicate on a distributed network
- a type of digital chat that imitates conversations in the physical world
- messages are broadcast only to peers present in the room
- messages only last as long as the receivers keep them in memory
- upload files to an IPFS node, running in the browser

    * [IPFS](https://ipfs.io) is a peer-to-peer, hypermedia protocol; it is an alternative to HTTP and aims to replace it.

## How is this different from SMS or email or Slack?

distributed chat complements these tools, but offers a unique experience.

- *🌐 Distributed*: once an [InterPlanetary File System (IPFS)](https://ipfs.io) node is running in the browser, it will connect directly to other nodes—so no central points of failure exist
- *💯 Transparent*: [on github](https://github.com/WesleyDRobinson/distributed-chat), and on the site—simply add `/_src` to the end of any url to see the code
- *🙅‍ P2P/ Truly Serverless*: send messages directly to your peers; there are **no central servers**
- *⏳ Real-time only*: messages are broadcast to the currently connected peers; new peers entering the room will not "catch up"
- *🌫 Ephemeral*: while IPFS object names are permanent (a hash based on the content), your "permalinks" will only persists as long as some node requests it, for more info, see [Replication on IPFS](https://discuss.ipfs.io/t/replication-on-ipfs-or-the-backing-up-content-model/372) and [Permanence != Persistance](https://discuss.ipfs.io/t/how-permanent-is-data-stored-on-ipfs/354)
- *🎭 Anonymous + 🔒 Private*: only information you choose to share is available to others on the network
- *🆗 Available*: runs in most browsers; decentralized and securely hosted: https://distributed.now.sh & https://dc.now.sh

## Why do I want this?
You might not—it's a somewhat brittle means of communication. But it is a pretty cool tool.
 A free-to-use, browser-based, zero-surveillance communication tool; you never know when you need to reliably and securely chat or share resources with your network.

Add to Homescreen for a native app-like experience.

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

### Some inspirational and related applications

* ScatterChat http://www.scatterchat.com/
* Orbit.chat https://github.com/orbitdb/orbit
* Ricochet.im https://github.com/ricochet-im/ricochet
* Snapchat https://en.wikipedia.org/wiki/Snapchat
* OTR.im https://otr.im/index.html

