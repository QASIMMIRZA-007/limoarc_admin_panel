import { MedicineForm } from "components/Common/MedicineForm"

import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
class MedicineModal extends React.Component {
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
        <Button
          className="whitespace-nowrap h-[40px]"
          color="primary"
          onClick={this.toggle}
        >
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
          <MedicineForm
            getAllMedicine={this?.props?.getAllMedicine}
            toggle={this.toggle}
            editData={this?.props?.item}
          />
        </Modal>
      </div>
    )
  }
}

export default MedicineModal
