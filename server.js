const express = require ('express');
const fs = require ('fs');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
    const currentDate = new Date() .toString();
    const log=` ${currentDate} : ${req.method}  ${req.url}  \n`;
    fs.appendFile('server.log',log, ()=> {});
    console.log(log);
    next();
})

app.use((req,res,next) => {
    res.render('maintainance');
})
app.get('/',(req,res)=>{
    res.render('index.hbs',{
        pageTitle: 'index',
        date: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    res.send({
        page: 'about',
        url: req.url,
        method:req.method
    });
});


app.listen(3000,()=>{
    console.log('App running on port 3000');
});