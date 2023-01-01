// import db
const db = require('../config/mongo');

// IMPORT THE TODO OBJECT FROM MODELS
const Todo = require('../models/todo')

module.exports.home = function(req,res){
    Todo.find({},function(err,task){
        if(err){
            console.log('Error in fetching data: ',err);
            return;
        }
        return res.render('home_view',{
            todo_list:task
        });
    });   
}

//create function to insert into db
module.exports.create = function (req, res) {
      console.log("hello........",req.body);
    Todo.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date
        }, function (err, newtask) {
            if (err) {
                console.log('error in creating task', err);
                return;
            }else{
                console.log("new contact created successfully: ",newtask);
            }
            return res.redirect('back');
        }
    )
}

//delete function to delete single id using cross button
module.exports.delete= function(req, res) {
    let id = req.query.id;
    Todo.findByIdAndDelete(id, function(err){
        if(err) {
            console.log("error");
            return;
        }
        return res.redirect('back');
    });
}

//delete function to ids using delete button
module.exports.delete_many=function(req, res) {
    let ids = req.body.task;
    if(typeof(ids)=='undefined'){
        return res.end('<script>alert("No task selected, Please Go Back & select some task");</script>');
    }
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        console.log("single item to delete id = ",ids);
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {    // if multiple task is to be deleted
        console.log("multiple task to delete: ",ids);
        for (let i = 0; i < ids.length; i++) {
            Todo.findByIdAndDelete(ids[i], function (err) {
                console.log("id to be deleted: ",ids[i]);
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
}