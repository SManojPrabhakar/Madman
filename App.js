require('dotenv').config()
var express = require('express')
var app = express()

var mysql = require('mysql')
app.use(express.json())

const con=mysql.createConnection({
   host:process.env.host,
   user:process.env.user,
   password:process.env.password,
   database:process.env.database
})


//Register your collage
app.post("/create",(req,res)=>{
    const  dat=req.body
      collagename=req.body.collagename
      con.query("insert into registration Set?;",dat,(err,result)=>{
        if(err) {
          console.log(err)
        }
        
        else{
           res.send("Inserted")
           
        }
       })
  con.query("create table IF NOT EXISTS "+collagename+
  " ( Id varchar(15) UNIQUE NOT NULL,Email varchar(50) UNIQUE NOT NULL, Name varchar(70) NOT NULL,Department varchar(10) NOT NULL,Section varchar(3),Year int NOT NULL,Desigination varchar(10) NOT NULL, FatherName varchar(70) NOT NULL, CollageName varchar(200) NOT NULL,Number Bigint NOT NULL,address varchar(255) NOT NULL,Password varchar(15) NOT NULL );",function(err,result,feilds){
  if(err) {
    console.log(err)
  }
  else{
     res.send(result.json)
  }
  })
     
con.query("create table IF NOT EXISTS  "+collagename+
"_Attendance (Id varchar(15) NOT NULL,Attended int ,Total int ,Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);",function(err,result,feilds){
   if(err) {
      console.log(err)
   }
   else{
       res.send(result.json)
   }
   })
})

    
  
  
   //Multile entry
  app.post("/Insertion",(req,res)=>{
      
     var data=req.body
      con.query("insert into jloe set?",data,(err,result)=>{
          if(err){
              console.log(err)
          }
          else{
              res.send("posted")
          }  
      })
  })
  //Attendance multiple
  app.post("/Attendanceinsert",(req,res)=>{
      data=req.body
  con.query("insert into medico_attendance set?",data,(err,result)=>{
      if(err){
          console.log(err)
      }
      else{
          res.send("posted Attendance")
      } 
  })
  })
  
  
  //Student Info by Id we can get
  app.get("/Studentinfo",(req,res)=>{
      const Idnum=req.params.Id;
  
       con.query('select * from jloe  ',(err,result)=>{
           if(err){
               console.log(err)
           }
           else{
               res.send(result)
           } 
       })
   })
  
  
   //Attendance table by a paticular Department and Class
   app.get("/Attendanceinfo",(req,res)=>{
      const Department=req.params.Department;
      const Year=req.params.Year
       con.query('select t1.Id,t1.Name,t2.Attended,t2.Total from medico as t1 inner join medico_Attendance as t2 on t1.Id=t2.Id',[Department,Year],(err,result)=>{
           if(err){
               console.log(err)
           }
           else{
               res.send(result)
           } 
       })
   })
  
   //update all fields
   app.put("/update/:Id",(req,res)=>{
       Idnum=req.params.Id;
       Name=req.body.Name
       year=req.body.year
        Section=req.body.Section
        Number=req.body.Number
        Email=req.body.Email
        FatherName=req.body.FatherName
      con.query("Update medico SET name=?,email=?,year=?,section=?,Number=?,FatherName=? where id=?",
      [Name,Email,year,Section,Number,FatherName,Idnum],(err,result)=>{
          if(err){
              console.log(err)
          }
          else{
              res.send("Updated")
          }  
      })
   })
  
   //delete single student
   app.delete("/delete/:Year/:Department",(req,res)=>{
   const year=req.params.Year
   const Department=req.params.Department
   con.query("delete from medico where Year=? And Department=? ",[year,Department],(err,result)=>{
      if(err){
          console.log(err)
      }
      else{
          res.send("Deleted Successfully")
      }  
   })
   })
   app.delete("/delete/:Id",(req,res)=>{
       Id=req.params.Id
      con.query("delete from medico where Id=?",Id,(err,result)=>{
         if(err){
             console.log(err)
         }
         else{
             res.send("Deleted Successfully")
         }  
      })
      })
  
 app.listen(process.env.port, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT",process.env.port);
});