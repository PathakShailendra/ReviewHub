import React from 'react'
import { BrowserRouter as AppRouter, Route, Routes as AppRoutes } from 'react-router-dom'

const Routes = () => {
  return (
    <AppRouter>
      <AppRoutes>
        <Route path="/" element={<div>Home</div>} />
      </AppRoutes>
    </AppRouter>
  )
}

export default Routes

// 27 min completed video