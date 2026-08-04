import { NextResponse } from 'next/server'

type Transaction = {
  id: string
  date: string
  amount: number
  method: 'card' | 'sbp' | 'invoice'
  status: 'success' | 'pending' | 'failed'
  planName?: string
}

let transactions: Transaction[] = [
  { id: 'TX-20260801-001', date: '2026-08-01', amount: 150000, method: 'card', status: 'success', planName: 'Business' },
]

export async function GET() {
  return NextResponse.json(transactions)
}

export async function POST(request: Request) {
  const body = await request.json()
  const id = `TX-${Date.now()}`
  const tx: Transaction = {
    id,
    date: new Date().toISOString().slice(0, 10),
    amount: body.amount,
    method: body.method,
    status: 'success',
    planName: body.planName,
  }
  transactions.unshift(tx)
  return NextResponse.json(tx, { status: 201 })
}
