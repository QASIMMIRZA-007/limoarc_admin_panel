import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"

import { EditMedicineForm } from "./EditMedicineForm.jsx"
class EditMedicineModal extends React.Component {
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

          <EditMedicineForm
            getAllMedicine={this?.props?.getAllMedicine}
            toggle={this.toggle}
            item={this.props.editData}
          />
        </Modal>
      </div>
    )
  }
}

export default EditMedicineModal
