const blogs = require("../models/blogsModel");
// const Users = require("../models/userModel");
const createBlog = async (req, res, next) => {
  try {
    const blogDetails = { ...req.body, author:`${req.User.firstname}` `${req.User.lastname}`,author_id:req.User._id };
    // const blog = req.body
    console.log(req.body._id);
    const blogToCreate = await blogs.create(blogDetails);
    return res.status(201).json({
      status: "success",
      data: { blogToCreate },
    });
  } catch (error) {
    return next(error);
  }
};
const getAllBlogs = async (req, res, next) => {
  try {
    let page = +req.query.page || 1
    const limit = 20;
    const skip = (page - 1) * limit
    const getBlogs = await blogs.find().skip(skip).limit(limit);
    if(req.query.state == 'draft'){
      const draftedBlogs = await blogs.find({state : "draft"});
      res.json(draftedBlogs);
    }
     if (req.query.state == "published") {
       const publishedBlogs = await blogs.find({ state: "published" });
      res.json(draftedBlogs);
     }
    return res.status(200).json({
      status: "success",
      data: { getBlogs },
    });
  } catch (error) {
    return next(error);
  }
};
// you still have pagination and getting blogs of a specific user

const getBlogById = async (req, res, next) => {
  try {
    const {id} = req.params
    const blog = await blogs.findOne(id).populate("author_id").select("-password");
    blog.read_count += 1;
    blogs.save()
    return res.status(200).json({
      status: "success",
      data: { blog },
    });
  } catch (error) {
    return next(error);
  }
};
const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogToUpdate = await blogs.findById(id)
    if(blogToUpdate.author._id.toString() !== id) return next(new Error("blog is not found"))
    if (!blogToUpdate) return next(new Error("blog not found!"));
    const updatedBlog = await blogs.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(201).json({
      status: "success",
      data: { updatedBlog },
    });
  } catch (error) {
    return next(error);
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogToDelete = await blogs.findById(id);
    if (blogToDelete.author._id.toString() !== id)
      return next(new Error("blog is not found"));
    if (!blogToDelete) return next(new Error("blog not found!"));
    const deletedBlog = await blogs.findByIdAndDelete(id);
    if (!deletedBlog) return next(new Error("blog not found!"));
    return res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog ,
  deleteBlog
};
