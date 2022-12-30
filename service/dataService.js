//import jsonwebtoken

   const jwt=require("jsonwebtoken")
 
 
 
 
 userdetails={
    1000:{acno:1000,username:'anu',password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:'amal',password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:'arun',password:123,balance:0,transaction:[]},
    1003:{acno:1003,username:'mega',password:123,balance:0,transaction:[]}
  }

    //register

 register=(acno,uname,psw)=>{
    if(acno in userdetails){
      return {
        statusCode:401,
        status:false,
        message:"user already exist"

      }
    }
    else{
      userdetails[acno]={acno,username:uname,password:psw,balance:0,transaction:[]}
      return {
        statusCode:200,
        status:true,
        message:"registration success"
      }
      
    }
   }

   login=(acno,psw)=>{
  
   
    if(acno in userdetails){
     if(psw==userdetails[acno]["password"]){
      const token=jwt.sign({currentAcno:acno},'successkey333')
  
       return {
        statusCode:200,
        status:true,
        message:"login success",
        token
        
       }
     }
     else{
       return {
        statusCode:401,
        status:false,
        message:"incorrect password"
       }
     }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:"incorrect acno"
       }
    }
    }

    deposit=(acno,password,amount)=>{
      var amnt=parseInt(amount)
      if(acno in userdetails){
        if(password==userdetails[acno]['password']){
          userdetails[acno]['balance']+=amnt
          userdetails[acno]['transaction'].push({type:'CREDIT',amount:amnt})
         
  
          return {
            statusCode:200,
            status:true,
            message:userdetails[acno]['balance']
           }
        }
        else{
          return {
            statusCode:401,
            status:false,
            message:"incorrect password"
           }
        }
      }
      else{
        return  {
          statusCode:401,
          status:false,
          message:"incorrect acno"
         }
      }
  
    }

    withdraw=(acno,password,amount)=>{
      var amnt=parseInt(amount)
      if(acno in userdetails){
        if(password==userdetails[acno]["password"]){
          if(amnt<=userdetails[acno]["balance"]){
            userdetails[acno]["balance"]-=amnt
            userdetails[acno]['transaction'].push({type:'DEBIT',amount:amnt})
           
    
            return {
              statusCode:200,
              status:true,
              message:userdetails[acno]["balance"]
             }
            
          }
          else{
            return {
              statusCode:401,
              status:false,
              message:"insufficient balance"
             }
          }
    
        }
        else{
          return {
            statusCode:401,
            status:false,
            message:"incorrect password"
           }
        }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:"incorrect acno"
         }
      }
    
     }

     gettransaction=(acno)=>{
      if(acno in userdetails){
        return {
          statusCode:200,
          status:true,
          message:userdetails[acno]["transaction"]
         }
      }
      else{
        return  {
          statusCode:401,
          status:false,
          message:"incorrect acno"
         }
      }
     }

   module.exports={
    register,
    login,
    deposit,
    withdraw,
    gettransaction
   }