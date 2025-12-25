import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 })
  }

  try {
    revalidatePath(path)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to revalidate path' }, { status: 500 })
  }

  return NextResponse.json({ revalidated: true })
}
