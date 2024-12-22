import { PharmaciesForm } from "components/Common/PharmaciesForm"
import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
import "./popupmodal.css"
class PharmaciesModal extends React.Component {
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
          style={{ maxWidth: "700px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>

          <PharmaciesForm
            toggle={this.toggle}
            getAllPharmacies={this.props?.getAllPharmacies}
          />
        </Modal>
      </div>
    )
  }
}

export default PharmaciesModal
