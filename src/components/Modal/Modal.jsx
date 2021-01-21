import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.open,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.setClick(this.toggleModal);
  }

  toggleModal() {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const { isOpen } = this.state;

    const { children, submit, title, size = 'sm' } = this.props;
    return (
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth={size}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children({ toggleModal: this.toggleModal })}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.toggleModal} color="primary">
            Porzuć
          </Button>
          <Button onClick={submit} color="primary" autoFocus>
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Modal.defaultProps = {
  submit: () => {},
  title: null,
};

export default Modal;
