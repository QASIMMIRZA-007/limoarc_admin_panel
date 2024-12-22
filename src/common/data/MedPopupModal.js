import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

class MedPopupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg" style={{maxWidth:"700px", width:"100%"}}>
          <ModalHeader toggle={this.toggle} className='text-[18px] font-Medium text-[#0D0D0D]'>New disease group</ModalHeader>
          <ModalBody>
            <Label >
              Group name
            </Label>
            <Input 
            type='text'
            placeholder='e.g. Men’s health'/>
           
          </ModalBody>
          <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>

            <Button color="primary" onClick={this.toggle}>Add & Save</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MedPopupModal;