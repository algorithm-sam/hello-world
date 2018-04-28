const express = require ('express');
const fs = require ('fs');
const hbs = require('hbs');
const port =process.env.PORT || 3000;
const app = express();
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
    const currentDate = new Date() .toString();
    const log=` ${currentDate} : ${req.method}  ${req.url}  \n`;
    fs.appendFile('server.log',log, ()=> {});
    console.log(log);
    next();
})

// app.use((req,res,next) => {
//     res.render('maintainance');
// })
app.get('/',(req,res)=>{
    res.render('index.hbs',{
        pageTitle: 'index'
    });
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/projects',(req,res) => {
    res.render('projects');
})
app.listen(port,()=>{
    console.log(`App running on port ${port}`);
});