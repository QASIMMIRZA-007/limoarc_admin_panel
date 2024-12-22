import React, { useEffect } from "react"
import "./assets/scss/theme.scss"
import MainRoutes from "Routess/MainRoutes"
import { persistor, store } from "Redux/Store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ConfigProvider } from "antd"
const App = props => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#a18552",
          },
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainRoutes />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </>
  )
}

export default App
