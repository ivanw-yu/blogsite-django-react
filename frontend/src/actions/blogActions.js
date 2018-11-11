import axios from 'axios';

import { GET_BLOG_LIST,
         GET_BLOG,
         GET_BLOG_RATINGS,
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

    // trim the key, and replace spaces with | for regex searching
    // on the backend.
    const {search, page} = query;
    if(query.search)
      query.search = query.search.trim().replace(/[ ]+/, '');

    const queryString = Object.keys(query)
                              .map( key => `${key}=${query[key]}`
                                // trim the key, and replace spaces with | for regex searching
                                // on the backend.
                                //return `${key}=${String(query[key]).trim().replace(/[ ]+/, '|')}`;
                              )
                              .join('&');

    // request to get the blogs based on the query string.
    // if no blogs found, and user is not specified in the query string,
    // return all blogs. (This means when searching, and no results found,
    // all blogs are returned instead; this does not happen when searching
    // for blogs that belong to a specific user.)
    let response,
        noInitialResults = false;
    try{
      response = await axios.get(`/api/blogs/?${queryString}`);
    }catch(error){
      // if no blogs found on a blog search, get all blogs.
      // this error occurs when page > 1 and the search term yields no result.
      if(!query.user){
        response = await axios(`/api/blogs/${page ? '?page=' + page : ''}`);
        noInitialResults =  true;
      }
    }

    let blogs = response.data,
          isEmpty = blogs.count === 0 &&
                    !query.user;
    if(isEmpty){
      response = await axios(`/api/blogs/${page ? '?page=' + page : ''}`);
      noInitialResults = true;
    }
    dispatch({type: GET_BLOG_LIST,
              payload: { ...response.data,
                         searchTerm: search || null,
                         page: query.page || 1,
                         noInitialResults} });
  }catch (error){
    console.log('error',error);
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

    if(images.length === 0){
      const addImageResponse = await axios.post('/api/blog_images/',
                                                { image: blog.images[0].imageFile,
                                                   blog: blog.id },
                                                authenticationHeaders);
    }else{
      // if the newImages in the request does not contain id of blog image,
      // patch the blog image with the new one.

      const newImagesHasPrevId = blog.images
                                     .map(e => e.id)
                                     .indexOf(images[0].id);

      const patchImageResponse = await axios.patch(`/api/blog_images/${images[0].id}/`,
                                                   { image: blog.images[0].imageFile },
                                                   authenticationHeaders);
    }

    dispatch({ type: GET_SUCCESS_MESSAGE,
               paylod: {successMessage: "Blog edited!"}});
    window.location.href = '/dashboard';
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}

export const getBlogRatings = (query) => async dispatch => {
  const {page, id} = query;

  try{
      const result = await axios(`/api/blogs/${id}/ratings/?page=${page}`);
      console.log("ratings data", result.data);
      dispatch({type: GET_BLOG_RATINGS, payload: {...result.data}});
  }catch(error){
      dispatch({type: GET_ERRORS,
                payload: error});
  }
}
