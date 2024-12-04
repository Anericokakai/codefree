import { Home } from "../features/Home";
import Blogs from "../features/Blogs/pages/Blogs";
import BlogCard from "../features/Blogs/Components/BlogCard";
import { ReadBlog } from "../features/Blogs";

const generalroutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/blogs",
        element: <Blogs />,
        children: [
            {
                path: "/blogs/:blog_id",
                element: <BlogCard />,
            },
        ],
    },
    {
        path: "/blogs/:blog_id/:id",
        element: <ReadBlog />,
    },
];
export default generalroutes;
