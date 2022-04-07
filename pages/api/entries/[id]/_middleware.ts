/* eslint-disable prefer-regex-literals */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
// import mongoose from 'mongoose';

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  const id = req.page.params?.id || '';
  const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

  if (!checkMongoIDRegExp.test(id)) {
    // return new Response(JSON.stringify({ message: 'Invalid id' }), { status: 400 });
    return NextResponse.json({ message: 'Invalid id' });
  }
  return NextResponse.next();
}
