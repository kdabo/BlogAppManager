import { combineReducers } from 'redux';

//rename reducer property in case we import something else called reducer which is too generic so we set alias ahead of time
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  post: PostsReducer,
  form: formReducer
});

export default rootReducer;
