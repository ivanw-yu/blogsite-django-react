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
    const response = axios.post('/api/blogs/',
                                blog,
                                authenticationHeaders);
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
    const response = axios.patch(`/api/blogs/${blog.id}/`,
                                 blog,
                                 authenticationHeaders);
    dispatch({ type: GET_SUCCESS_MESSAGE,
               paylod: {successMessage: "Blog edited!"}});
    history.push("/dashboard");
  }catch(error){
    dispatch({type: GET_ERRORS,
              payload: error});
  }
}
