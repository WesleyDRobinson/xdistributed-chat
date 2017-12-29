# POC - P2P Client connectivity

Demo: https://pubsub-poc-irxklcchpf.now.sh

To run locally,

1. `git clone git@bitbucket.org:presencetools/p2p-poc-browser.git`
2. `npm install`, and `npm run build && npm run start`

## Next steps

[] Reduce bundle size.
> Building IPFS in app.js with browserify produces a rather large 3.3 MB bundle,
while loading minified IPFS.js via `<script src="https://unpkg.com/ipfs/dist/index.min.js"></script>`
will be quite small:

![smaller bundles](https://cloudup.com/cVp_1twyTPo+)