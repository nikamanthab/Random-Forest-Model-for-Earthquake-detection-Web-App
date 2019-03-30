
var express = require('express'); 
var app = express(); 
var bodyparser=require('body-parser');
var path=require('path');
app.use(bodyparser.json());
app.use("/",express.static("./public"));

app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 

  

app.get('/name', callName); 

app.post('/send',(req,res)=>{
     let user=req.body;
     console.log(user);
     user.city=user.city.toLowerCase();
    var spawn = require("child_process").spawn; 

    var process = spawn('py',[path.join(__dirname,"PRED.py"), 
    user.age, user.floor,
    user.height,user.plinth,
    user.land_surface,
    user.foundation,
    user.rooftype,
    user.groundfloor,
    1,
    user.position,
    user.plan_config,
    user.condition_post_eq,
    user.city]); 
   
    process.stdout.on('data', function(data) { 
        console.log("hello");
        res.send(data.toString()); 
    }) ;
})
  
function callName(req, res) {   
 
    var spawn = require("child_process").spawn; 
    var process = spawn('python',["./ok.py", 
                            req.query.usr, 
                            req.query.psr] ); 
   
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    }) ;
} 