const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(bodyParser.urlencoded({extended:true}));

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

var threads =[
    {id:1,thread:{content:'I love judo!', comment:''}},

    {id:2,thread:{content:'Me too!', comment:''}}

]

var idCount = 2;

app.get('/', (req,resp) => {
    resp.render('JuDoRks');
})
app.get('/data', (req, resp) =>{
    resp.render('seeAll', {
        locals:{
            tData:threads
        }
    });            
})

app.post('/create',(req,resp) => {
    var thread = req.body;
    console.log(thread);
threads.push({id:++idCount, thread});
console.log(threads);
resp.send(threads);
})

app.post('/:id', (req,resp) => {
    var commentCount = 0;
    var foundThread = threads.find((element)=> element.id == parseInt(req.params.id));
   
    foundThread.thread.comment.push(req.body.comment);
//     console.log(req.body.comment);
//     console.log(req.params.id);
//    console.log(foundThread);
   
console.log(threads);
   resp.send(foundThread);

})


    


app.listen(3000, (req,resp) => {
    console.log('JuDoRks is listening on port 3000');
})
