var express = require('express')
var dotenv=require('dotenv')
var app = express()
var mysql = require('mysql')
const bodyParser = require('body-parser');
app.use(express.json())
dotenv.config()
const con=mysql.createConnection({
   host:process.env.host,
   user:process.env.user,
   password:process.env.password,
   database:process.env.database
})


//registration
//checked and successfull
app.post("/register/clg/",(req,res)=>{
  Id=req.body.Collageid
 Eamset=req.body.Eamsetcode
 Collage=req.body.Collagename
 phone=req.body.Phonenumber
  con.query("Insert INTO register(Collageid,Eamsetcode,Collagename,phonenumber) values(?,?,?,?)",[Id,Eamset,Collage,phone],(err,results)=>{
if(err){
  res.send(err.message)
}
else{
  res.send(results)
}
  })
})


//inserting student informantion
//checked successfully 
app.post("/post/s1/", (req, res) => {
  const {
    Collageid,
    Id,
    Email,
    Name,
    Course,
    Gender,
    Year,
    Section,
    Semester,
    Desigination,
    Fathername,
    Collagename,
    Number,
    Address,
    Password,
    Profilepic
  } = req.body;

  con.beginTransaction(function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    con.query(
      "INSERT INTO studentinfo (Collageid,Id,Email,Name,Gender,Course,Year,Section,Semester,Desigination,Gaurdian,CollageName,Number,Address,Password,Profilepic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [Collageid, Id, Email, Name, Gender, Course, Year, Section, Semester, Desigination, Fathername, Collagename, Number, Address, Password, Profilepic],
      function (error, results, fields) {
        if (error) {
          return con.rollback(function () {
            return res.status(500).send({ error: error.message });
          });
        }

        con.query(
          "INSERT INTO studentattendance (Collageid,Id,Attended,Total,Attendance) VALUES (?, ?, 0, 0, '{}')",
          [Collageid, Id,],
          function (error, results, fields) {
            if (error) {
              return con.rollback(function () {
                return res.status(500).send({ error: error.message });
              });
            }

            con.commit(function (err) {
              if (err) {
                return con.rollback(function () {
                  return res.status(500).send({ error: err.message });
                });
              }
              res.send('Data inserted successfully.');
            });
          }
        );
      }
    );
  });
});
       
