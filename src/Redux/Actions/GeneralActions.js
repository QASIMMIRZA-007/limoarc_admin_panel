import { ACTIONS } from "../Action-types";

export const setLoader = (data) => ({
  type: ACTIONS.SET_LOADER,
  data,
});

export const changeLayout = layout => ({
  type: ACTIONS.CHANGE_LAYOUT,
  payload: layout,
})

export const changeLayoutWidth = width => ({
  type: ACTIONS.CHANGE_LAYOUT_WIDTH,
  payload: width,
})

export const changeSidebarTheme = theme => ({
  type: ACTIONS.CHANGE_SIDEBAR_THEME,
  payload: theme,
})

export const changeSidebarType = (sidebarType, isMobile) => {
  return {
    type: ACTIONS.CHANGE_SIDEBAR_TYPE,
    payload: { sidebarType, isMobile },
  }
}

export const changeTopbarTheme = topbarTheme => ({
  type: ACTIONS.CHANGE_TOPBAR_THEME,
  payload: topbarTheme,
})

export const showRightSidebarAction = isopen => (
{
  type: ACTIONS.SHOW_RIGHT_SIDEBAR,
  payload: isopen,
})

export const showSidebar = isopen => ({
  type: ACTIONS.SHOW_SIDEBAR,
  payload: isopen,
})

export const toggleLeftmenu = isopen => ({
  type: ACTIONS.TOGGLE_LEFTMENU,
  payload: isopen,
})
