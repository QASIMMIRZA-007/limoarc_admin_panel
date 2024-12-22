import React, { useState, useEffect } from "react"
import "./index.scss"
import { ApiCall } from "../../Services/apis"
import ChatUsers from "./ChatUsers"
import ChatBox from "./ChatBox"
import { useMediaQuery } from "react-responsive"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import { setLoader } from "Redux/Actions/GeneralActions"
import socket from "pages/facultyMessaging/socketConnection"
import GroupSettings from "./GroupSettings"
import NewGroup from "./NewGroup"

function Messages() {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" })
  const token = useSelector(state => state.auth.adminToken)
  const user = useSelector(state => state.auth.adminData)

  const dispatch = useDispatch()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedChatId = searchParams.get("selectedChatId")

  const [showMessagesBox, setShowMessagesBox] = useState(false)
  const [selectedChat, setSelectedChat] = useState(
    selectedChatId ? { _id: selectedChatId } : null
  )

  const [allChats, setAllChats] = useState([])
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [receptionists, setReceptionists] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [onlyPreview, setOnlyPreview] = useState(false)
  const [groupEdit, setGroupEdit] = useState(false)

  const getChatList = async () => {
    try {
      const res = await ApiCall({
        route: `groupchat/group_chat_listing`,
        token: token,
        verb: "get",
      })

      if (res?.status == "200") {
        console.log(res.response, "get all chats")
        setAllChats(res?.response?.chat_listing)
      } else {
        console.log("Couldn't get chat list")
      }
    } catch (e) {
      console.log("Error while getting chat list", e)
    }
  }

  const getChatDetails = async ({ showLoader }) => {
    if (showLoader) setIsMessagesLoading(true)

    try {
      const res = await ApiCall({
        route: `groupchat/group_chat_detail/${selectedChat._id}`,
        token: token,
        verb: "get",
      })

      console.log(res?.response)

      if (res?.status == "200") {
        setMessages(res.response?.detail?.messages || [])
        setFilteredMessages(res.response?.detail?.messages || [])
        setSelectedChat(res.response?.detail)
        setIsMessagesLoading(false)
        markAllMessagesAsRead()
      } else {
        console.log("Couldn't get chat details")
        setIsMessagesLoading(false)
      }
    } catch (e) {
      console.log("Error while getting chat details.", e)
      setIsMessagesLoading(false)
    }
  }

  const getAllDoctors = async () => {
    dispatch(setLoader(true))

    try {
      const res = await ApiCall({
        route: "doctor/all_doctors",
        token: token,
        verb: "get",
      })

      if (res?.status === 200) {
        dispatch(setLoader(false))
        setDoctors(res?.response?.list || [])
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  const getAllReceptionists = async () => {
    dispatch(setLoader(true))

    try {
      const res = await ApiCall({
        route: "receiptionist/receiptionist_listing",
        token: token,
        verb: "get",
      })

      if (res?.status === 200) {
        dispatch(setLoader(false))
        setReceptionists(res?.response?.list || [])
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
  }

  const markAllMessagesAsRead = async () => {
    socket.emit("groupMessageSeenAll", {
      conversationId: selectedChat?._id,
      userId: user?.user_id,
    })
  }

  const onSaveGroup = async data => {
    dispatch(setLoader(true))
    let status = false
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (key === "users") {
        formData.append(key, JSON.stringify(data[key]))
        return
      }
      formData.append(key, data[key])
    })
    try {
      const res = await ApiCall({
        route: groupEdit
          ? `groupchat/edit_groupchat/${selectedChat._id}`
          : "groupchat/add_new_groupchat",
        token: token,
        verb: groupEdit ? "put" : "post",
        params: formData,
      })

      if (res?.status === 200) {
        dispatch(setLoader(false))
        setIsOpen(false)
        setGroupEdit(false)
        setSelectedChat(res?.response?.detail)
        getChatList()
        Swal.fire(`${res.response.message}`, "Success", "success")
        status = true
      } else {
        Swal.fire(`${res.response.message}`, "Try again", "error")
        dispatch(setLoader(false))
      }
    } catch (e) {
      console.log("saga login error -- ", e.toString())
      dispatch(setLoader(false))
    }
    return { status }
  }

  const onDeleteGroup = async () => {
    try {
      const res = await ApiCall({
        route: `groupchat/delete_groupchat/${selectedChat._id}`,
        token: token,
        verb: "delete",
      })

      if (res?.status == "200") {
        getChatList()
        setIsOpen(false)
        setGroupEdit(false)
        Swal.fire(`${res.response.message}`, "Success", "success")
      } else {
        console.log("Couldn't delete chat")
      }
    } catch (e) {
      console.log("Error while getting chat list", e)
    }
  }

  useEffect(() => {
    dispatch(setLoader(true))
    getChatList()
    getAllDoctors()
    getAllReceptionists()
  }, [])

  const commonProps = {
    setSelectedChat,
    selectedChat,
    setShowMessagesBox,
    allChats,
    setAllChats,
    messages,
    setMessages,
    filteredMessages,
    setFilteredMessages,
    isMessagesLoading,
    setIsMessagesLoading,
    getChatDetails,
    doctors,
    receptionists,
    onSaveGroup,
    isOpen,
    setIsOpen,
    onlyPreview,
    setOnlyPreview,
    groupEdit,
    setGroupEdit,
    onDeleteGroup,
    markAllMessagesAsRead,
  }

  return (
    <div className="messages-main-container-component">
      {onlyPreview && (
        <GroupSettings
          doctors={doctors}
          receptionists={receptionists}
          onSaveGroup={onSaveGroup}
          selectedChat={selectedChat}
          onlyPreview={onlyPreview}
          groupEdit={groupEdit}
          setOnlyPreview={setOnlyPreview}
          setGroupEdit={setGroupEdit}
          onDeleteGroup={onDeleteGroup}
        />
      )}

      {isOpen && (
        <NewGroup
          doctors={doctors}
          receptionists={receptionists}
          onSaveGroup={onSaveGroup}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      {!isMobile ? (
        <>
          <ChatUsers {...commonProps} />
          <ChatBox {...commonProps} />
        </>
      ) : (
        <>
          {!showMessagesBox ? (
            <ChatUsers {...commonProps} />
          ) : (
            <ChatBox {...commonProps} />
          )}
        </>
      )}
    </div>
  )
}

export default Messages
