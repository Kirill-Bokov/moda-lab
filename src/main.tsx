import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { AnimationProvider } from "./app/features/animationContext/AnimationProvider"

const isDemo = import.meta.env.VITE_DEMO === "true"
async function prepareApp() {
  const isDev = import.meta.env.DEV
  const base = isDemo ? import.meta.env.BASE_URL : "/"

  if (isDev || isDemo) {
    const { worker } = await import("./mocks/browser")
    await worker.start({
      onUnhandledRequest: "bypass", serviceWorker: {
        url: `${base}mockServiceWorker.js`
      }
    })
  }
}

prepareApp().then(() => {
  const Router = isDemo ? HashRouter : BrowserRouter

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <AnimationProvider>
            <App />
          </AnimationProvider>
        </Router>
      </Provider>
    </React.StrictMode>
  )
})
