'use strict'

const path = require("path"),
    express = require("express"),
    app = express(),
    PORT = process.env.PORT || 8080,
    appDir = path.resolve(__dirname, "public")

app.use(express.static(appDir))

app.get("*", (req, res) => res.sendFile(path.resolve(appDir, "index.html")))

app.listen(PORT, () => console.log("Express server listening at http://localhost:" + PORT))
