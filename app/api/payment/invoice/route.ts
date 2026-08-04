import { NextResponse } from 'next/server'
import { PAYMENT_DESCRIPTION } from '@/lib/constants'

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.userId || !body.amount) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  return NextResponse.json({
    success: true,
    invoiceId: `INV-${Date.now()}`,
    purpose: PAYMENT_DESCRIPTION(body.userId),
    amount: body.amount,
    message: 'Счёт сформирован.',
  })
}
