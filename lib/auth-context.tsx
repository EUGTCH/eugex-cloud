'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type User = { name: string; email: string; phone?: string; id: string }

type AuthCtx = {
  user: User | null
  ready: boolean
  login: (u: User) => void
  update: (p: Partial<User>) => void
  logout: () => void
}

const Ctx = createContext<AuthCtx>({ user: null, ready: false, login: () => {}, update: () => {}, logout: () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try { const raw = localStorage.getItem('eugex_user'); if (raw) setUser(JSON.parse(raw)) }
    finally { setReady(true) }
  }, [])

  const login = (u: User) => { setUser(u); localStorage.setItem('eugex_user', JSON.stringify(u)) }
  const update = (p: Partial<User>) => setUser(prev => {
    if (!prev) return prev
    const next = { ...prev, ...p }
    localStorage.setItem('eugex_user', JSON.stringify(next))
    return next
  })
  const logout = () => { setUser(null); localStorage.removeItem('eugex_user') }

  return <Ctx.Provider value={{ user, ready, login, update, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)