//inserting Lectature informantion 
//checked and success
app.post("/post/l1",(req,res)=>{
  const {
    Collageid,
    Id,
    Email,
    Name,
    Course,
    Gender,
    Desigination,
    Collagename,
    Number,
    Address,
    Password,
   Image
  } = req.body;
  
  
         con.beginTransaction(function(err) {
            if (err) { return res.status(500).send({ error: err.message }); }
            
            con.query("INSERT INTO Leactinfo (Collageid,Id,Email,Name,Gender,Course,Desigination,CollageName,Address,Number,Password,profilepic,Blocks,Report) VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,'[]','[]')",
            [Collageid, Id, Email, Name,  Gender,Course,Desigination, Collagename, Address, Number, Password, Image],
             function(error, results, fields) {
              if (error) {
                return con.rollback(function() {
                  return res.status(500).send(error);
                });
              }
              
              con.query("INSERT INTO Leactattendance (Collageid,Id,taken,Attendance) VALUES (?,?,0,'{}')",
              [Collageid,Id] ,function(error, results, fields) {
                if (error) {
                  return con.rollback(function() {
                    return res.status(500).send( error);
                  });
                }
            
                con.query("INSERT INTO posts (Collageid,Id,posts) VALUES (?,?,'{}')",
                [Collageid,Id] ,function(error, results, fields) {
                  if (error) {
                    return con.rollback(function() {
                      return res.status(500).send(error);
                    });
                  }
                con.commit(function(err) {
                  if (err) {
                    return con.rollback(function() {
                      return res.status(500).send({ error: err.message });
                    });
                  }
                  res.send('Data inserted successfully.');
                });
                });
              });
            });
          });
        
});


        //updates
        //update student info table 
        //checked successfully
        app.patch("/personal/s1/:Id", (req, res) => {
         const {
          Collageid,
          Name,
          Email,
          Number,
          Fathername,
          Gender,
          Course,
          Section}=req.body
          Idnum = req.params.Id;
        
          const query = "update studentinfo SET name = ?, email = ?, Number = ?, Gaurdian = ?, Gender = ?, Course = ?, Section = ? WHERE id = ? AND collageid = ?";
        
          con.query(query, [Name, Email, Number, Fathername, Gender, Course, Section, Idnum, Collageid], (err, result) => {
            if (err) {
              return res.status(500).send({ error: err.message });
            } else {
              return res.status(200).send("Updated");
            }
          });
        });
        
      //update Lectat info table
    //checked  successfullly
    app.patch("/personal/f1/:Id",(req,res)=>{
      Idnum=req.params.Id
     const{ Collageid,
      Name,
       Number,
       Email,
       Department,
     Gender}=req.body
       con.query("Update Leactinfo SET name=?,email=?,Number=?,Course=?,Gender=? where id=? And collageid=?",
     [Name,Email,Number,Department,Gender,Idnum,Collageid],(err,result)=>{
         if(err){
          return res.status(500).send({ error: err.message });
         }
         else{
          return res.status(200).send("Updated")
         }  
     })
    })

        //when updating class u may loose this sem attendance
        app.put("/class/s1/:Id",(req,res)=>{
            Idnum=req.params.Id
        const{ Sem,
          Year,
          Collageid}=req.body
        con.query("Update studentinfo INNER JOIN studentattendance ON studentinfo.id=studentattendance.id SET studentinfo.Year=?,studentinfo.Semester=?,studentattendance.Attendance='{}',studentattendance.Attended=0,studentattendance.Total=0  where studentinfo.id=? AND studentinfo.collageid=?;",
         [Year,Sem,Idnum,Collageid],(err,result)=>{
             if(err){
              return res.status(500).send({ error: err.message });
             }
             else{
                 return res.status(200).send("Updated")
             }  
         })
        })


    


    //reporting/.'
    app.put("/report/f1/",(req,res)=>{
      report=req.body.report
       con.query("UPDATE lectatureinfo SET Reports = JSON_ARRAY_APPEND(Reports, '$',?)WHERE id=?;",
     report,(err,result)=>{
         if(err){
          return res.status(500).send({ error: error.message });
         }
         else{
          return res.status(200).send("Updated")
         }  
     })
    })

    //Blocks/.'
    app.put("/Block/f1/",(req,res)=>{
      report=req.body.report
       con.query("UPDATE lectatureinfo SET Reports = JSON_ARRAY_APPEND(Reports, '$',?)WHERE id=?;",
     report,(err,result)=>{
         if(err){
          return res.status(500).send({ error: error.message });
         }
         else{
          return res.status(200).send("Updated")
         }  
     })
    })

    //lectaturepassword update
    //checked successfully
    app.patch("/password/p1/f1/:Id",(req,res)=>{
      id=req.params.Id
     const {
      Password,
     Collageid}=req.body
       con.query("UPDATE Leactinfo SET Password=? WHERE id=? And collageid=?;",
     [Password,id,Collageid],(err,result)=>{
         if(err){
          return res.status(500).send({ error: err.message });
         }
         else{
          return res.status(200).send("Updated")
         }  
     })
    })


        //studentpassword update
        //checked successfully
        app.patch("/password/p1/s1/:Id",(req,res)=>{
          id=req.params.Id
     pass=req.body.Password
     collageid=req.body.Collageid
           con.query("UPDATE studentinfo SET Password = ? WHERE id=? And collageid=?;",
         [pass,id,collageid],(err,result)=>{
             if(err){
              return res.status(500).send({ error: err.message });
             }
             else{
              return res.status(200).send("Updated")
             }  
         })
        })


    //updating the student attendance table by adding date to the json column 
    //First class attendance query updating date and single subject in single query
    //checked successfully
    app.patch("/date/s1/f1/",(req,res)=>{
      collageid=req.body.Collageid
      id=req.body.Id
      Year=req.body.Year
      Sem=req.body.Semester
      Section=req.body.Section
      dat=req.body.Date
      Course=req.body.Course
               con.beginTransaction(function(err) {
                if (err) { return res.status(500).send({ error: err.message }); }
                //inserting date
                con.query( `UPDATE studentattendance INNER JOIN studentinfo on studentattendance.id=studentinfo.id SET Attendance = JSON_SET(Attendance, CONCAT(\'$."\',?, \'"\'),JSON_OBJECT()) WHERE studentattendance.collageid=? And studentinfo.Year=? And studentinfo.Section=? And studentinfo.Semester=?  
                And studentinfo.Course=?`,
                [dat,collageid,Year,Section,Sem,Course] ,function(error, results, fields) {
                  if (error) {
                    return con.rollback(function() {
                      return res.status(500).send({ error: error.message });
                    });
                  }
                   //inserting date
              con.query( 'UPDATE Leactattendance SET Attendance = JSON_SET(Attendance, CONCAT(\'$."\',?, \'"\'),JSON_OBJECT()) Where id=? And Collageid=? ',
              [dat,id,collageid], function(error, results, fields) {
                if (error) {
                  return con.rollback(function() {
                    return res.status(500).send({ error: error.message });
                  });
                }
                   con.commit(function(err,result) {
                      if (err) {
                        return con.rollback(function() {
                          return res.status(500).send({ error: err.message });
                        });
                      }else{
                      res.send(result);}
                    });
                    });
                  });
                });
              });


           
              
            // updating lectature 
            //checked successfully
    app.patch("/classdate/f1/s1",(req,res)=>{
              dat=req.body.Date
              Id=req.body.Id
              Year=req.body.Year
               Semester=req.body.Semester
              Course=req.body.Course
              Ids=req.body.Ids
              Collageid=req.body.Collageid
              Section=req.body.Section
              value=JSON.stringify(dat)
              node=value.replace(/}/g,"").replace(/{/g, "").replace(/:/g, ',')
             code=node.split(',')
            date=JSON.parse(code[0])
            red1=JSON.parse(code[1])
            red2=JSON.parse(code[2])

   
           con.beginTransaction(function(err) {
              if (err) { return res.status(500).send({ error: err.message }); }
             //inserting by class section and subjects//same date query for first class
             con.query('UPDATE studentattendance SET Attended=Attended+1, Attendance = JSON_SET(Attendance, CONCAT(\'$."\',?, \'"\'),JSON_OBJECT(?,?)) where id IN(?) ',[date,red1,red2,Ids],function(error, results, fields) {
              if (error) {
                return con.rollback(function() {
                  return res.status(500).send( error);
                });
              }
              con.query(`UPDATE studentattendance
              JOIN studentinfo ON studentattendance.id = studentinfo.id
              SET studentattendance.Total = studentattendance.Total+1  WHERE studentinfo.collageid = ?  AND studentinfo.Year = ?
                AND studentinfo.Section = ?
                AND studentinfo.Semester = ?
                AND studentinfo.Course = ?`,[Collageid,Year,Section,Semester,Course] ,function(error, results, fields) {
                if (error) {
                  return con.rollback(function() {
                    return res.status(500).send({ error: error.message });
                  });
                }
                //inserting by class section and subjects//same date query for first class
                
                con.query(`UPDATE Leactattendance SET Taken=Taken+1, Attendance = JSON_SET(Attendance, CONCAT(?), JSON_OBJECT(?,JSON_OBJECT(?, JSON_OBJECT(?,?)))) Where id=?`,
                [`$."${date}"."${Year}"`,Section,Course,red1,red2,Id] ,function(error, results, fields) {
                  if (error) {
                    return con.rollback(function() {
                      return res.status(500).send({ error: error.message });
                    });
                  }
                
                 
             con.commit(function(err,result) {
                    if (err) {
                      return con.rollback(function() {
                        return res.status(500).send({ error: err.message });
                      });
                    }else{
                    res.send(result);}
                  });
                  });
                });
              });
            });
  })

  // updating lectature 
   //Checked successfully
  app.put("/update/classes/same/f1/s1/",(req,res)=>{
              dat=req.body.Date
              Ids=req.body.Ids
              Id=req.body.Id
              Collageid=req.body.Collageid
              Year=req.body.Year
             Course=req.body.Course
             Semester=req.body.Semester
              Section=req.body.Section
              value=JSON.stringify(dat)
              node=value.replace(/}/g,"").replace(/{/g, "").replace(/:/g, ',')
             code=node.split(',')
            date=JSON.parse(code[0])
            red1=JSON.parse(code[1])
            red2=JSON.parse(code[2])

    
           con.beginTransaction(function(err) {
              if (err) { return res.status(500).send({ error: err.message }); }
           
  //updating the subjects in same date and inserting new subjects in  same date
    con.query('UPDATE studentattendance  SET Attended=Attended+1, Attendance = JSON_SET(Attendance, CONCAT(\'$."\', ?, \'".\', ?), \'?\') Where id IN(?)' ,
 [date,red1,red2,Ids] ,function(error, results, fields) {
   if (error) {
     return con.rollback(function() {
       return res.status(500).send({ error: error.message });
     });
   }
 //updating the subjects in same date and inserting new subjects in  same date
                  con.query( 'UPDATE Leactattendance SET Taken=Taken+1,Attendance = JSON_SET(Attendance, ?, ?) WHERE id = ?',
                  [`$."${date}"."${Year}".${Section}.${Course}.${red1}`,red2, Id] ,function(error, results, fields) {
                    if (error) {
                      return con.rollback(function() {
                        return res.status(500).send({ error: error.message });
                      });
                    }

                    con.query(`UPDATE studentattendance
              JOIN studentinfo ON studentattendance.id = studentinfo.id
              SET studentattendance.Total = studentattendance.Total+1  WHERE studentinfo.collageid = ?  AND studentinfo.Year = ?
                AND studentinfo.Section = ?
                AND studentinfo.Semester = ?
                AND studentinfo.Course = ?`,[Collageid,Year,Section,Semester,Course] ,function(error, results, fields) {
                if (error) {
                  return con.rollback(function() {
                    return res.status(500).send({ error: error.message });
                  });
                }
                  con.commit(function(err,result) {
                    if (err) {
                      return con.rollback(function() {
                        return res.status(500).send({ error: err.message });
                      });
                    }else{
                    res.send(result);}
                  });
                  });
                });
              });
            });
  })


          //single student delete account delete
          //checked successfully
          app.delete("/Account/delete/s1/:Id",(req,res)=>{
             Id=req.params.Id
           
           con.query(`DELETE studentattendance , studentinfo  FROM studentattendance  INNER JOIN studentinfo 
           WHERE studentinfo.id= studentattendance.id and studentattendance.id =?`,
               [Id], function(error, results, fields) {
                if (error) {
                  return res.status(500).send({ error: error.message });
                  }
                else{
                  return res.status(200).send(results)
                }
              })
            })

               //checked successfully
          app.delete("/Account/delete/f1/:Id",(req,res)=>{
            Id=req.params.Id
          
          con.query(`DELETE Leactattendance , Leactinfo  FROM Leactattendance  INNER JOIN Leactinfo 
          WHERE Leactinfo.id= Leactattendance.id and Leactattendance.id =?`,
              [Id], function(error, results, fields) {
               if (error) {
                 return res.status(500).send({ error: error.message });
                 }
               else{
                 return res.status(200).send(results)
               }
             })
           })

              //Attendance Sheet to take attendance 
              //checked successfully
              app.get("/AttendanceSheet/s1/:Course/:Section/:Year/:Semester/:Collageid/",(req,res)=>{
                const Department=req.params.Course;
                const Year=req.params.Year
               const Sem=req.params.Semester
                const Collageid=req.params.Collageid
                const Section=req.params.Section
                con.query('SELECT Id, Name,Profilepic from studentinfo Where Course=? And Section=? And Year=?  And Semester=? And Collageid=?',
                [Department,Section,Year,Sem,Collageid],(err,result)=>{
                  if(err){
                  res.send(err)
                  }
                  else{
                      res.send(result)
                  }  })
              })

              //login
              //checked successfully
              app.get("/login/s1/:id/:Password",(req,res)=>{
                const id=req.params.id;
                const password=req.params.Password
           
                con.query('SELECT * FROM studentinfo WHERE id = ? AND password =?',[id,password],
                (err,result)=>{
                  if(err){
                  res.send(err)
                  }
                  else{
                    
                      res.send(result)
                  }  })
              })
               //login
              //checked successfully
              app.get("/login/f1/:id/:Password",(req,res)=>{
                const id=req.params.id;
                const password=req.params.Password
           
                con.query('SELECT * FROM Leactinfo WHERE id = ? AND password =?',[id,password],
                (err,result)=>{
                  if(err){
                  res.send(err)
                  }
                  else{
                    
                      res.send(result)
                  }  })
              })


           

               //getting collage Id for students 
      app.get("/posts/feed/",(req,res)=>{
      connection.query("SELECT Id  FROM  register where collagename='chalapathi Engineering collage'",(error, results, fields)=> {
         if(error){
          res.send(error)
         }
         else{
          var ha=JSON.stringify(results)
       const no=ha.replace(/[\[\{\"\\}\]]/g, '')
       red=no.split(',')
       res.send(red)
         }
        }) 
    })


    //attendance performance 
    //checked Successfully
       app.get("/attendance/s1/:Course/:Year/:Sem/:Collageid/:Section",(req,res)=>{
                const Department=req.params.Course;
                const Year=req.params.Year
                const sem=req.params.Sem
                const Collageid=req.params.Collageid
                const Section=req.params.Section
                con.query('SELECT t1.Id ,t1.Name, t1.profilepic ,t2.Total, t2.Attended  FROM studentinfo t1 JOIN studentattendance t2 ON t1.id = t2.id Where t1.Course=? And t1.Year=? And t1.Semester=? And t1.Collageid=? And t1.Section=?',
                [Department,Year,sem,Collageid,Section],(err,result)=>{
                  if(err){
                  res.send(err)
                  }
                  else{
                      res.send(result)
                  }  })
              })


              //Attendance info everyday student 
              //success 
              app.get("/getattendance/s1/:Id/:Collageid",(req,res)=>{
                      const Id=req.params.Id
                      const Collageid=req.params.Collageid
                con.query("SELECT Attendance  FROM  studentattendance  WHERE id=? ANd Collageid=?",
                [Id,Collageid],(error, results, fields)=> {
                   if(error){
                    res.send(error)
                   }
                   else{
                    const ha=JSON.stringify(results)
                 const no=ha.replace(/[:\[\{\"\\}\]]/g, '')
                 red=no.split(',')
                 res.send(red)
                   }
                  }) 
              })


              //posting posts by timestamp
              //checked sucessfully
              app.patch("/posting/:Id",(req,res)=>{
                timestamp=req.body.Timestamp
                image=req.body.post
                id=req.params.Id
                con.query('update posts SET posts=JSON_SET(posts, CONCAT(\'$."\',?, \'"\'),?) where id=?',[timestamp,image,id],(error,results,fields)=>{
                  if(error){
                    res.send(error)
                  }
                  else{
                    res.status(200).send(results)
                  }
                })
              })

              //getting Search
                //checked successfully
                app.get("/Search/s1/:id/:Collageid",(req,res)=>{
                  id=req.params.id
                      collageid=req.params.Collageid
                  con.query(`SELECT Id,name,profilepic,year,semester,Course  from studentinfo where id=? And collageid=? `,[id,collageid],(error, results, fields)=> {
                     if(error){
                      res.send(error)
                     }
                     else{
                      const ha=JSON.stringify(results)
                    //  const no=ha.replace(/[\[\{\"\\}\]]/g, '')
                     // const ho=no.substring(1)
                       // hold=ho.split(',')
                      
                   res.send(ha)
                     }
                    }) 
                })
           //getting Search
                //checked successfully
                app.get("/Search/f1/:id/:Collageid",(req,res)=>{
                  id=req.params.id
                      collageid=req.params.Collageid
                  con.query(`SELECT Id,name,profilepic,Course  from Leactinfo where id=? And collageid=? `,[id,collageid],(error, results, fields)=> {
                     if(error){
                      res.send(error)
                     }
                     else{
                      const ha=JSON.stringify(results)
                    //  const no=ha.replace(/[\[\{\"\\}\]]/g, '')
                     // const ho=no.substring(1)
                       // hold=ho.split(',')
                      
                   res.send(ha)
                     }
                    }) 
                })

                //getting All posts Timeline
                //checked successfully
                app.get("/postsget/",(req,res)=>{
    
                  con.query(`SELECT posts as "" from posts Where posts is NOT NULL `,(error, results, fields)=> {
                     if(error){
                      res.send(error)
                     }
                     else{
                      const ha=JSON.stringify(results)
                    const no=ha.replace(/[\[\{:\"\\}\]]/g, '')
                      const ho=no.substring(0)
                      hold=ho.split(',')
                      
                   res.send(hold)
                     }
                    }) 
                })

                 //getting All posts by id
                //checked successfully
                app.get("/postsget/:id",(req,res)=>{
                    id=req.params.id
                  con.query(`SELECT posts as'' from posts where id=?`,id,(error, results, fields)=> {
                     if(error){
                      res.send(error)
                     }
                     else{
                      const ha=JSON.stringify(results)
                      const no=ha.replace(/[\[\{:\"\\}\]]/g, '')
                      const ho=no.substring(1)
                        hold=ho.split(',')
                      
                   res.send(hold)
                     }
                    }) 
                })

    //getting All posts Timeline except Blocked
                //checked successfully
                app.get("/Blockedget/",(req,res)=>{

                  Ids=req.body.Ids
                 con.query(`SELECT posts as'' from posts where id NOT IN(?) `,Ids,(error, results, fields)=> {
                     if(error){
                      res.send(error)
                     }
                     else{
                      const ha=JSON.stringify(results)
                      const no=ha.replace(/[\[\{\"\\}\]]/g, '')
                      const ho=no.substring(1)
                        hold=ho.split(',')
                      
                   res.send(hold)
                     }
                    }) 
                })

                //delete posts
                //success
                app.put("/deleteposts/:Id",(req,res)=>{
                  timestamp=req.body.Timestamp
                  Id=req.params.Id
                  con.query(`update posts SET posts=JSON_REMOVE(posts,?) where id=?`,[`$."${timestamp}"`,Id],(error,results,fields)=>{
                    if(error){
                      res.send(error)
                    }
                    else{
                      res.status(200).send(results)
                    }
                  })
                })

               
               //Attendance info everyday staff 
               //Success 
               app.get("/getattendanceleact/f1/:Id/:Collageid",(req,res)=>{
                const Id=req.params.Id
                const Collageid=req.params.Collageid
                con.query("SELECT Attendance AS '' FROM  Leactattendance  WHERE id=? And collageid=?",[Id,Collageid],(error, results, fields)=> {
                   if(error){
                    res.send(error)
                   }
                   else{
                    const ha=JSON.stringify(results)
                 const no=ha.replace(/[:\[\{\"\\}\]]/g, '')
                 red=no.split(',')
                 res.send(red)
                   }
                  }) 
              })



              //delete lectature by Id
              //checked success
              app.delete("/delete/:Id",(req,res)=>{
                const Id=req.params.Id
             connection.query("DELETE t1, t2, t3 FROM lectatureinfo t1 INNER JOIN lectatureattendance t2 ON t1.id = t2.id INNER JOIN Posts t3 ON t2.id = t3.id WHERE t1.id =?",
            Id, function(error, results, fields) {
           if (error) {
           return res.status(500).send({ error: error.message });
                    }
                    else{
                      return res.status(200).send( results); 
                    }
                  })
                })



                //delete full collage data and collage
                app.delete("/Collagename&data/:Collageid",(req,res)=>{
                  CollageId=req.params.Collageid
                           con.beginTransaction(function(err) {
                            if (err) { return res.status(500).send({ error: err.message }); }
                            //inserting date
                            con.query( "DELETE from register WHERE collageid=?",
                            CollageId, function(error, results, fields) {
                              if (error) {
                                return con.rollback(function() {
                                  return res.status(500).send({ error: error.message });
                                });
                              }
                               //inserting date
                          con.query('delete studentinfo,studentattendance from studentinfo JOIN studentattendance ON studentinfo.Id=studentattendance.Id Where studentinfo.collageId=?',
                          CollageId, function(error, results, fields) {
                            if (error) {
                              return con.rollback(function() {
                                return res.status(500).send({ error: error.message });
                              });
                            }
                            con.query('delete Leactinfo,Leactattendance from Leactinfo JOIN Leactattendance ON Leactinfo.Id=Leactattendance.Id Where Leactinfo.collageId=?',
                            CollageId, function(error, results, fields) {
                              if (error) {
                                return con.rollback(function() {
                                  return res.status(500).send({ error: error.message });
                                });
                              }
                              con.query('delete posts from posts where collageId=?',
                              CollageId, function(error, results, fields) {
                                if (error) {
                                  return con.rollback(function() {
                                    return res.status(500).send({ error: error.message });
                                  });
                                }
                               con.commit(function(err,result) {
                                  if (err) {
                                    return con.rollback(function() {
                                      return res.status(500).send({ error: err.message });
                                    });
                                  }else{
                                  res.send("Deleted Collage Successfully");}
                                });
                                });
                              });
                            });
                          });
                        })
                      })
     app.listen(process.env.port, function(err){
        if (err) console.log(err);
    
        console.log("Server listening on PORT",process.env.port);
    });   

