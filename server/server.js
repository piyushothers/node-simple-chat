const express = require('express')
const path = require('path')
const publicPath = path.join(__dirname,'/../public')

var app = new express();
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.listen(port ,()=> {
    console.log(`server is up on port ${port}`);
})

