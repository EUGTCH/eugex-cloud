import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.fio || !body.phone || !body.email) {
    return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
  }
  return NextResponse.json({
    success: true,
    message: 'Регистрация выполнена',
    userId: `USR-${Date.now()}`,
    fio: body.fio,
    email: body.email,
  })
}
