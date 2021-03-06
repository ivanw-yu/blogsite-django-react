import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getBlogById,
         postBlog,
         editBlog } from '../../actions/blogActions';
import DashboardBlogTextArea from './DashboardBlogTextArea';
import TextInputGroup from '../commons/TextInputGroup';


/*
  DashboardBlogForm is a child component of
  DashboardCreateBlogFormArea and DashboardEditBlogFormArea.
  Props that are passed from parent components are: blog, and
  edit (boolean, true for editing a blog, false for creating blog).
*/
class DashboardBlogForm extends Component{

  constructor(props){
    super(props);

    // initial states are either the passed in blog (if any)
    // or default values (empty string for title and content, empty
    // array for images).
    this.state = {
      title: props.blog ? props.blog.title : '',
      prevTitle: props.blog && props.blog.title, //used to display title
      content: props.blog ? props.blog.content : '',
      images: props.blog ? props.blog.image : []
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  onChange(event){
    this.setState({ [event.target.name] : event.target.value })
  }

  onSubmit(event){
    event.preventDefault();

    // images upload not implemented yet.
    const blog = {
      title: this.state.title,
      content: this.state.content,
      images: this.state.images
    };

    if( this.props.edit ){
      blog.id = this.props.blog.id;
      this.props.editBlog(blog, this.props.history);
    } else {
      this.props.postBlog(blog, this.props.history);
    }
  }

  render(){

    return (
      <div className = "dashboard-form-div">
        <h1> { this.props.edit ? `Edit "${this.state.prevTitle}".` : 'Upload New Blog'} </h1>
        <form onSubmit = {this.onSubmit} >
          <TextInputGroup name = "title"
                          label = "title"
                          onChange = {this.onChange}
                          value = { this.state.title } />
          <label>Upload Image</label><br />
          <input type="file"
                 name="image"
                 accept="image/*"
                 onChange={this.onImageChange} />
          <div id="preview" >
           {this.state.images && this.state.images.length && (
             <img src = { this.state.images[0].image || this.state.images[0].imageFile }
                  style={{width: '100px',
                          height: '100px'}}
                          />
           )}
          </div>
          <DashboardBlogTextArea name= "content"
                                 content={ this.state.content }
                                 onChange = {this.onChange} />
          <button> { this.props.edit ? 'Save' : 'Upload' } </button>
        </form>
      </div>
    );
  }

  onImageChange(event){
    var file = event.target.files[0];
    if(file){
      var fileReader = new FileReader();

      fileReader.onload = (e) => {
        console.log('images0: ', this.state.images[0]);

        // console.log(e.target.result);
        // var data = e.target.result.replace(/^data:image\/\w+;base64,/, "");
        // var buffer= new Buffer(data, 'base64');
        //console.log(buffer.toString());
        // document.getElementById('preview').innerHTML = '<img src = "' + e.target.result
        //                                              + '" style = "width: 100px; height: 100px" />';
        // only 1 image for now.
        this.setState({images: [{id: null, imageFile: e.target.result}]});
      }

      fileReader.readAsDataURL(file);
    }else{
      console.log('unable to read file');
    }
  }
}

DashboardBlogForm.defaultProps = {
  edit: false
};

// const mapStateToProps = (state) => (
//   { blog: state.blogs.blog,
//     user: state.auth.user}
// );

export default withRouter(connect(null,
                                  { getBlogById,
                                    postBlog,
                                    editBlog })(DashboardBlogForm));
