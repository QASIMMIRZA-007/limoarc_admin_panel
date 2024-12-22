import React, { useEffect, useState } from "react"
import "./ChatUsers.scss"
import { SearchIcon } from "../../assets"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import GroupSettings from "./GroupSettings"
import ProfileIcon from "../../assets/userProfile.svg"

function ChatUsers({
  selectedChat,
  setSelectedChat,
  setShowMessagesBox,
  allChats,
  doctors,
  receptionists,
  onSaveGroup,
  isOpen,
  setIsOpen,
  toggle,
  onlyPreview,
  setOnlyPreview,
  groupEdit,
  setGroupEdit,
}) {
  const isDesktop = useMediaQuery({ query: "(min-width: 760px)" })
  const onlineUsers = useSelector(state => state.onlineUsers?.onlineUsers || [])
  const appUser = useSelector(state => state.auth.adminData)
  const [allUsers, setAllUsers] = useState(allChats || [])
  const [allUsersFiltered, setAllUsersFiltered] = useState(allChats || [])

  const onSelectChat = chat => {
    setSelectedChat(chat)
    setShowMessagesBox(true)
  }

  useEffect(() => {
    if (allChats?.length > 0 && isDesktop) {
      if (!selectedChat) {
        setSelectedChat(allChats[0])
      } else {
        const found = allChats.find(e => e._id === selectedChat?._id)
        setSelectedChat(found || allChats[0])
      }
    }
    setAllUsers(allChats)
    setAllUsersFiltered(allChats)
  }, [allChats])

  const onSearchChat = e => {
    const value = e.target.value
    const filtered = allUsers?.filter(user => {
      return (
        user?.name?.toLowerCase()?.includes(value?.toLowerCase()) ||
        user?.name?.toLowerCase()?.includes(value?.toLowerCase())
      )
    })

    setAllUsersFiltered(filtered)
  }

  return (
    <div className="all-chat-users-main-container">
      <div className="chat-users-search-filter-container">
        <div className="search-input-container">
          <img src={SearchIcon} alt="search-icon" />
          <input
            type="text"
            placeholder="Search a conversation..."
            onChange={onSearchChat}
          />
        </div>
      </div>
      <div className="add-conversation-container">
        <h5>Conversations</h5>
        <div
          className="add-conversation-button"
          onClick={() => {
            setIsOpen(true)
            setGroupEdit(false)
            setOnlyPreview(false)
          }}
        >
          +
        </div>
      </div>
      <div className="chat-users-container">
        {allUsersFiltered?.length > 0 ? (
          allUsersFiltered?.map((user, index) => {
            return (
              <div
                className={`single-chat-user-container ${
                  selectedChat?._id === user?._id
                    ? "single-chat-user-active"
                    : ""
                }  `}
                onClick={() => onSelectChat(user)}
              >
                <div className="single-chat-user-left">
                  <img
                    src={user?.profile_image || ProfileIcon}
                    alt={user?.profile_image}
                  />
                </div>
                <div className="single-chat-user-right">
                  <h5>{user?.name}</h5>
                  <div className="side-by-side-elements">
                    <div className="last-message-container">
                      <span className="last-message-text-span">
                        {!user?.last_message
                          ? ""
                          : user?.last_message?.sender === appUser?.user_id
                          ? "You:  "
                          : `${
                              user?.users?.find(
                                el => el?._id === user?.last_message?.sender
                              )?.first_name
                            }:  `}

                        {/* {user?.last_message?.file?.url && <DetailImg />} */}
                        <i>
                          {" "}
                          {user?.last_message?.message ||
                            (user?.last_message?.file?.url && "Attachment") ||
                            "Tap to message."}
                        </i>
                      </span>
                    </div>
                    {user?.last_message?.status &&
                    user?.last_message?.status !== "seen" &&
                    !user?.last_message?.read_by?.includes(appUser?.user_id) ? (
                      <span className="unread-status">Unread</span>
                    ) : (
                      <span>
                        {user?.last_message?.date
                          ? new Date(
                              user?.last_message?.date
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="no-chat-users-found">
            <h3>No users found.</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatUsers
