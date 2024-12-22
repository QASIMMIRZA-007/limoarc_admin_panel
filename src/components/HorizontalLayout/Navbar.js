import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter, NavLink } from "react-router-dom"
import classname from "classnames"
import "./navbar.css"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"
import {
  AlleIcon,
  BookIcon,
  CmsIcon,
  DashIcon,
  DiagIcon,
  DoctIcon,
  MediIcon,
  PatiIcon,
  PaymIcon,
  PharIcon,
  ReceIcon,
} from "assets"

import { FaCar } from "react-icons/fa";


const Navbar = props => {
  const [ui, setui] = useState(false)

  const [email, setemail] = useState(false)

  const [component, setcomponent] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [auth, setauth] = useState(false)

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li>
                  <NavLink to="/admin/dashboard" className="waves-effect">
                    <i>
                      <DashIcon />
                    </i>
                    <span className="badge rounded-pill bg-primary float-end">
                      2
                    </span>
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
                <li>
                  <NavLink to="/admin/chauffeur" className=" waves-effect">
                    <DirectionsCarIcon />
                    <span>{props.t("Chauffuers")}</span>
                  </NavLink>
                </li>
                <li>
                  <li>
                                <NavLink to="/admin/affiliate" className=" waves-effect">
                                  <i>
                                    <ReceIcon />
                                  </i>
                                  <span>{props.t("Affiliate")}</span>
                                </NavLink>
                              </li>
                  <NavLink to="/admin/cars" className=" waves-effect">
                    {/* <i>
                      <FaCar />
                    </i> */}
                    <DirectionsCarIcon />
                    <span>{props.t("Cars")}</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/admin/rides-booking" className=" waves-effect">
                    <i>
                      <BookIcon />
                    </i>
                    <span>{props.t("Rides-booking")}</span>
                  </NavLink>
                </li>


                <li>
                  <NavLink to="/admin/payment" className=" waves-effect">
                    <i>
                      <PaymIcon color="white" />
                    </i>
                    <span>{props.t("Payment History")}</span>
                  </NavLink>
                </li>





              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.general
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
