// import dataservice file from service folder

const dataservice=require('./service/dataService')

//import jsonwebtoken

const jwt=require('jsonwebtoken')



//import express
const express=require('express')

//create app

const app =express()

//set port
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})

//to convert json datas to js
app.use(express.json())


// middleware to verify token

const jwtmiddleware=(req,res,next)=>{
    console.log("......router specific middleware...... ");
    try{
        const token =req.headers['access-token']
    const data=jwt.verify(token,"successkey333")
    console.log(data);
    next()
    }
    catch{
       res.status(422).json( {
            statusCode:422,
            status:false,
            message:"please login"
        })
    }
}

//request


//register

app.post('/register',(req,res)=>{

    const result=dataservice.register(req.body.acno,req.body.uname,req.body.psw)
   
    res.status(result.statusCode).json(result)
   


})

//login

app.post('/login',(req,res)=>{

    const result=dataservice.login(req.body.acno,req.body.psw)
   
    res.status(result.statusCode).json(result)
   


})

//deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{

    const result=dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
   
    res.status(result.statusCode).json(result)
   


})

//withdraw

app.post('/withdraw',jwtmiddleware,(req,res)=>{

    const result=dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
   
    res.status(result.statusCode).json(result)
   


})

//gettransaction

app.post('/transaction',jwtmiddleware,(req,res)=>{

    const result=dataservice.gettransaction(req.body.acno)
   
    res.status(result.statusCode).json(result)
   


})









//GET 

// app.get('/',(req,res)=>{
//     res.send('GET Method checking........')
// })

// //post

// app.post('/',(req,res)=>{
//     res.send('POST Method checking........')
// })

// //put

// app.put('/',(req,res)=>{
//     res.send('PUT Method checking........')
// })

// //patch

// app.patch('/',(req,res)=>{
//     res.send('PATCH Method checking........')
// })

// //delete

// app.delete('/',(req,res)=>{
//     res.send('DELETE Method checking........')
// })



