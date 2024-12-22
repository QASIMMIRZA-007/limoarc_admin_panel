import React, { useEffect, useRef, useState } from "react"
import "./ChatUsers.scss"
import { SearchIcon } from "../../../assets"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import ProfileIcon from "../../../assets/userProfile.svg"
import CircularProgress from "@mui/material/CircularProgress"

function ChatUsers({
  selectedChat,
  setSelectedChat,
  setShowMessagesBox,
  allChats,
  notifications,
  markAllAsRead,
  setMessageLimiter,
  messageLimit,
  messageLoad,
  setMessageLoader,
  totalMessage,
}) {
  const isDesktop = useMediaQuery({ query: "(min-width: 760px)" })
  const onlineUsers = useSelector(
    state => state?.onlineUsers?.onlineUsers || []
  )
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

  const notificationCountRenderer = chatId => {
    let count = 0
    notifications
      .filter(e => e?.chatId === chatId)
      .forEach(notification => {
        if (!notification?.isRead) count++
      })
    return count
  }

  useEffect(() => {
    if (selectedChat?._id && notificationCountRenderer(selectedChat?._id) > 0) {
      markAllAsRead()
    }
  }, [notifications, selectedChat?._id])

  const onSearchChat = e => {
    const value = e.target.value
    const filtered = allUsers.filter(user => {
      return (
        user?.patient?.first_name.toLowerCase().includes(value.toLowerCase()) ||
        user?.patient?.last_name.toLowerCase().includes(value.toLowerCase())
      )
    })

    setAllUsersFiltered(filtered)
  }

  console.log("Filter user", allUsersFiltered)

  return (
    <div className="all-chat-users-main-container-patient-messages">
      <div className="chat-users-search-filter-container">
        <div className="search-input-container">
          <img src={SearchIcon} alt="search-icon" />
          <input
            type="text"
            placeholder="Search a user..."
            onChange={onSearchChat}
          />
        </div>
      </div>
      <div className="chat-users-container">
        {allUsersFiltered?.length > 0 ? (
          [
            ...allUsersFiltered.filter(
              user =>
                user?.booking?.[0]?.booking_status === "upcoming" &&
                !user?.booking?.[0]?.doctor?.user_id
            ),
            ...allUsersFiltered.filter(
              user =>
                !(
                  user?.booking?.[0]?.booking_status === "upcoming" &&
                  !user?.booking?.[0]?.doctor?.user_id
                )
            ),
          ].map((user, index) => {
            return (
              <div
                className={`single-chat-user-container ${
                  selectedChat?._id === user?._id
                    ? "single-chat-user-active"
                    : ""
                }  ${
                  user?.booking?.[0]?.booking_status === "upcoming" &&
                  !user?.booking?.[0]?.doctor?.user_id
                    ? "single-chat-user-waiting"
                    : ""
                }  `}
                // visibility-component ${isVisible ? 'visible' : 'not-visible'}
                // ref={componentRef}
                onClick={() => onSelectChat(user)}
              >
                {user?.booking?.[0]?.booking_status === "upcoming" &&
                  !user?.booking?.[0]?.doctor?.user_id && (
                    <p className="new-chat-user">New</p>
                  )}
                <div className="single-chat-user-left">
                  <img
                    src={user?.patient?.profile_image || ProfileIcon}
                    alt={user?.patient?.profile_image}
                  />
                </div>
                <div className="single-chat-user-right">
                  <h4>{user?.booking[0]?.category_id?.category_name}</h4>
                  <h5>
                    {user?.patient?.first_name + " " + user?.patient?.last_name}
                  </h5>
                  <div className="side-by-side-elements">
                    <div className="last-message-container">
                      <span className="last-message-text-span">
                        {user?.last_message?.sender === appUser?.user_id
                          ? "You:  "
                          : `${user?.patient?.first_name}:  `}

                        {/* {user?.last_message?.file?.url && <DetailImg />} */}
                        <i>
                          {" "}
                          {user?.last_message?.message ||
                            (user?.last_message?.file?.url && "Attachment") ||
                            "Tap to message."}
                        </i>
                      </span>
                    </div>
                    {notificationCountRenderer(user?._id) > 0 ? (
                      <span className="unread-status">
                        Unread ({notificationCountRenderer(user?._id)})
                      </span>
                    ) : (
                      <span>
                        {user?.last_message?.date
                          ? new Date(
                              user?.last_message?.date
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : null}
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

        {allUsersFiltered?.length > 0 && (
          <>
            {messageLoad ? (
              <p className="load">Loading ...</p>
            ) : totalMessage == allUsers.length ? (
              <p className="text-dark text-center m-auto">No More</p>
            ) : (
              <p
                onClick={() => setMessageLimiter(messageLimit + 1)}
                className="load"
              >
                Load More
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ChatUsers
