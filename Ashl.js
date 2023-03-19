var express = require('express')
var dotenv=require('dotenv')
var app = express()
var mysql = require('mysql')
app.use(express.json())
dotenv.config()
const con=mysql.createConnection({
   host:process.env.host,
   user:process.env.user,
   password:process.env.password,
   database:process.env.database
})

global.Eamsetcode=""

//Register your collage
app.post("/create",(req,res)=>{
    var rest=0;
    var error;
    req.body.forEach( element => {
    Eamsetcode=element.Eamsetcode
 con.query("insert into register Set?;",element,(err,result)=>{
    if(err){
        error=err
    }
    else{
        rest++}
    })
      })

con.query("create table IF NOT EXISTS "+Eamsetcode+
  " ( Id varchar(15) UNIQUE NOT NULL,Email varchar(50) UNIQUE NOT NULL, Name varchar(70) NOT NULL,Department varchar(10) NOT NULL,Gender varchar(7) NOT NULL,Section varchar(3),Year int NOT NULL,Desigination varchar(10) NOT NULL, FatherName varchar(70) NOT NULL, CollageName varchar(200) NOT NULL,Number Bigint NOT NULL,address varchar(255) NOT NULL,Password varchar(15) NOT NULL );"
)
     
con.query("create table IF NOT EXISTS  "+Eamsetcode+
"_Attendance (Id varchar(15) NOT NULL,Attended Bigint(1) ,Total Bigint(1),Date Date NOT NULL);",(err,result)=>{
if(error){
    res.send(JSON.parse(JSON.stringify(error)))}
   else{
    res.send("Affected rows "+rest)
   }
   })
})

    
  
  
   //Multile entry
   app.post("/insert",(req,res)=>{
   
     data=req.body
     con.query("insert into "+Eamsetcode+" Set?;",data,(err,result)=>{
        if(err){
            res.send(err)}
            else{
                res.send(result)
            }
        })
      
})

//Attendance multiple
  app.post("/Attendanceinsert",(req,res)=>{
        req.body.forEach( element=>{
            const Id=element.Id
            const Attended=element.Attended
            const Total=element.Total
            const Date=element.Date
con.query("insert into "+Eamsetcode+"_Attendance values(?,?,?,?);",[Id,Attended,Total,Date],(err,result)=>{
      if(err){
       
      return res.send(err)
    }
 }) });
 res.send("posted list")
  })



 //Student Info by Id we can get
  app.get("/Studentinfo/:Id",(req,res)=>{
      const Idnum=req.params.Id;
  con.query('select * from opq where id=?',Idnum,(err,result)=>{
           if(err){
               console.log(err)
           }
           else{
               res.send(result)
           } 
       }) })
  
  
   //Attendance table by a paticular Department and Class
   app.get("/Attendanceinfo/:Department/:Year",(req,res)=>{
      const Department=req.params.Department;
      const Year=req.params.Year
       con.query('select t1.Id,t1.Name,t1.Year,t1.Department, SUM(t2.Attended) as"Attended_classes",sum(t2.Total) as "Total_classes" from ' +Eamsetcode +' as t1 inner join ' +Eamsetcode+'_Attendance as t2 on t1.Id=t2.Id GROUP by Id having t1.Department=? and t1.Year=?;',[Department,Year],(err,result)=>{
           if(err){
           res.send(err)
           }
           else{
               res.send(result)
           }  })
   })

  
   //update all fields
   app.put("/update/:Id",(req,res)=>{
       Idnum=req.params.Id
       Name=req.body.Name
       Year=req.body.Year
        Section=req.body.Section
        Number=req.body.Number
        Email=req.body.Email
        Fathername=req.body.Fathername
        password=req.body.Password
      con.query("Update "+Eamsetcode+" SET name=?,email=?,year=?,section=?,Number=?,Fathername=?,password=? where id=?",
      [Name,Email,Year,Section,Number,Fathername,password,Idnum],(err,result)=>{
          if(err){
              res.send(err)
          }
          else{
              res.send("Updated")
          }  
      })
   })
//update only year 
   app.put("/updateClass/:Department",(req,res)=>{
         Department=req.params.Department
         Year=req.body.Year
         update=Year
   con.query("Update "+Eamsetcode+" SET Year=?+1 where Department=? And Year=?",[update,Department,Year],(err,result)=>{
       if(err){
           res.send(err)
       }
       else{
           res.send(result.length);
       }  
   })
})


  
   //delete single student
   app.delete("/delete/:Id",(req,res)=>{
   const Id=req.params.Id
   con.query("delete from "+Eamsetcode+" where Id=?",[Id],(err,result)=>{
      if(err){
          res.send(err)
      }
      else{
          res.send(result.length)
      }  
   })
   })
   //delete students with dep & year also section
   app.delete("/deleteid/:Date/:Department/:Year",(req,res)=>{
    const Year=req.params.Year
    const Department=req.params.Department
    const Date= req.params.Date
     con.query("DELETE t1,t2 from "+Eamsetcode+" as t1  INNER JOIN "+Eamsetcode+"_attendance as t2 ON t1.Id= t2.Id WHERE t2.date < ? And t1.Department=? And t1.Year=? ",[Date,Department,Year],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

//delete studends by Dep & year
app.delete("/delete/:Date/:Department/:Year",(req,res)=>{
    const Date=req.params.Date
    const Year=req.params.Year
    const Department=req.params.Department
    con.query("DELETE t1 from "+Eamsetcode+"_attendance  as t1  INNER JOIN opq as t2 ON t1.Id= t2.Id WHERE t1.date < ? And t2.Department=? And t2.Year=?",[Date,Department,Year],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

   //delete collage
   app.delete("/drop/:Eamsetcode",(req,res)=>{
       Eamsetcode=req.params.Eamsetcode
       var error="";
       var success="";
    con.query("delete from register Where Eamsetcode=?",Eamsetcode,(err,result)=>{
        if(err){
            error="Error in deletion"
        }
        else{
            success="Deleted Successfully"
        }
    })
      con.query("drop table IF EXISTS "+Eamsetcode+","+Eamset+"_Attendance",(err,result)=>{
         if(err){
             res.send(error)
         }
         else{
             res.send(success)
         }  
      })
      })

  
 app.listen(process.env.port, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT",process.env.port);
});
