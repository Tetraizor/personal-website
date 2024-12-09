const BASE_URL = import.meta.env.PUBLIC_SERVICE_URL + "/api";

const API_CONFIG = {
  BLOG: {
    GET_ALL_POSTS: `${BASE_URL}/blog/getAllPosts`,
    GET_POST_BY_ID: `${BASE_URL}/blog/getPostById`,
    GET_POST_BY_URL_STRING: `${BASE_URL}/blog/getPostByUrlString`,
    UPDATE_POST: `${BASE_URL}/blog/updatePost`,
    CREATE_POST: `${BASE_URL}/blog/createPost`,
    DELETE_POST: `${BASE_URL}/blog/deletePost`,
  },
  FEATURED: {
    GET_ALL: `${BASE_URL}/featured/getAllFeaturedItems`,
  },
};
export default API_CONFIG;
