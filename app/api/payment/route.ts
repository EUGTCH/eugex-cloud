import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  await new Promise(r => setTimeout(r, 1500)) // имитация эквайринга (Банк 131 / ЮKassa / Продамус)
  const transactionId = `EA-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`
  console.info('[EUGEX] Payment processed', {
    transactionId, userId: body.userId, amount: body.amount, method: body.method,
    autoRenew: body.autoRenew ?? false, ofertaAccepted: body.ofertaAccepted, at: new Date().toISOString(),
  })
  return NextResponse.json({ success: true, transactionId, message: 'Платёж успешно обработан', ...body })
}