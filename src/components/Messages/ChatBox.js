import React, { useCallback, useEffect, useRef, useState } from "react"
import "./ChatBox.scss"
import { SearchIcon, FileIcon, ArrowLeftIcon, PDFIcon } from "../../assets"
import socket from "../../pages/facultyMessaging/socketConnection"
import { useSelector } from "react-redux"
import ReactLinkify from "react-linkify"
import CircularProgress from "@mui/material/CircularProgress"
import { PICTURE_URL } from "../../Services/Constants"
import { useMediaQuery } from "react-responsive"
import Swal from "sweetalert2"

import ProfileIcon from "../../assets/userProfile.svg"

function ChatBox({
  selectedChat,
  setSelectedChat,
  setShowMessagesBox,
  allChats,
  setAllChats,
  messages,
  setMessages,
  filteredMessages,
  setFilteredMessages,
  isMessagesLoading,
  getChatDetails,
  setOnlyPreview,
}) {
  const onlineUsers = useSelector(state => state.onlineUsers?.onlineUsers || [])
  const inboxRef = useRef()
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" })
  const user = useSelector(state => state.auth.adminData)

  const [messageText, setMessageText] = useState("")
  const [fileToSend, setFileToSend] = useState(null)
  const [fileKey, setFileKey] = useState(0)

  const scrollToBottom = useCallback(() => {
    const container = inboxRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [selectedChat?._id, filteredMessages])

  useEffect(() => {
    if (selectedChat?._id) {
      console.log("chat box selected chat useEffect")

      getChatDetails({ showLoader: true })

      socket.emit("join", { conversationId: selectedChat?._id })

      const handleChatMessage = payload => {
        console.log("incoming message", payload)
        if (payload?.chatId === selectedChat?._id) {
          setMessages(prev => [...prev, payload])
          setFilteredMessages(prev => [...prev, payload])

          if (payload?.sender !== user?.user_id) {
            socket.emit("groupMessageSeen", {
              conversationId: selectedChat?._id,
              messageId: payload?._id,
              userId: user?.user_id,
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

      socket.on("groupChat", handleChatMessage)

      return () => {
        socket.off("groupChat", handleChatMessage)
      }
    }
  }, [selectedChat?._id])

  useEffect(() => {
    scrollToBottom()
  }, [filteredMessages, isMessagesLoading])

  const sendMessage = text => {
    socket.emit("groupChat", {
      conversationId: selectedChat?._id,
      text,
      senderId: user?.user_id,
    })
  }

  const sendFile = () => {
    socket.emit(
      "groupUpload",
      fileToSend,
      fileToSend?.name,
      fileToSend.type,
      user?.user_id,
      selectedChat?._id,
      status => {
        console.log(status, "status")
      }
    )
  }

  useEffect(() => {
    const handleGroupMessageSeen = payload => {
      const updatedMessages = messages.map(message =>
        message?._id === payload?._id ? payload : message
      )

      console.log("settings all chats in group message seen")
      setAllChats(prev =>
        prev.map(chat =>
          chat?._id === selectedChat?._id &&
          selectedChat?.last_message?._id === payload?._id
            ? { ...chat, last_message: payload }
            : chat
        )
      )

      setMessages(updatedMessages)
      setFilteredMessages(updatedMessages)
    }

    socket.on("groupMessageSeen", handleGroupMessageSeen)

    return () => {
      socket.off("groupMessageSeen", handleGroupMessageSeen)
    }
  }, [messages, selectedChat])

  useEffect(() => {
    const setAllMessagesSeenForUser = payload => {
      setAllChats(prev =>
        prev.map(chat => {
          if (chat?._id === payload?._id) {
            return {
              ...chat,
              last_message: payload?.last_message,
            }
          } else {
            return chat
          }
        })
      )

      if (payload?._id === selectedChat?._id) {
        setSelectedChat(prev => ({
          ...prev,
          last_message: payload?.last_message,
        }))
        setMessages(payload?.messages || [])
        setFilteredMessages(payload?.messages || [])
      }
    }

    socket.on("groupMessageSeenAll", setAllMessagesSeenForUser)

    return () => {
      socket.off("groupMessageSeenAll", setAllMessagesSeenForUser)
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

  const handleShowGroupSettings = () => {
    setOnlyPreview(true)
  }

  return (
    <div className="chat-box-main-container">
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
                  onClick={handleShowGroupSettings}
                  src={selectedChat?.profile_image || ProfileIcon}
                  alt={selectedChat?.profile_image}
                />
              </div>
              <div className="single-chat-user-right">
                <h5 onClick={handleShowGroupSettings}>{selectedChat?.name}</h5>
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
                      No messages. Communicate freely, your chat is encrypted to
                      ensure privacy .
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
                                    <p>{message?.file?.name}</p>
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
                                selectedChat?.users?.find(
                                  el => el?._id === message?.sender
                                )?.profile_image || ProfileIcon
                              }
                              alt="Profile"
                              className="message-profile-image"
                            />
                            <div className="single-message-text-box">
                              <h6>
                                {selectedChat?.users?.find(
                                  el => el?._id === message?.sender
                                )?.first_name +
                                  " " +
                                  selectedChat?.users?.find(
                                    el => el?._id === message?.sender
                                  )?.last_name}
                              </h6>
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
                                    <p>{message?.file?.name}</p>
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
              <p>Your chat history is empty</p>
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
