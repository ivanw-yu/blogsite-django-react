import axios from 'axios';

import { GET_PROFILE,
         GET_PROFILE_LIST,
         GET_BLOG,
         GET_BLOG_LIST,
         POST_BLOG,
         GET_ERRORS } from './types'


export const getProfile = id => async dispatch => {
  try{
    console.log("getting profile---@@@@@")
    const profile = await axios.get(`/api/profiles/${id}/`);
    dispatch({type: GET_PROFILE, payload: profile.data});
  }catch(error){
    dispatch({type: GET_ERRORS, payload: error})
  }
}

export const getProfiles = (page=0) => async dispatch =>{
  try{
    const profiles = await axios(`/api/profiles/`);
    console.log("Profiles: ", profiles);
    dispatch({type: GET_PROFILE_LIST, payload: profiles.data})
  }catch(error){
    dispatch({type: GET_ERRORS, payload: error})
  }
}

export const getBlog = id => async dispatch => {
  try{
    //console.log("getting profile---@@@@@")
    const blog = await axios.get(`/api/blogs/${id}/`);
    dispatch({type: GET_BLOG, payload: blog.data});
  }catch(error){
    dispatch({type: GET_ERRORS, payload: error})
  }
}

export const getBlogs = (page=0) => async dispatch =>{
  try{
    const blogs = await axios(`/api/blogs/`);
    console.log("BLOGS.DATA", blogs.data);
    dispatch({type: GET_BLOG_LIST, payload: blogs.data})
  }catch(error){
    dispatch({type: GET_ERRORS, payload: error})
  }
}
