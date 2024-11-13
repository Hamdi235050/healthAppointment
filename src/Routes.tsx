import { Suspense } from "react"
import { AppLoader } from "./AppLoader/AppLoader"
import { BrowserRouter } from 'react-router-dom'
import {Routes}
export default () => {
    return (
        <Suspense fallback={<AppLoader />}>
          <BrowserRouter  >
            <Routes
          </BrowserRouter>
        </Suspense>
    )
}