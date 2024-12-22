import { Profile } from "components/Common/Profile"
import MedicalCondition from "components/Common/MedicalCondition"
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
class MedConditionModal extends React.Component {
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
          <MedicalCondition
            getDeseaseFun={this.props.getDeseaseFun}
            CloseModel={this.toggle}
          />
        </Modal>
      </div>
    )
  }
}

export default MedConditionModal
