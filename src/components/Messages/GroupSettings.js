import React, { useEffect } from "react"
import { Button, Modal, ModalHeader } from "reactstrap"
import "./GroupSettings.scss"
import { useState } from "react"
import ProfileIcon from "../../assets/userProfile.svg"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"
import { set } from "lodash"

const GroupSettings = ({
  doctors,
  receptionists,
  onSaveGroup,
  onlyPreview,
  selectedChat,
  groupEdit,
  setGroupEdit,
  setOnlyPreview,
  onDeleteGroup,
}) => {
  const user = useSelector(state => state.auth?.adminData)
  const [selectedUsers, setSelectedUsers] = useState(
    groupEdit
      ? selectedChat?.users.map(el => el?._id) || []
      : selectedChat?.users || []
  )
  const [groupName, setGroupName] = useState(selectedChat?.name)
  const [fileKey, setFileKey] = useState(0)
  const [fileToSend, setFileToSend] = useState(null)
  const [fileToShow, setFileToShow] = useState(selectedChat?.profile_image)
  const [searchedText, setSearchedText] = useState("")
  const [addGroupMembersOpen, setaddGroupMembersOpen] = useState(false)

  useEffect(() => {
    setSelectedUsers(selectedChat?.users.map(el => el?._id))
    setGroupName(selectedChat?.name)
    setFileToShow(selectedChat?.profile_image)
  }, [groupEdit, onlyPreview, selectedChat])

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
      setaddGroupMembersOpen(false)
      setGroupEdit(false)
      setOnlyPreview(false)
    }
  }

  const handleEdit = () => {
    setGroupEdit(true)
  }

  const onAddMembersHandler = () => {
    setaddGroupMembersOpen(true)
  }

  const closeModalHandler = () => {
    setSelectedUsers(selectedChat?.users.map(el => el?._id))
    setGroupName(selectedChat?.name)
    setFileKey(0)
    setFileToSend(null)
    setFileToShow(selectedChat?.profile_image)
    setSearchedText("")
    setaddGroupMembersOpen(false)
    setGroupEdit(false)
    setOnlyPreview(false)
  }

  return (
    <Modal
      isOpen={onlyPreview}
      toggle={closeModalHandler}
      size="lg"
      style={{ maxWidth: "400px", width: "100%" }}
    >
      <ModalHeader toggle={closeModalHandler}>
        {!groupEdit
          ? groupName +
            " " +
            `(${
              [...doctors, ...receptionists].filter(el =>
                selectedChat?.users?.some(
                  user => user?._id === el?.user_id?._id
                )
              )?.length
            } members)`
          : "Group settings"}
      </ModalHeader>
      <div className="group-settings-modal-container">
        <div className="side-by-side-inputs">
          {groupEdit && (
            <div className="inputs-main-container">
              <div className="group-profile-icon">
                <img src={fileToShow || ProfileIcon} />
                {groupEdit && (
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
                )}
              </div>
              {groupEdit && (
                <div className="inputs-container">
                  {/* <label htmlFor="group-name">Group name</label> */}
                  <input
                    id="group-name"
                    type="text"
                    placeholder="Group name"
                    onChange={e => setGroupName(e.target.value)}
                    disabled={onlyPreview}
                    value={groupName}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="group-members-main-container">
          {(groupEdit || addGroupMembersOpen) && <h6>Choose group members</h6>}

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
              groupEdit && (
                <button onClick={onAddMembersHandler}>Add Members</button>
              )
            ) : (
              <button onClick={() => setaddGroupMembersOpen(false)}>
                See Members
              </button>
            )}
          </div>

          <div
            className="group-members-container"
            style={{ ...(groupEdit && { height: "calc(100vh - 480px)" }) }}
          >
            {(!addGroupMembersOpen
              ? [...doctors, ...receptionists].filter(el =>
                  selectedChat?.users?.some(
                    user => user?._id === el?.user_id?._id
                  )
                )
              : [...doctors, ...receptionists].filter(
                  el =>
                    !selectedChat?.users?.some(
                      user => user?._id === el?.user_id?._id
                    )
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
                  {(addGroupMembersOpen || groupEdit) &&
                    (!selectedUsers?.includes?.(el?.user_id?._id)
                      ? addGroupMembersOpen && (
                          <button
                            className="add-button"
                            onClick={() => addUser(el?.user_id?._id)}
                          >
                            Add
                          </button>
                        )
                      : groupEdit && (
                          <button
                            className="remove-button"
                            onClick={() => removeUser(el?.user_id?._id)}
                          >
                            Remove
                          </button>
                        ))}
                </div>
              ))}
          </div>
        </div>

        <div className="chat-setting-actions">
          {groupEdit || addGroupMembersOpen ? (
            <button className="save-group-button" onClick={handleSaveGroup}>
              Save Group
            </button>
          ) : (
            <>
              <button className="save-group-button" onClick={handleEdit}>
                Edit Group
              </button>
              <button className="delete-group-button" onClick={onDeleteGroup}>
                Delete Group
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default GroupSettings
