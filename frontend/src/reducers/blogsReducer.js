import { GET_BLOG,
         GET_BLOG_LIST} from '../actions/types';

const initialState = {
  blogs: null,
  blog: null
}
export default function(state = initialState, action){
  switch(action.type){
    case GET_BLOG:
      return {...state,
              blog: action.payload};
    case GET_BLOG_LIST:
      console.log("GET_BLOG_LIST", action.payload)
      return {...state,
              blogs: action.payload};
    default:
      return state;
  }
}
