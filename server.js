import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module
const __dirname = path.dirname(__filename);
// Join the directory name with the 'public' folder
const publicDir = path.join(__dirname + '/public');
// Use the express.static middleware to serve static files from the 'public' directory
app.use(express.static(publicDir));

app.get('/' , (req,res) => {
    res.sendFile( publicDir + "/index.html");
});

app.post("/product", (req,res)=>{
    console.log(req.body);
});

app.post("/book",(req,res)=>{
    const data = {
        name : req.body.name,
        date : req.body.date,
        time : req.body.time,
        pickUp : req.body.pickUpLoc,
        drop : req.body.dropLoc
    }

    res.render(publicDir + '/views/confirmation.ejs', {info: data});
});

app.listen(4040, () => {
    console.log("Site is up on http://localhost:4040");
});