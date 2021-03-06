import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PopupSuccess = ({ open, handleClose, languageText }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Fragment>
        <DialogTitle id='alert-dialog-title'>{languageText.modal.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {languageText.modal.description}
          </DialogContentText>
        </DialogContent>
      </Fragment>
      <DialogActions>
        <Button
          onClick={handleClose}
          color='primary'
        >
          {languageText.buttons.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupSuccess;
