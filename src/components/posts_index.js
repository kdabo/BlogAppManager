import _ from "lodash";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts } from "../actions";

class PostsIndex extends Component {

// the instant I know user is going to see this component I want to reach out to API and fetch the data by calling action creator
// I want to do this as soon as the component is rendered in the screen because fetching data is asynchronous operation
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                  <Link to={`/posts/${post.id}`} >
                    {post.title}
                  </Link>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators ({fetchPosts}, dispatch );
// }

// consume data by application level state by using mapStateToProps
function mapStateToProps(state) {
    return { posts: state.posts };
}

// by directly passing actions to connect function instead of function is the same as using mapDispatchToProps function
// but there are def times when using mapDispatchToProps function is better idea like for example computation on how you want to call action creator ahead of time
// mapDispatchToProps is still occurring in this case but connect is taking care of it for me
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);