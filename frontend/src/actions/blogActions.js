import axios from 'axios';

import { GET_BLOG_LIST,
         GET_BLOG,
         GET_ERRORS,
         GET_SUCCESS_MESSAGE } from './types';
import getToken from '../utils/getToken';


const authenticationHeaders = {
  headers: {
    'X-AUTH': getToken(),
    'Content-Type': 'application/json'
  }
};

export const getBlogs= (query) => async dispatch => {

  try{
    // Traverse the query object, create a query string
    // in the format key1=value1&key2=value2..
    // Object.keys makes an array of property names owned by the object only,
    // not inherited properties.
    const queryString = Object.keys(query)
                              .map( key => `${key}=${query[key]}`)
                              .join('&');
    console.log('queryString',queryString);
    const response = await axios.get(`/api/blogs/?${queryString}`);
    dispatch({type: GET_BLOG_LIST,
              payload: response.data});
  }catch (error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

export const getBlogById = (id) => async dispatch => {
  try{
    const response = await axios.get(`/api/blogs/${id}/`);
    dispatch({type: GET_BLOG,
              payload: response.data});
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

export const postBlog = (blog, history) => async dispatch => {
  try{
    const newBlog = { title: blog.title,
                      content: blog.content };
    const response = await axios.post('/api/blogs/',
                                blog,
                                authenticationHeaders);
    const blogId = response.data.id;

    // after the blog has been created, create images associated with it.
    for(let image of blog.images){
      let postBlogImageResponse = await axios.post('/api/blog_images/',
                                                      { image: image.imageFile,
                                                         blog: blogId },
                                                      authenticationHeaders);
    }
    dispatch({type: GET_SUCCESS_MESSAGE,
              payload: {successMessage: "Blog created!"}});
    history.push("/dashboard");
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

// export const postBlogImage = (blog, userId) => async dispatch => {
//   try{
//     const response = await axios.post('/api/blogs/',
//                                 blog,
//                                 authenticationHeaders);
//     dispatch({type: GET_SUCCESS_MESSAGE,
//               payload: {successMessage: "Blog created!"}});
//     history.push("/dashboard");
//   }catch(error){
//     dispatch({type: GET_ERRORS,
//               payload: error});
//   }
// }

export const editBlog = (blog, history) => async dispatch => {
  try{

    // edit the title and content of the blog first.
    const data = {
      title: blog.title,
      content: blog.content
    }
    const response = await axios.patch(`/api/blogs/${blog.id}/`,
                                 data,
                                 authenticationHeaders);

    // delete/patch blog images that were on the current blog,
    // but not on the new blog. For now, only 1 image allowed per blog,
    // so that image will be the one that will be replaced.

    const images = response.data.image;
    console.log("images:", images);
    const newImagesHasPrevId = blog.images
                                   .map(e => e.id)
                                   .indexOf(images[0].id);

    console.log("newImagesHasPrevId", newImagesHasPrevId);
    // if the newImages in the request does not contain id of blog image,
    // patch the blog image with the new one.
    if(newImagesHasPrevId < 0){
      const patchImageResponse = await axios.patch(`/api/blog_images/${images[0].id}/`,
                                                   { image: blog.images[0].imageFile },
                                                   authenticationHeaders);
    }

    dispatch({ type: GET_SUCCESS_MESSAGE,
               paylod: {successMessage: "Blog edited!"}});
    history.push("/dashboard");
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}
