import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link, NavLink } from "react-router-dom"
import { ContIcon, DashIcon, FaqIcon, PatiIcon } from "assets"
import { DoctIcon } from "assets"
import { ReceIcon } from "assets"
import { BookIcon } from "assets"
import { PharIcon } from "assets"
import { PaymIcon } from "assets"
import { MediIcon } from "assets"
import { CmsIcon } from "assets"
import { AlleIcon } from "assets"
import { DiagIcon } from "assets"
import { ReviewsIcon, ConsentIcon, MessagesIcon } from "assets"

//i18n
import { withTranslation } from "react-i18next"
import { IoCarSportOutline } from "react-icons/io5"

const SidebarContent = props => {
  const ref = useRef()

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  // useEffect(() => {
  //   const pathName = props.location.pathname

  //   const initMenu = () => {
  //     new MetisMenu("#side-menu")
  //     let matchingMenuItem = null
  //     const ul = document.getElementById("side-menu")
  //     const items = ul.getElementsByTagName("a")
  //     for (let i = 0; i < items.length; ++i) {
  //       if (pathName === items[i].pathname) {
  //         matchingMenuItem = items[i]
  //         break
  //       }
  //     }
  //     if (matchingMenuItem) {
  //       activateParentDropdown(matchingMenuItem)
  //     }
  //   }
  //   initMenu()
  // }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul
            className="metismenu list-unstyled"
            id="side-menu"
            style={{ overflow: "auto" }}
          >
            {/* <li className="menu-title">{props.t("Main")} </li> */}
            <li>
              <NavLink to="/admin/dashboard" className="waves-effect">
                <i>
                  <DashIcon />
                </i>
                {/* <span className="badge rounded-pill bg-primary float-end">
                  2
                </span> */}
                <span>{props.t("Dashboard ")}</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/customers" className=" waves-effect">
                <i>
                  <PatiIcon />
                </i>

                <span>{props.t("Customers")}</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/admin/cars" className=" waves-effect">
                <i>
                  <DoctIcon />
                </i>
                <span>{props.t("Cars")}</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/admin/chauffeur" className=" waves-effect">
                <i>
                  <ReceIcon />
                </i>
                <span>{props.t("Chauffeurs")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/affiliate" className=" waves-effect">
                <i>
                  <DiagIcon />
                </i>
                <span>{props.t("Affiliate")}</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/rides-booking" className=" waves-effect">
                <i>
                  {/* <BookIcon /> */}
                  <IoCarSportOutline style={{ fontSize: "20px" }} />
                </i>
                <span>{props.t("Rides-Bookings")}</span>
              </NavLink>
            </li>


            <li>
              <NavLink to="/admin/payment" className=" waves-effect">
                <i>
                  <PaymIcon />
                </i>
                <span>{props.t("Payment History")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contact" className=" waves-effect">
                <i>
                  <ContIcon />
                </i>
                <span>{props.t("Contact Us")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reviews" className=" waves-effect">
                <i>
                  <ReviewsIcon className="width-[20px] height-[25px] " />
                </i>
                <span>{props.t("Reviews")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/faq" className=" waves-effect">
                <i>
                  <FaqIcon className="width-[20px] height-[25px] " />
                </i>
                <span>{props.t("FAQs")}</span>
              </NavLink>
            </li>
















          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
