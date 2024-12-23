import React, { useState } from "react"
import { Button, Flex, Input, Modal, Tabs } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import "./modalStyles.scss"
import { RxCross2 } from "react-icons/rx"
import FormsButton from "UI/FormsButton/FormsButton"

const BookingModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const tabItems = [
    {
      key: "1",
      label: "Suggested",
      children: (
        <>
          <div className="searchbox">
            <div className="search">
              <Input  addonBefore={<SearchOutlined />} placeholder="Search Chauffeur" />
            </div>
            </div>
          <div className="chaufferListWrapp">
            <div className="chaufferList">
              <div className="chaufferItemHeader">
                <Flex align="center" justify="space-between">
                  <h3>John Doe</h3>
                  <Flex align="center" gap={5}>
                    <div className="activeCircle" />
                    <span className="status">Active</span>
                  </Flex>
                </Flex>
                  </div>
                  <Flex>
                    <b>Distance:</b>
                    <span> 5 km</span>
                  </Flex>
           
                  <Flex align="center" justify="space-between">
                    <Flex>
                      <b>Time to Destination:</b>
                      <span> 12 minutes</span>
                    </Flex>
                    <button className="darkassignChauffeur">Assign </button>
                  </Flex>
              
             
            </div>
          </div>
        </>
      ),
    },
    { key: "2", label: "Online", children: "Content of Tab 2" },
    { key: "3", label: "Offline", children: "Content of Tab 3" },
  ]
  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <div className="modalHeader">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </div>

        {/* <div>
        <RxCross2 className="close" onClick={handleCancel} />
        </div> */}
      </Modal>
    </>
  )
}
export default BookingModal
