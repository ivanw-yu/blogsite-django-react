import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getBlogById,
         postBlog } from '../../actions/blogActions';
import DashboardBlogTextArea from './DashboardBlogTextArea';
import TextInputGroup from '../commons/TextInputGroup';


/*
  DashboardBlogForm is a child component of DashboardBlogFormArea.
  A blog prop will be passed to DashboardBlogForm,
  which contains the
*/
class DashboardBlogForm extends Component{

  constructor(props){
    super(props);
    //console.log("BLOGFORM PROPS",props, this.props)
    this.state = {
      title: props.blog.title || '',
      content: props.blog.content || '',
      images: props.blog.images || []
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    console.log("componentDidMount", this.props);
    // this.setState({
    //   title: this.props.title,
    //   content: this.props.content,
    //   images: this.props.images
    // });
    // if(this.props.match.params.id)
    //   this.props.getBlogById(this.props.match.params.id);
  }

  componentWillUnmount(){
    console.log("@##@#@#@#UNMOUNTING UNMOUNTING UNMOUNTING@@!#@!#!#@!#");
  }

  // this will execute when changing urls from /dashboard/blogs/create to
  // /dashboard/blogs/edit/:id and vice versa. In such case, this component
  // won't unmount (i.e. componentWillMount() doesn't trigger), this is why
  // reseting the states in componentDidUpdate() is necessary this way.
  componentDidUpdate(prevProps){
    if(prevProps.edit == true && this.props.edit == false){
      this.setState({title: '',
                     content: '',
                     images: []});
    } else if (prevProps.edit == false && this.props.edit == true ){
      this.setState({title: this.props.title,
                     content: this.props.content,
                     images: this.props.images});
    }
  }

  // componentDidUpdate(){
  //   // if the blog does not belong to the user, then redirect to the dashboard.
  //   if((this.props.blog) &&
  //       this.props.blog.user.id != this.props.auth.user.id){
  //     this.props.history.push("/dashboard");
  //   }
  // }

  onChange(event){
    this.setState({ [event.target.name] : event.target.value })
  }

  onSubmit(event){
    event.preventDefault();

    // images upload not implemented yet.
    const blog = {
      title: this.state.title,
      content: this.state.content
    };

    this.props.postBlog(blog, this.props.history);
  }

  // set props received from global redux store to local state
  // static getDerivedStateFromProps(nextProps, prevProps){
  //   console.log("NEXTPROPS:",nextProps);
  //   if(nextProps.blog)
  //     this.setState({title: nextProps.blog.title,
  //                    content: nextProps.blog.content})
  // }

  render(){

    return (
      <div className = "dashboard-form-div">
        <h1> { this.props.edit ? `Edit "${this.state.title}".` : 'Upload New Blog'} </h1>
        <form onSubmit = {this.onSubmit} >
          <TextInputGroup name = "title"
                          label = "title"
                          onChange = {this.onChange}
                          value = { this.state.title } />
          <DashboardBlogTextArea name= "content"
                                 content={ this.state.content }
                                 onChange = {this.onChange} />
          <button> { this.props.edit ? 'Save' : 'Upload' } </button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => (
//   { blog: state.blogs.blog,
//     user: state.auth.user}
// );

export default withRouter(connect(null,
                                  { getBlogById,
                                     postBlog })(DashboardBlogForm));
