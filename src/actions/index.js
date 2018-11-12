import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api/';
const API_KEY = '?key=katinha123';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}posts/${id}${API_KEY}`)
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  }
}

// vanilla redux expects us to return an action which is plain JS object
// using redux-thunk for async action, we have a possibility to return a plain JS function instead of object
//
// export function fetchPost() {
//   const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
// dispatch function is like a pipe so if we send an action it is going to be sent to all of our different reducers
//   return (dispatch) => {
//      request.then(({data}) => {
//          dispatch({type: 'FETCH_POST', payload: data})
//      });
//   };
// }