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
import AddCondition from "components/Common/AddCondition"
class AddNewConModal extends React.Component {
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
          color=""
          onClick={this.toggle}
          style={{ fontSize: "15px", color: "#a18552", fontWeight: "700" }}
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
          <AddCondition
            toggle={this.toggle}
            item={this.props.item}
            setRender={this.props.setRender}
            getDeseaseConditionFun={this.props.getDeseaseConditionFun}
          />
        </Modal>
      </div>
    )
  }
}

export default AddNewConModal
