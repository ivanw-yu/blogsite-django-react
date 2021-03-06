import React, {Component} from 'react';

class DashboardBlogTextArea extends Component{

  render(){
    return (
      <div className = "dashboard-blog-textarea">
        <div className = "dashboard-blog-form-buttons-area">
          <button> Upload Image </button>
        </div>
        <label>Content</label>
        <br />
        <textarea className = "textarea-field"
                  name="content"
                  onChange={this.props.onChange}
                  value={this.props.content}></textarea>
      </div>
    )
  }
}

export default DashboardBlogTextArea;
