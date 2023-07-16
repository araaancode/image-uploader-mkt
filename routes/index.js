const express=require("express")
const router=express.Router()


router.get('/',(req,res)=>{
    res.render("index")
})

const Image=require("../models/Image")
const upload=require("../utils/upload")
const resize=require("../utils/resize")


router.post('/upload-image',upload.single("image"),resize,async(req,res)=>{
        if (req.file == undefined) {
          return res.send(`You must select a file.`);
        }
        
        if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg'){
            
              await Image.create({
                  title: req.body.title,
                  image: req.file.filename,
                  created_at: Date.now()
                }).then((result)=>{
                  if(result){
                    res.redirect('/')
                  }
                }).catch((error)=>{
                  res.send(error)
                })
        }else{
            res.send("you should select an image with png/jpg format")
        }
     
})

router.get('/my-images',async(req,res)=>{
    const myImages = await Image.findAll({})
    
    res.render('myImages',{
        myImages
    })
})

router.delete("/delete-image/:id",async(req,res)=>{
  await Image.destroy({
    where: {
       id: req.params.id //this will be your id that you want to delete
    }
 }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }
 }, function(err){
     console.log(err); 
 });
})

module.exports = router