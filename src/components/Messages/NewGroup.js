import React from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
import "./GroupSettings.scss"
import { useState } from "react"
import ProfileIcon from "../../assets/userProfile.svg"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"

const NewGroup = ({
  isOpen,
  setIsOpen,
  doctors,
  receptionists,
  onSaveGroup,
}) => {
  const user = useSelector(state => state.auth?.adminData)
  const [selectedUsers, setSelectedUsers] = useState([user?.user_id])
  const [groupName, setGroupName] = useState("")
  const [fileKey, setFileKey] = useState(0)
  const [fileToSend, setFileToSend] = useState(null)
  const [fileToShow, setFileToShow] = useState(null)
  const [searchedText, setSearchedText] = useState("")
  const [addGroupMembersOpen, setaddGroupMembersOpen] = useState(false)

  const addUser = userId => {
    setSelectedUsers([...selectedUsers, userId])
  }
  const removeUser = userId => {
    setSelectedUsers(selectedUsers.filter(e => e !== userId))
  }

  const handleSaveGroup = async () => {
    if (groupName?.trim() === "") {
      return Swal.fire("Group name is required", "Try again", "error")
    } else if (selectedUsers.length < 1) {
      return Swal.fire("Please select at least one user.", "Try again", "error")
    }
    const res = await onSaveGroup({
      name: groupName,
      users: selectedUsers,
      profile_image: fileToSend || "",
    })

    if (res?.status) {
      setIsOpen(false)
    }
  }

  const onAddMembersHandler = () => {
    setaddGroupMembersOpen(true)
  }

  const closeModalHandler = () => {
    setSelectedUsers([user?.user_id])
    setGroupName("")
    setFileKey(0)
    setFileToSend(null)
    setFileToShow(null)
    setSearchedText("")
    setaddGroupMembersOpen(false)
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={closeModalHandler}
      size="lg"
      style={{ maxWidth: "400px", width: "100%" }}
    >
      <ModalHeader toggle={closeModalHandler}>{"Group settings"}</ModalHeader>
      <div className="group-settings-modal-container">
        <div className="side-by-side-inputs">
          <div className="inputs-main-container">
            <div className="group-profile-icon">
              <img src={fileToShow || ProfileIcon} />

              <button className="upload-button">
                <label htmlFor="group-profile-input">Upload</label>
                <input
                  id="group-profile-input"
                  key={fileKey}
                  type="file"
                  hidden
                  style={{ display: "none" }}
                  onChange={e => {
                    console.log(e.target.files[0])
                    if (
                      e.target?.files[0]?.type.split("/")[0] === "image" &&
                      e.target?.files[0]?.size < 5000000
                    ) {
                      setFileToSend(e.target.files[0])
                      setFileKey(prevKey => prevKey + 1)
                      setFileToShow(URL.createObjectURL(e.target.files[0]))
                      return
                    }
                    return Swal.fire(
                      `Only images are allowed`,
                      "Images should be less than 1mb.",
                      "error"
                    )
                  }}
                />
              </button>
            </div>

            <div className="inputs-container">
              {/* <label htmlFor="group-name">Group name</label> */}
              <input
                id="group-name"
                type="text"
                placeholder="Group name"
                onChange={e => setGroupName(e.target.value)}
                value={groupName}
              />
            </div>
          </div>
        </div>
        <div className="group-members-main-container">
          <h6>Choose group members</h6>

          <div className="inputs-container">
            <input
              id="search-users"
              type="text"
              placeholder="Search members..."
              onChange={e => setSearchedText(e.target.value)}
              className="search-input"
              value={searchedText}
            />
            {!addGroupMembersOpen ? (
              <button onClick={onAddMembersHandler}>Add Members</button>
            ) : (
              <button onClick={() => setaddGroupMembersOpen(false)}>
                See Members
              </button>
            )}
          </div>

          <div
            className="group-members-container"
            style={{ height: "calc(100vh - 480px)" }}
          >
            {(!addGroupMembersOpen
              ? [...doctors, ...receptionists].filter(el =>
                  selectedUsers?.some(user => user === el?.user_id?._id)
                )
              : [...doctors, ...receptionists].filter(
                  el => !selectedUsers?.some(user => user === el?.user_id?._id)
                )
            )
              ?.filter(el =>
                `${el?.first_name} ${el?.last_name}`
                  .toLowerCase()
                  .includes(searchedText?.toLowerCase())
              )
              .map((el, index) => (
                <div key={el?._id} className="group-member-container">
                  <div className="single-inner-left">
                    <img
                      src={el?.profile_image || ProfileIcon}
                      alt={`Profile of ${el?.first_name} ${el?.last_name}`}
                    />
                    <div>
                      <h5>{`${el?.first_name} ${el?.last_name}`}</h5>
                      <p>
                        {el?.doctor_status === true ||
                        el?.doctor_status == false
                          ? "Doctor"
                          : "Receptionist"}
                      </p>
                    </div>
                  </div>
                  {!selectedUsers?.includes?.(el?.user_id?._id) ? (
                    addGroupMembersOpen && (
                      <button
                        className="add-button"
                        onClick={() => addUser(el?.user_id?._id)}
                      >
                        Add
                      </button>
                    )
                  ) : (
                    <button
                      className="remove-button"
                      onClick={() => removeUser(el?.user_id?._id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="chat-setting-actions">
          {
            <button className="save-group-button" onClick={handleSaveGroup}>
              Save Group
            </button>
          }
        </div>
      </div>
    </Modal>
  )
}

export default NewGroup
