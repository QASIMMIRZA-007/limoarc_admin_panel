import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
import DetailsDoctorForm from "./DetailsDoctorForm"
import { EditDoctorForm } from "./EditDoctorForm"
class DetailsDoctorModal extends React.Component {
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
        <Button color="" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <DetailsDoctorForm
            CloseModel={this.toggle}
            item={this.props.editData}
          />
        </Modal>
      </div>
    )
  }
}

export default DetailsDoctorModal
