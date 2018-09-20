import { RESET_FLASH_MESSAGE } from './types';

export const resetFlashMessage = () => dispatch => {
  dispatch({ type: RESET_FLASH_MESSAGE } );
};
