import React, { useCallback, useEffect, useRef, useState } from "react"
import "./ChatBox.scss"

import ProfileIcon from "../../../assets/userProfile.svg"
import DotsIcon from "../../../assets/3dots.svg"

import socket from "../../facultyMessaging/socketConnection"
import { SearchIcon, FileIcon, ArrowLeftIcon, PDFIcon } from "../../../assets"
import { useSelector } from "react-redux"
import ReactLinkify from "react-linkify"
import CircularProgress from "@mui/material/CircularProgress"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { PICTURE_URL } from "../../../Services/Constants"
import { useMediaQuery } from "react-responsive"
import Swal from "sweetalert2"
import IconButton from "@mui/material/IconButton"

function ChatBox({
  selectedChat,
  setSelectedChat,
  setShowMessagesBox,
  allChats,
  setAllChats,
  setNotifications,
  notifications,
  messages,
  setMessages,
  filteredMessages,
  setFilteredMessages,
  isMessagesLoading,
  setIsMessagesLoading,
  getChatDetails,
}) {
  const onlineUsers = useSelector(
    state => state?.onlineUsers?.onlineUsers || []
  )
  const inboxRef = useRef()
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" })
  const user = useSelector(state => state.auth.adminData)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const [messageText, setMessageText] = useState("")
  const [fileToSend, setFileToSend] = useState(null)
  const [fileKey, setFileKey] = useState(0)

  const scrollToBottom = useCallback(() => {
    const container = inboxRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [selectedChat?._id])

  useEffect(() => {
    if (selectedChat?._id) {
      getChatDetails({ showLoader: true })

      socket.emit("join", { conversationId: selectedChat?._id })

      const handleChatMessage = payload => {
        console.log("incoming message", payload)
        if (payload?.chatId === selectedChat?._id) {
          setMessages(prev => [...prev, payload])
          setFilteredMessages(prev => [...prev, payload])

          setAllChats(prev =>
            prev.map(chat => {
              if (chat._id === selectedChat._id) {
                return {
                  ...chat,
                  last_message: payload,
                }
              } else {
                return chat
              }
            })
          )

          if (payload?.sender !== user?.user_id) {
            socket.emit("messageSeen", {
              conversationId: selectedChat?._id,
              messageId: payload?._id,
            })
          }
        }
        setAllChats(prev =>
          prev.map(chat => {
            if (chat._id === payload?.chatId) {
              return {
                ...chat,
                last_message: payload,
              }
            } else {
              return chat
            }
          })
        )
      }

      socket.on("chat", handleChatMessage)

      socket.on("notifications", async notice => {
        if (user?.user_id !== notice?.senderId) {
          console.log(notice, "message notice")
          if (notice.role === "doctor") {
            setNotifications(notice?.notifications)
          }
        }
      })

      return () => {
        socket.off("chat", handleChatMessage)
      }
    }
  }, [selectedChat?._id])

  useEffect(() => {
    scrollToBottom()
  }, [filteredMessages])

  const sendMessage = text => {
    socket.emit("chat", {
      conversationId: selectedChat?._id,
      text,
      senderId: user?.user_id,
      sender_role: "Admin",
    })
  }

  const sendFile = () => {
    socket.emit(
      "upload",
      fileToSend,
      fileToSend?.name,
      fileToSend.type,
      user?.user_id,
      selectedChat?._id,
      status => {
        console.log(status, "status")
      },
      "Admin"
    )
  }

  socket.on("messageSeen", payload => {
    const updatedMessages = messages.map(message => {
      if (message?._id === payload?._id) {
        return payload
      } else {
        return message
      }
    })
    setMessages(updatedMessages)
    setFilteredMessages(updatedMessages)
  })

  useEffect(() => {
    socket.emit("messageSeenAll", {
      conversationId: selectedChat?._id,
      userId: user?.user_id,
    })

    const handleSeenAll = payload => {
      setMessages(payload?.messages)
      setFilteredMessages(payload?.messages)
      setAllChats(prev => {
        return prev.map(chat => {
          if (chat._id === payload._id) {
            return {
              ...chat,
              last_message: payload?.messages?.[payload?.messages?.length - 1],
            }
          } else {
            return chat
          }
        })
      })
    }

    socket.on("messageSeenAll", handleSeenAll)

    return () => {
      socket.off("messageSeenAll", handleSeenAll)
    }
  }, [selectedChat?._id])

  const handleSendMessage = () => {
    if (!fileToSend) {
      if (messageText?.trim() !== "") sendMessage(messageText)
      setMessageText("")
    } else {
      sendFile()
      setFileToSend(null)
    }
  }

  const handleInputKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const onMessageSearch = e => {
    const value = e.target.value
    const filtered = messages.filter(message => {
      return message?.message?.toLowerCase().includes(value.toLowerCase())
    })

    setFilteredMessages(filtered)
  }

  const formatDate = date => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(date).toLocaleDateString(undefined, options)
  }

  return (
    <div className="chat-box-main-container-patient-messages">
      <div className="messages-box-header">
        {selectedChat ? (
          <div className="messages-box-header-left">
            {isMobile && (
              <ArrowLeftIcon
                onClick={() => {
                  setShowMessagesBox(false)
                  setSelectedChat(null)
                }}
              />
            )}
            <div className={`selected-single-chat-user-container `}>
              <div className="single-chat-user-left">
                <img
                  src={selectedChat?.patient?.profile_image || ProfileIcon}
                  alt={selectedChat?.patient?.profile_image}
                />
              </div>
              <div className="single-chat-user-right">
                <div>
                  {/* <a href={`/receptionist/details/${selectedChat?.booking_id}`}> */}
                  <h4>
                    {selectedChat?.booking?.[0]?.category_id?.category_name}
                  </h4>
                  {/* </a> */}
                  <h5>
                    {selectedChat?.patient?.first_name +
                      " " +
                      selectedChat?.patient?.last_name}
                  </h5>
                </div>

                <IconButton
                  id="basic-button"
                  aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                  onClick={event => {
                    setAnchorEl(event.currentTarget)
                  }}
                >
                  <img src={DotsIcon} height={20} width={20} />
                </IconButton>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => {
                    setAnchorEl(null)
                  }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() =>
                      (window.location.pathname = `/admin/details/${selectedChat?.booking_id}`)
                    }
                  >
                    Details
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        ) : (
          <h3>Messages</h3>
        )}
        {!isMobile && (
          <div className="search-input-container">
            <img src={SearchIcon} alt="search-icon" />
            <input
              type="text"
              placeholder="Search in messages..."
              onChange={onMessageSearch}
            />
          </div>
        )}
      </div>
      <hr />
      {!isMessagesLoading ? (
        <>
          {selectedChat && (
            <>
              <div className="chat-box-messages" ref={inboxRef}>
                {filteredMessages?.length === 0 ? (
                  <div className="no-messages-text">
                    <p>
                      No messages. Communicate freely with patients, your chat
                      is encrypted to ensure privacy .
                    </p>
                  </div>
                ) : (
                  filteredMessages?.map((message, index) => {
                    const messageDate = formatDate(message?.date)
                    const prevMessageDate =
                      index > 0
                        ? formatDate(filteredMessages[index - 1]?.date)
                        : null

                    return (
                      <React.Fragment key={message?._id}>
                        {index === 0 || messageDate !== prevMessageDate ? (
                          <div className="messages-date-divider">
                            {messageDate}
                          </div>
                        ) : null}
                        {message?.sender === user?.user_id ? (
                          <div className="single-message-item sender-message-item">
                            {/* <img
                              src={
                                selectedChat?.booking?.[0]?.personal_info
                                  ?.user_id?.profile_image ||
                                ProfileIcon
                              }
                              className="message-profile-image"
                              alt="Profile"
                            /> */}
                            <div className="single-message-text-box">
                              {message?.file?.url ? (
                                message?.file?.file_type?.startsWith(
                                  "image"
                                ) ? (
                                  <a
                                    href={`${PICTURE_URL}${message?.file?.url}`}
                                    target="_blank"
                                    download
                                  >
                                    <img
                                      src={`${PICTURE_URL}${message?.file?.url}`}
                                      className="message-image"
                                    />
                                  </a>
                                ) : (
                                  <a
                                    href={`${PICTURE_URL}${message?.file?.url}`}
                                    target="_blank"
                                    download
                                  >
                                    <PDFIcon />
                                  </a>
                                )
                              ) : (
                                <ReactLinkify
                                  componentDecorator={(
                                    decoratedHref,
                                    decoratedText,
                                    key
                                  ) => (
                                    <a
                                      className="message-as-link"
                                      target="blank"
                                      href={decoratedHref}
                                      key={key}
                                    >
                                      {decoratedText}
                                    </a>
                                  )}
                                >
                                  <p>{message?.message}</p>
                                </ReactLinkify>
                              )}
                              <span>
                                {new Date(message?.date).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}{" "}
                                <i
                                  className={
                                    message?.status === "seen"
                                      ? "seen"
                                      : message?.status == "delivered"
                                      ? "delivered"
                                      : ""
                                  }
                                >
                                  {message?.status}
                                </i>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="single-message-item">
                            <img
                              src={
                                selectedChat?.patient?.profile_image ||
                                ProfileIcon
                              }
                              alt="Profile"
                              className="message-profile-image"
                            />
                            <div className="single-message-text-box">
                              {message?.sender_role && (
                                <h6>{message?.sender_role}</h6>
                              )}
                              {message?.file?.url ? (
                                message?.file?.file_type?.startsWith(
                                  "image"
                                ) ? (
                                  <a
                                    href={`${PICTURE_URL}${message?.file?.url}`}
                                    target="_blank"
                                  >
                                    <img
                                      src={`${PICTURE_URL}${message?.file?.url}`}
                                      className="message-image"
                                    />
                                  </a>
                                ) : (
                                  <a
                                    href={`${PICTURE_URL}${message?.file?.url}`}
                                    target="_blank"
                                  >
                                    <PDFIcon />
                                  </a>
                                )
                              ) : (
                                <ReactLinkify
                                  componentDecorator={(
                                    decoratedHref,
                                    decoratedText,
                                    key
                                  ) => (
                                    <a
                                      className="message-as-link"
                                      target="blank"
                                      href={decoratedHref}
                                      key={key}
                                    >
                                      {decoratedText}
                                    </a>
                                  )}
                                >
                                  <p>{message?.message}</p>
                                </ReactLinkify>
                              )}
                              <span>
                                {new Date(message?.date).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    )
                  })
                )}
              </div>
              <div className="chat-box-messages-sending-container">
                <div className="messages-inputs-container">
                  {!fileToSend ? (
                    <input
                      placeholder="Type something..."
                      type="text"
                      disabled={fileToSend ? true : false}
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                    />
                  ) : (
                    <div className="file-name">
                      <span>{fileToSend?.name}</span>
                      <span
                        className="cross-file-name"
                        onClick={() => setFileToSend(null)}
                      >
                        X
                      </span>
                    </div>
                  )}
                  <input
                    id="message-file-icon"
                    key={fileKey}
                    type="file"
                    hidden
                    style={{ display: "none" }}
                    onChange={e => {
                      if (
                        e.target?.files[0]?.type === "application/pdf" ||
                        e.target?.files[0]?.type.split("/")[0] === "image"
                      ) {
                        setFileToSend(e.target.files[0])
                        setFileKey(prevKey => prevKey + 1)
                        return
                      }
                      return Swal.fire(
                        `Only Images and PDF files Allowed`,
                        "Try again",
                        "error"
                      )
                    }}
                  ></input>

                  <label className="file-icon" htmlFor="message-file-icon">
                    <FileIcon height={20} width={20} />
                  </label>
                </div>
                <button onClick={handleSendMessage}>
                  Send
                  {/* <SendIcon /> */}
                </button>
              </div>
            </>
          )}
          {!(allChats?.length > 0) && (
            <div className="no-chat-message ">
              <p>Your chat history with patients is empty</p>
            </div>
          )}
        </>
      ) : (
        <div className="no-chat-message ">
          <CircularProgress />{" "}
        </div>
      )}
    </div>
  )
}

export default ChatBox
