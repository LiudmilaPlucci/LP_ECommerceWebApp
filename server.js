const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

let serviceAccount = require("./public/credentials/lpecommercewebapp-2efd5-firebase-adminsdk-kuvn3-c1af2be8c9.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



let staticPath = path.join(__dirname, "public")

const app = express();

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})
app.get("/product", (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})
app.get("/search", (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"));
})
app.get("/404", (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})
app.use((req, res) => {
    res.redirect('/404');
})
app.listen(3000, () => {
    console.log('listening on port 3000.........');
})
