const { Router } = require("express");
const Notebook = require("../models/notebook");
const {validationResult} = require('express-validator/check');
const {addValidators} = require('../utils/validators')

const auth = require("../middleware/auth");
const router = Router();

router.get("/", auth, (req, res) => {
  res.render("add", { title: "Add Notebook", isAdd: true });
});

router.post("/", auth,addValidators, async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render('add',{errors:errors.array()[0].msg, data:{
      title:req.body.title,
      price:req.body.price,
      descr:req.body.descr,
      img:req.body.img
    }})
  }

  const notebook = new Notebook({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    descr: req.body.descr,
    userId: req.user,
  });
  try {
    await notebook.save();
    res.redirect("/notebooks");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
