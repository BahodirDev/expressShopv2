const {Router} = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = Router();

router.get('/',auth,(req,res)=>{
    res.render('profile',{
        title:"Profile Page",
        isProfile:true,
        user:req.user.toObject()
    })
})

router.post('/',auth, async(req,res)=>{
  try {
    const user = await User.findById(req.user._id);
    console.log(req.file);
    const obj ={
        name:req.body.name
    }
    if(req.file){
        obj.avatarUrl = req.file.path
    }
    Object.assign(user,obj);
    await user.save();
    res.redirect('/profile')
  } catch (error) {
        console.log(error);
  }
})

module.exports = router;