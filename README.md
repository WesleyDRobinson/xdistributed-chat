# POC - P2P Client connectivity

Dependencies:

* IPFS + [IPFS.js](https://github.com/ipfs/js-ipfs)

* [ipfs-pubsub-room](https://github.com/ipfs-shipyard/ipfs-pubsub-room)

Clients are assigned a unique ID and announce to other peers that they have joined a certain "room" (in this case 'presence-pod')

Demo: https://pubsub-poc-ugdlbbvfsf.now.sh

To run locally,

1. `git clone git@bitbucket.org:presencetools/p2p-poc-browser.git`
2. `npm install`, and `npm run build && npm run start`

## Next steps

What else do we need to see to "Prove out P2P realtime data connectivity between two instances of Client"?

> Note: Building IPFS in app.js with browserify produces a rather large 3.3 MB bundle, 
while loading minified IPFS.js via `<script src="https://unpkg.com/ipfs/dist/index.min.js"></script>`
will be quite small:

![smaller bundles](https://cloudup.com/cVp_1twyTPo+)