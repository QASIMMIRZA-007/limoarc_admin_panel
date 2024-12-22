import { Profile } from "components/Common/Profile"
import { ReceptionModal } from "components/Common/ReceptionModal"
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
class PopupModal extends React.Component {
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
          style={{ marginTop: "10px", marginBottom: "10px" }}
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
          {this.props.isTrue ? (
            <ReceptionModal
              role={this.props.role}
              setRender={this.props.setRender}
              toggle={this.toggle}
              getAllReceptions={this.props.getAllReceptions}
            />
          ) : (
            <>
              <Profile
                role={this.props.role}
                drType={this.props.drType}
                toggle={this.toggle}
                getAllDoctors={this.props?.getAllDoctors}
              />
            </>
          )}
        </Modal>
      </div>
    )
  }
}

export default PopupModal
