import Cookies from 'js-cookie'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isLogin: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token')
      const refreshToken = Cookies.get('refreshtoken')
      if (token && refreshToken) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    }

    checkAuth()
  }, [])

  const login = () => {
    setIsLogin(true)
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('refreshtoken')
    setIsLogin(false)
  }

  const value: AuthContextType = {
    isLogin,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
