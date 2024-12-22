import React, { useState, useEffect } from "react"
import "./index.scss"
import { ApiCall } from "../../../Services/apis"
import ChatUsers from "./ChatUsers"
import ChatBox from "./ChatBox"
import { useMediaQuery } from "react-responsive"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { setLoader } from "Redux/Actions/GeneralActions"

function Messages() {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" })
  const token = useSelector(state => state.auth.adminToken)
  const loader = useSelector(state => state.general?.loader)
  const dispatch = useDispatch()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedChatId = searchParams.get("selectedChatId")

  const [showMessagesBox, setShowMessagesBox] = useState(false)
  const [selectedChat, setSelectedChat] = useState(
    selectedChatId &&
      selectedChatId !== "null" &&
      selectedChatId !== "undefined"
      ? { _id: selectedChatId }
      : null
  )

  const [allChats, setAllChats] = useState([])
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [messageLimit,setMessageLimit] = useState(1);
  const [messageLoad,setMessageLoad] = useState(false)
  const [totalMessage ,setTotalMessage]= useState(0)
const setMessageLimiter = (limit)=> {
  setMessageLimit(limit)
}

const setMessageLoader = (param)=> {
setMessageLoad(param)
}
  const getChatList = async (loader="all") => {
    loader==="all" ? dispatch(setLoader(true)) : setMessageLoader(true)
    try {
      const res = await ApiCall({
        route: `chat/chat_listing/${messageLimit}`,
        token: token,
        verb: "get",
      })
      // console.log("Total chats", res?.response)
      if (res?.status == "200") {
        setAllChats(res?.response?.chat_listing || [])
        dispatch(setLoader(false))
        setMessageLoader(false)
        setTotalMessage(res?.response?.totalData[0]?.totalCount)
      } else {
        console.log("Couldn't get chat list")
        dispatch(setLoader(false))
        setMessageLoader(false)
      }
    } catch (e) {
      console.log("Error while getting chat list", e)
      dispatch(setLoader(false))
      setMessageLoader(false)
    }
  }

  const getNotifications = async () => {
    const res = await ApiCall({
      route: `chat/get_notifications`,
      token: token,
      verb: "get",
    })
    if (res?.status === 200) {
      // console.log(res.response, "get all notifications");
      setNotifications(res?.response?.notifications)
    }
  }

  const getChatDetails = async ({ showLoader }) => {
    if (showLoader) setIsMessagesLoading(true)

    try {
      const res = await ApiCall({
        route: `chat/chat_detail/${selectedChat._id}`,
        token: token,
        verb: "get",
      })

      if (res?.status == "200") {
        setMessages(res.response?.chat?.messages)
        setFilteredMessages(res.response?.chat?.messages)
        setIsMessagesLoading(false)
      } else {
        console.log("Couldn't get chat details")
        setIsMessagesLoading(false)
      }
    } catch (e) {
      console.log("Error while getting chat details.", e)
      setIsMessagesLoading(false)
    }
  }

  const markAllAsRead = async () => {
    const res = await ApiCall({
      route: `chat/mark_notification_as_read_by_chat/${selectedChat?._id}`,
      token: token,
      verb: "get",
    })
    if (res.status === 200) {
      setNotifications(res.response.notifications)
      getChatDetails()
    }
  }

  useEffect(() => {
    getChatList()
    getNotifications()
  },[])

  useEffect(()=> {

    getChatList("more") //initially we get 50 chats and calling for more chats we are passing this parameter to avaid complete reload
    getNotifications()
  },[messageLimit])

 

  const commonProps = {
    setSelectedChat,
    selectedChat,
    setShowMessagesBox,
    allChats,
    setAllChats,
    notifications,
    setNotifications,
    messages,
    setMessages,
    filteredMessages,
    setFilteredMessages,
    isMessagesLoading,
    setIsMessagesLoading,
    getChatDetails,
    getNotifications,
    markAllAsRead,
    messageLimit,
    setMessageLimiter,
    messageLoad,
    setMessageLoader,
    totalMessage
  }

  console.log(allChats, "all chats")

  return (
    <div className="messages-main-container-component-patient-messages">
      {!loader &&
        (allChats?.length > 0 ? (
          !isMobile ? (
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
          )
        ) : (
          <div className="no-messages-in-chat-container">
            <div>
              <h6>No Messages</h6>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Messages
