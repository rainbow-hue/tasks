const mongoose = require('mongoose');
const Task = require('./tasks');


const dbURI = "mongodb+srv://daniel:jKD4KrEz2MDNpvoC@cluster0.qcvll.mongodb.net/nodedb?retryWrites=true&w=majority";


async function create(){

   const t1 = new Task({
      
       Description:"wake up at 4:00 am",
       Completed:"true"
    })

   await t1.save();

    const t2 = new Task({
        Description:"exercise",
        Completed: "true"
     })

   await  t2.save();

     const t3 = new Task({
        Description:"take a bath",
        Completed: "false"
     })
     
   await  t3.save();

     const t4 = new Task({
        Description:"have breakfast",
        Completed: "false"
     })

   await  t4.save();
     
}

async function find(){

   await Task.find({Completed:"false"})
    .then((docs)=>{
      
          docs.forEach((ele)=>{
             console.log(ele.Description);
            });
      
   })
   .catch((err)=>{
      console.log("error finding  files.....")
   })
}

async function update(){
   await Task.updateMany({Completed:"false"},{$set:{Completed:"true"}})
   .then((docs)=>{
     
         console.log('documents updated...');
      }
   )
   .catch((err)=>{
      console.log("error updating  files.....")
   })
}

async function delete_doc(){
   await Task.findByIdAndDelete({_id:"6162f9ab16e1ea4f944a5055"})
   .then((docs)=>{
      
         console.log("document deleted");
      }
   )
   .catch((err)=>{
      console.log("error deleting  files.....")
   })

}



mongoose.connect(dbURI,{ useNewUrlParser : true, useUnifiedTopology: true})
   .then(()=>{
      console.log("connected to the db");
   })
   .then((result)=>{
      console.log("documents added");
      create();
   })
   .then((result)=>{
      find();
   })
   .then((result)=>{
      
      update();
   })
   .then((result)=>{
      delete_doc();
   })
   .catch((err)=>console.log(err))

 