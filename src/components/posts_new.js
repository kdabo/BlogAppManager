import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

import { createPost } from "../actions";

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories'
  },
  content: {
    type: 'textarea',
    label: 'Post Content'
  }
};

class PostsNew extends Component {
    // by convention we are passing field object which contains event handlers and props that are going to
    // make sure the field knows about change on input
    renderField (field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : null}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    // by doing  {...field.input} I say that field is an object and that I want all its properties to be communicated as props
                    {...field.input}
                />
                <div className="text-help">
                {   // one more property that is added automatically to the field object from validate function (responsible for error handling)
                    // touch is a property coming from redux form
                    touched ? error : ''
                }
                </div>
            </div>
        )
    }

    onSubmit(values) {
        // create an action creator
        // history.push is a property coming from router and says go back to the route of the application
        // and only do this navigation after the post has been created
        // post is being created at the exact same time when fetching the lists of posts
        // so in order not to navigate to soon
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            // Redux form is responsible for the state and validation of the form
            // it is not responsible for taking and saving data and posting data as well as display of the form
            // handleSubmit takes a function that I define. It is going to run redux side of things like validate the form
            // redux-form says if everything is good, and ready to be submitted, calls the function I defined and passes the values
            // bind to make sure this === component
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    // by specifying name here it is specified which piece of state this field is going to produce
                    // field doesn't know how to show himself on the screen, only how to interact with ReduxForm
                    // field is like data record keeper
                    // so field needs a function to create jsx
                    // here the function renderField is just referenced because it will be called later by
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    //validate the input from 'values'
    // add a property to errors object
    _.each(FIELDS, (type, field) => {
      if (!values[field]) {
        errors[field] = `Enter a ${field}`;
      }
    });
    return errors;

}

// wiring up Redux Form helper to PostsNew component
// by that tons of additional properties are added that are passed to my components
// so const { handleSubmit } = this.props; is one of these properties, passed on behalf of Redux form
// reduxForm helper is used much like connect helper to wrap PostsNewComponent
// using it, direct communication of the form and reducer is enabled
export default reduxForm({
    // with this string being unique I ensure that if I show multiple different forms at the same time, reduxForm will handle all of this forms correctly
    // make sure it is unique so it doesn't share its state with any other form on the page
    form: 'PostsNewForm',
    fields: _.keys(FIELDS),
    validate
})(
    connect(null, {createPost})(PostsNew)
);