import { Post } from "../models/post.model.js";

const createPost = async (req,res) => {
    try {
        const { title, description, age } = req.body;

        if(!title || !description || !age){
            return res.status(400).json({
                message : "All Fields are Required"
            });
        }

        const post = await Post.create({
            title,
            description,
            age
        });

        res.status(201).json({
            message: "Post Created Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getPosts = async (req, res) => {
    try{
        const posts = await Post.find();

        res.status(200).json({
            message: "Posts Fetched Successfully",
            posts
        });
    }catch (error) {
        return res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try{
        if(Object.keys(req.body) == 0){
            return res.status(400).json({
                message: "No data for update."
            })
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after"
        });

        // if(!post) return res.status(404).json({ message: "Post not Found"});

        res.status(200).json({
            message: "Post Updated Successfully",
            post
        });
    } catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deletePost = async (req, res) => {

    try{
        const deleted = await Post.findByIdAndDelete(req.params.id);

        if(!deleted){
            return res.status(404).json({
                message : "Post was not found",
            })
        }

        return res.status(200).json({
            message : "Your Post has been deleted Sucessfully"
        })
    } catch (error){
        return res.status(500).json({
            message : "Internal Server Error",
            error : error.message
        })
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}