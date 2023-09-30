import { useState, useEffect } from "react";
import { Post } from "../../types";
import Pagination from "./Pagination";
const PaginationComponent = () => {
     const [posts, setPosts] = useState<Post[]>([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(0);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     // Fetch Posts
     const fetchPosts = async (page: number) => {
          try {
               setLoading(true);
               const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6&_page=${page}`);
               const data = await res.json();
               if (res.ok) {
                    const totalPosts = res.headers.get("x-total-count");
                    const totalPages = Math.ceil(parseInt(totalPosts!) / 6);
                    setTotalPages(totalPages);
                    setPosts(data);
                    setLoading(false);
               }
          } catch (error) {
               setLoading(false);
               setError("Failed to fetch posts");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchPosts(currentPage);
     }, [currentPage]);

     const handlePageChange = (page: number) => {
          setCurrentPage(page);
     };
     return (
          <div className="pb-20 mx-auto mt-20 space-y-4 max-w-7xl">
               <h3 className="text-4xl font-bold text-center text-orange-500">Pagination</h3>
               {error ? (
                    <p className="text-4xl font-bold text-center">{error}</p>
               ) : (
                    <div className="grid gap-8 p-6 lg:gap-16 lg:p-0 lg:grid-cols-3 sm:grid-cols-2">
                         {posts.map(post => (
                              <div key={post.id} className="p-4 border border-orange-500 rounded-lg shadow-xl ">
                                   {loading ? (
                                        <div className="w-full h-full">
                                             <h3 className="text-lg font-semibold">Title is loading</h3>
                                             <p className="text-sm">Post description is loading</p>
                                        </div>
                                   ) : (
                                        <>
                                             <h3 className="text-lg font-semibold">{post.title}</h3>
                                             <p className="text-sm">{post.body}</p>
                                        </>
                                   )}
                              </div>
                         ))}
                    </div>
               )}
               <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
          </div>
     );
};

export default PaginationComponent;
