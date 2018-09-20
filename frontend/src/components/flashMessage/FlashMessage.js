import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetFlashMessage } from '../../actions/flashMessageActions';

class FlashMessage extends Component{

  // after the flash message, is displayed, reset it.
  componentDidMount(){
    setTimeout( () => resetFlashMessage(), 3000);
  }

  render(){
    const { flashMessage } = this.props;

    // check if flashMessage global state is part of the component
    // props and if there is an error or success message. If not,
    // return null to render nothing, otherwise, render the
    // div containing the flash message.
    return ( flashMessage &&
             ( flashMessage.error ||
               flashMessage.success ||
               null )
            ) && (
      <div className = "flash-message">
        { flashMessage.error || flashMessage.success }
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {flashMessage: state.flashMessage}
);

export default connect(mapStateToProps,
                       { resetFlashMessage } )(FlashMessage)
