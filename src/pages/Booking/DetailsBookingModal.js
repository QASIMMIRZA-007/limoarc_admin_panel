import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
import DetailsBookingForm from "./DetailsBookingForm"
import DetailsDoctorForm from "./DetailsBookingForm"
import DetailsPage from "pages/DetailPage/DetailPage"
// import { EditDoctorForm } from "./EditDoctorForm"
class DetailsBookingModal extends React.Component {
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
          {/* <DetailsPage 
  CloseModel={this.toggle}
  item={this.props.editData}
/> */}
          <ModalHeader toggle={this.toggle}></ModalHeader>

          <DetailsBookingForm
            CloseModel={this.toggle}
            item={this.props.editData}
          />
        </Modal>
      </div>
    )
  }
}

export default DetailsBookingModal
