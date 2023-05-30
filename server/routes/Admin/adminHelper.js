import fs from 'fs'
export const deleteFile=async(image,collection,id,res)=>{
    
         
          const delete_git_blog = await collection.findByIdAndDelete(id);
          if (!delete_git_blog)
            return res.json({ status: 400, result: "failed to delete blog" });
          res.json({ status: 200, result: "blog deleted successfully" });
    
        
      ;
}