import { AllergyForm } from "components/Common/AllergyForm"
import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
class AllergyModal extends React.Component {
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
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <AllergyForm
            getAllAllergy={this.props.getAllAllergy}
            toggle={this.toggle}
          />
        </Modal>
      </div>
    )
  }
}

export default AllergyModal
