import { GET_RATINGS,
         GET_ERRORS } from './types';

import axios from 'axios';


// query should be an object, having blogId and the page.
// get /api/blogs/<pk>/?page=__
export const getRatings = (query) => async dispatch => {
    const {page, blogId} = query;
    console.log("HERE",query)
    try{
      const response = await axios(`/api/blogs/${blogId}/ratings/?page=${page}`);
      console.log('response.data: ',response.data)
      dispatch({ type: GET_RATINGS,
                 payload: response.data});
    }catch(error){
      dispatch({type: GET_ERRORS,
                payload: error});
    }
}
