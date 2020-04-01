//npm start
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const mess=[];

// app.get('/users', (req, res) =>
//   res.send('users')
// );

app.post('/messages',(req,res)=>
{
    // console.log(req);
    const { body } = req;
    console.log("new mess", body.content);
    mess.push(body);
    res.status(204).end();
});

const subscribers ={};
app.post('/subscribe',(req,res)=>
{
    const {id} = req.body;
    console.log('New One ', id);
    res.on('close',() => delete subscribers[id]);
    subscribers[id] = res;
   
});
app.post('/messageSubscribers',(req,res)=>
{
    const {body} = req;
    Object.keys(subscribers).forEach((resID) => {
        subscribers[resID].json(body);
        delete subscribers[resID];

    });   

    res.status(204).end();
});



app.get('/messages',(req,res)=>
{
    res.json(mess);
});

// app.get('/',(req,res)=>
// {
//     console.log("here");
//     res.send("hi");
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
