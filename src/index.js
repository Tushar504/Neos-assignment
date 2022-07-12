const express=require('express')
var fs = require('fs');
const fileName="./assets/userData.json"
const file = require(fileName);
const validation=require("./middlewares/validation")
var cors = require('cors')
app.use(cors())

const app=express()
app.use(express.json())

const hash=(password)=>{
     return password+"sha25"
}


app.post('/signup',validation,async(req,res)=>{
    try {
        const user = file.filter((el)=>{
            return el.email===req.body.email
        });
     
        if(user.length==1){
            return res.status(400).send({message:"Email Id already registered"})
        }

        // hashing password
      req.body.password=hash(req.body.password)

        file.push(req.body)
     
        fs.writeFile(__dirname + '/assets/userData.json', JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            res.send({user:file[file.length-1],message:'Success'})
           
            console.log('writing to ' + fileName);
          });
       
      
    } catch (error) {
        res.send(error)
    }
})

app.post("/login",async(req,res)=>{
    try {
        const user = file.filter((el)=>{
            return el.email===req.body.email
        });
       
        if (user.length===0) {
            res.status(400).send({message:'User not found'});
        } else {
            //  decrypting password
           let password=hash(req.body.password)
           
            if(password==user[0].password){
            res.status(200).send({user,message:"Success"});
            }
            else{
                res.status(400).send({message:"Wrong Password"});
            }
        }
    } 
    catch (error) {
        res.status(500).send(error.message);
    }

})
app.get('/', async(req, res)=>{
    try {
        fs.readFile(__dirname + '/assets/main.html', 'utf8', function(err, text){
            if(err){
               return res.send(err)
            }
           return res.send(text);
        });
    } catch (error) {
        return res.send(error)
    }
   

})
app.listen(process.env.PORT||1200,async()=>{
     try {
        console.log("listening on port 1200")
     } 
     catch (error) {
        console.log(error)
     }
})