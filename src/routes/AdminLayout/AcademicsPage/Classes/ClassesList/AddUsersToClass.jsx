import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

class AddUsersToClass extends PureComponent {
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

    const { children, submit } = this.props;
    return (
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Przypisz uczniów do klasy'}
        </DialogTitle>
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

AddUsersToClass.defaultProps = {
  submit: () => {},
};

export default AddUsersToClass;
