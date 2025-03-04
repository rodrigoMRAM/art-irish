import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
 
  const token = useSelector(state => state.user.jwt)

  if (!token) {
    return <Navigate to="/" replace /> 
  }
  return children
}
