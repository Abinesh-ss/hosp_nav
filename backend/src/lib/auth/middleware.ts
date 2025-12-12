import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function auth(req: NextRequest): Promise<string | null> {
  try {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) return null;

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}
