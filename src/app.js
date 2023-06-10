const express = require("express");
const app = express();
const port = 5002
const router = require("./module/contact/contact_controller")
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', router)

app.get('/healthCheck', (req, res, next)=> {
  res.send('hello world!')
});
//Create Server
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});
