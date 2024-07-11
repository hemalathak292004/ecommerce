const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    res.status(500).json({message:"error"})
})
app.listen(3000)