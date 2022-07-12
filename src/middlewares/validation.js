const validation=(req,res,next)=>{
    
    if(req.body.name==="" || req.body.email==="" || req.body.password===""){
          return res.status(400).send({message:"All Fields Required"})
    }
    else if(req.body.password.length<5) return res.status(400).send({message:"Password should be 6 to 8 charactor long"})
    else {return next()}
}

module.exports=validation