import _ from "lodash";
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from "../actions";

//excepts previous state and action
export default function (state = {}, action) {
    switch (action.type) {
      case DELETE_POST:
        return _.omit(state, action.payload);
      case FETCH_POST:
        // because I want to make sure I don't refetch the data rather add the blogpost to the existing state

        // es 5
        // const post = action.payload.data;
        // const newState = { ...state };
        // newState[post.id] = post;
        // return newState

        // es 6
        // by placing square brackets, we are not creating array, rather we are using key interpolation meaning
        // whatever [action.payload.data.id] variable is, make a new key on this object using action.payload.data value
        return { ...state, [action.payload.data.id]: action.payload.data };
      case FETCH_POSTS:
        return _.mapKeys(action.payload.data, "id");
    default:
        return state;
    }
}