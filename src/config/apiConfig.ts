const BASE_URL = import.meta.env.PUBLIC_SERVICE_URL + "/api";

const API_CONFIG = {
  BLOG: {
    GET_POSTS: `${BASE_URL}/blog/getPosts`,
    GET_POST: `${BASE_URL}/blog/getPost`,
    UPDATE_POST: `${BASE_URL}/blog/updatePost`,
    CREATE_POST: `${BASE_URL}/blog/createPost`,
    DELETE_POST: `${BASE_URL}/blog/deletePost`,
  },
  FEATURED: {
    GET_ALL: `${BASE_URL}/featured/getAllFeaturedItems`,
  },
};
export default API_CONFIG;
