import { NextRequest, NextResponse } from 'next/server'

export type AcceptEntry = {
  userId?: string; method?: string; amount?: number; source?: string
  ip: string; userAgent: string; acceptedAt: string; offerVersion: string; ofertaAccepted: boolean
}
export const acceptLog: AcceptEntry[] = []

export async function POST(req: NextRequest) {
  const body = await req.json()
  const entry: AcceptEntry = {
    ...body,
    ip: req.headers.get('x-forwarded-for') ?? 'unknown',
    userAgent: req.headers.get('user-agent') ?? 'unknown',
    acceptedAt: new Date().toISOString(),
    offerVersion: body.offerVersion ?? '03.08.2026',
    ofertaAccepted: true,
  }
  acceptLog.push(entry)
  console.info('[EUGEX] Oferta_Accepted=true', entry)
  return NextResponse.json({ success: true, logged: acceptLog.length })
}

export async function GET() { return NextResponse.json(acceptLog) }