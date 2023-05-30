import fs from 'fs'
export const deleteFile=(image,collection,id,res)=>{
    fs.unlink(image, async (err) => {
         if (err) {
          res.json({
            status: 400,
            result: "an error occured while deleteing the the file",
          });
        } else {
          const delete_git_blog = await collection.findByIdAndDelete(id);
          if (!delete_git_blog)
            return res.json({ status: 400, result: "failed to delete blog" });
          res.json({ status: 200, result: "blog deleted successfully" });
    
        }
      });
}