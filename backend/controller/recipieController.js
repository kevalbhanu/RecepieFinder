const express  =require('express');
const {jwtAuthMiddleware} = require('../middleware/jwt');
const axios = require('axios');
const router = express.Router(); 


//@desc Fetch all the recepies
//@route GET /api/recepie

router.get('/',jwtAuthMiddleware ,async (req,res)=>{
    try {
        const recepies = await axios.get('https://dummyjson.com/recipes');
        res.status(200).json(recepies.data);
    } catch (error) {
        res.status(400).json({message:"Something went Wrong"})
    }
});


//@desc Fetch all the tags for filteration
//@route GET /api/recepie/tags

router.get('/tags',jwtAuthMiddleware,async(req,res)=>{
    try {
        const tags = await axios.get('https://dummyjson.com/recipes/tags');
        res.status(200).json(tags.data);
    } catch (error) {
        res.status(400).json({message:"Something went Wrong"})
    }
});

//@desc Fetch recepies based on tags
//@route GET /api/recepie/tag/:tag

router.get('/tag/:tag',jwtAuthMiddleware,async(req,res)=>{
    try {
        const tag = req.params.tag;
        const recepies = await axios.get(`https://dummyjson.com/recipes/tag/${tag}`);
        res.status(200).json(recepies.data);
    } catch (error) {
        res.status(400).json({message:'Something went Wrong',error})
    }
});

module.exports=router;