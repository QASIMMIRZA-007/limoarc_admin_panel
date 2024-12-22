import React, { useState } from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
import { ChnagePasswordForm } from "./ChnagePasswordForm"
import Tooltip from '@mui/material/Tooltip';
  class ChnagePasswordModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    document.body.style.overflow = this.state.modal ? "hidden" : null
    return (
      <div>
          {/* <Tooltip  title="Change password" arrow> */}
            <Button style={{ padding: 0 }} color="" onClick={this.toggle}>
              {this.props.buttonLabel}
            </Button>
          {/* </Tooltip> */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>

          <ChnagePasswordForm
            getAllDoctors={this.props.getAllDoctors}
            CloseModel={this.toggle}
            item={this.props.editData}
          />
        </Modal>
      </div>
    )
  }
}

export default ChnagePasswordModal
