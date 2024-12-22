import { ACTIONS, 
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  SHOW_RIGHT_SIDEBAR,
  TOGGLE_LEFTMENU,
  SHOW_SIDEBAR,} from "../Action-types";

const initialState = {
  loader: false,
  layoutType: "vertical",
  layoutWidth: "fluid",
  leftSideBarTheme: "light",
  leftSideBarType: "default",
  topbarTheme: "light",
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
};


const GeneralReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADER:
      return {
        ...state,
        loader: action.data,
      };
      case ACTIONS.CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      };

    case ACTIONS.CHANGE_LAYOUT_WIDTH:
      return {
        ...state,
        layoutWidth: action.payload,
      };
    case ACTIONS.CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSideBarTheme: action.payload,
      };
    case ACTIONS.CHANGE_SIDEBAR_TYPE:
      return {
        ...state,
        leftSideBarType: action.payload.sidebarType,
      };
    case ACTIONS.CHANGE_TOPBAR_THEME:
      return {
        ...state,
        topbarTheme: action.payload,
      };
    case ACTIONS.SHOW_RIGHT_SIDEBAR:
      return {
        ...state,
        showRightSidebar: action.payload,
      };
    case ACTIONS.SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload,
      };
    case ACTIONS.TOGGLE_LEFTMENU:
      return {
        ...state,
        leftMenu: action.payload,
      };
       

    default:
      return state;
  }
};

export default GeneralReducers;
