const Standup = require('../../models/standup')

module.exports = function(router){
    //get
router.get('/standup',function(req,res){
   // res.send("hello");
   Standup.find({},(err,standup)=>{
       //check if error was found or not
       if(err){
           res.json({success:false,message:err});//return error message
       }
       else{
           //check if standup were found in database
           if(!standup){
               res.json({success:false,message:'no standup found.'});
           }
           else {
               res.json({success:true,standup:standup});//return success
           }
       }

   })
})
//post
router.post('/standup',function(req,res){
    let note = new Standup(req.body)//this what we given in models
    note.save(function(err,note){//save will delete the db and insert them
        if(err){
            return res.status(400).json(err)
        }
        res.status(200).json(note)//200 is the error status send to the outer world of angular that
        // this is working as express and then the json is given to them
    })
})

router.put('/updateStandup',(req,res)=>{
    //there should be an id provided for update 
    if(!req.body._id){
        res.json({success:false,message:'No standup id provided'});
    }
    else{
        Standup.findOne({_id:req.body._id},(err,standup)=>{//findone is find the id that mongo provided 
            if(err){
                res.json({success:false,message:'Not a valid standup id'});
            }
            else {
                standup.productname=req.body.productname;
                standup.productid = req.body.productid;
                standup.productprice= req.body.productprice;
                standup.department= req.body.department;
                standup.manufacdate=req.body.manufacdate;
                standup.barcode= req.body.barcode;
                standup.save((err)=>{
                    if(err){
                        res.json({success:false,message:err});
                    }
                    else{
                        res.json({success:true,message:'standup updated! '});
                    }
                });
            }
        });
    }
    
});

router.delete('/deletestandup/:id',(req,res)=>{

    //check if Id is provided in parameters
    if(!req.params.id)
    {
res.json({success:false,message:'No id provided'});//return error message
    }else{
        //check if id is found in databases
        Standup.findOne({_id:req.params.id},(err,standup)=>{
            //check if error was found
            if(err){
                res.json({success:false,message:'Invalid id'});//return error message
            }
            else{
                //remove the standup from database
                standup.remove((err)=>{
                    if(err){
                        res.json({success:false,message:err});//return error message
                    }
                    else{
                        res.json({success:true,message:'standup deleted'});//return success message
                    }
                });
            }
        });
    }
});

}