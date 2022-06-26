const {body} = require('express-validator/check');
const User = require("../models/user");

exports.regValidators  = [
    body('email').isEmail().withMessage('Email should be ccorrectly').custom(async(val,{req})=>{
        try {
            const user = await User.findOne({email:val});
            if(user){
                return Promise.reject('This email is already exsist')
            }
        } catch (error) {
                console.log(error);
        }
    }).normalizeEmail(),
    body('name').isLength({min:3}).withMessage('name should be min 3 symbols'),
    body('password').isLength({min:3,max:22}).withMessage('Password should be min 6 symbols').isAlphanumeric().trim(),
    body('confirm').custom((val,{req})=>{
        if(val!==req.body.password){
            throw new Error('Password Should be similar')
        }
        return true
    }).trim().withMessage('Confirm is error')
];

exports.addValidators = [
    body('title').isLength({min:3}).withMessage('Title Should be min 3 symbols'),
    body('price').isNumeric().withMessage('Write correct Price'),
    body('img').isURL().withMessage('Url sould be entered'),
    body('descr').isLength({min:3}).withMessage('Description should be min 3 symbols')
]