import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, password, sms_agreed, email_agreed } = body

    // 입력 검증
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: '이름은 2자 이상 입력해 주세요.' }, { status: 400 })
    }
    if (!phone || typeof phone !== 'string' || !/^01[016789]-?\d{3,4}-?\d{4}$/.test(phone.trim())) {
      return NextResponse.json({ error: '올바른 휴대전화 번호를 입력해 주세요.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: '올바른 이메일 주소를 입력해 주세요.' }, { status: 400 })
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: '비밀번호는 8자 이상 입력해 주세요.' }, { status: 400 })
    }

    const supabase = await createClient()

    // 이메일 중복 확인
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.trim())
      .single()

    if (existing) {
      return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)

    const { data, error } = await supabase
      .from('users')
      .insert({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password_hash: passwordHash,
        sms_agreed: sms_agreed ?? false,
        email_agreed: email_agreed ?? false,
        terms_agreed: true,
        privacy_agreed: true,
      })
      .select('id, name, email, created_at')
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: '요청을 처리할 수 없습니다.' }, { status: 500 })
  }
}
