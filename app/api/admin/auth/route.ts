import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_SESSION_COOKIE = 'admin-session'
const SESSION_TOKEN = 'egun-admin-authenticated'

// POST: 비밀번호 검증 -> 쿠키 설정
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: '비밀번호를 입력해주세요.' },
        { status: 400 },
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD 환경변수가 설정되지 않았습니다.')
      return NextResponse.json(
        { error: '서버 설정 오류입니다.' },
        { status: 500 },
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 },
      )
    }

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: '요청을 처리할 수 없습니다.' },
      { status: 500 },
    )
  }
}

// DELETE: 로그아웃 (쿠키 삭제)
export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: '요청을 처리할 수 없습니다.' },
      { status: 500 },
    )
  }
}
