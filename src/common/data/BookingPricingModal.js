import { Profile } from "components/Common/Profile"
import BookingPricing from "components/Common/BookingPricing"
import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Form,
  Input,
} from "reactstrap"
import profileimg from "../../assets/fonts/profileimg.png"
import "./popupmodal.css"
class BookingPricingModal extends React.Component {
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
      <div className="ml-auto mr-20px">
        <Button
          style={{ whiteSpace: "nowrap" }}
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
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <BookingPricing
            getAllBooking={this.props.getAllBooking}
            CloseModel={this.toggle}
          />
        </Modal>
      </div>
    )
  }
}

export default BookingPricingModal
