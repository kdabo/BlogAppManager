import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";

class PostShow extends Component {

  componentDidMount() {
    //because the user might enter the application with the certain URL with the id of the post,
    // separate data for this particular component should be fetched
    // this.props.match.params.id is provided directly by React Router - match is top level property.
    // params object list all wild cards properties that exist inside given URL
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link className="btn btn-primary" to="/">Back to Posts</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete post</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// mapStateToProps is used to select little piece of state, and can have two arguments
// the first one is always application state, the second one can be is ownProps
// this technique here is just to select one particular post
function mapStateToProps({posts}, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);