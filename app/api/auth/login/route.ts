import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.email) {
    return NextResponse.json({ error: 'Укажите email' }, { status: 400 })
  }
  return NextResponse.json({
    success: true,
    message: 'Вход выполнен (демо)',
    token: 'demo-jwt-token-' + Date.now(),
    email: body.email,
  })
}
