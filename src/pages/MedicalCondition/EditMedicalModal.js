import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
import { EditMedicalForm } from "./EditMedicalForm"
class EditMedicalModal extends React.Component {
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
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>

          <EditMedicalForm
            getDeseaseConditionFun={this.props.getDeseaseConditionFun}
            toggle={this.toggle}
            item={this.props.editData}
          />
        </Modal>
      </div>
    )
  }
}

export default EditMedicalModal
