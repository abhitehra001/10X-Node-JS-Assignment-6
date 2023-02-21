const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

//To create the blog data in blogs collection
router.post("/", async(req, res) => {
    try{
        const newBlog = new Blog({
            topic: req.body.topic,
            description: req.body.description,
            posted_at: Date.now(),
            posted_by: req.body.posted_by
        });
        const blog = await newBlog.save();
        const response = {};
        response.status = "success";
        response.result = blog;
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//To retrieve the data and display it page wise i.e. 5 blogs per page
router.get("/",async(req,res)=>{
    const foundData = await Blog.find({$text:{$search: req.query.search}})
    const response = {};
    const page = req.query.page;
    const data = [];
    let i = 5;
    while(foundData[page*5-i] && i!==0){
        data.push(foundData[page*5-i])
        i--;
    }
    response.status = "success";
    response.result = data;
    res.json(response);
})

//To update the data
router.put("/:_id", async(req,res)=>{
    const blog = await Blog.updateOne(req.params,{$set: req.body})
    const response = {};
    response.status = "success"
    response.result = await Blog.find(req.params);
    response.message = blog;
    res.json(response);
})

//To delete the data
router.delete("/:_id", async(req,res)=>{
    const response = {};
    response.result = await Blog.find(req.params);
    const blog = await Blog.deleteOne(req.params)
    response.status = "success"
    response.message = blog;
    res.json(response);
})


module.exports = router;