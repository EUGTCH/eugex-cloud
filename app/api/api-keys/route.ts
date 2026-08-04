import { NextResponse } from 'next/server'

type ApiKey = { id: number; label: string; value: string; created: string }
let keys: ApiKey[] = [
  { id: 1, label: 'Production', value: 'egx_live_9f3a72c1d84be605aa17f2c9', created: '12.06.2026' },
]

export async function GET() {
  return NextResponse.json(keys)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = Date.now()
  const label = body.label || `Ключ ${keys.length + 1}`
  const hex = '0123456789abcdef'
  let value = 'egx_live_'
  for (let i = 0; i < 24; i++) value += hex[Math.floor(Math.random() * 16)]
  const key: ApiKey = { id, label, value, created: new Date().toLocaleDateString('ru-RU') }
  keys.push(key)
  return NextResponse.json(key, { status: 201 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  keys = keys.filter((k) => k.id !== id)
  return NextResponse.json({ success: true })
}
