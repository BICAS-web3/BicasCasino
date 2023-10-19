import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    var next_url = request.nextUrl.searchParams.get('next_url');

    var partner_address = request.nextUrl.searchParams.get('partner_address');
    var site_id = request.nextUrl.searchParams.get('site_id');
    var sub_id = request.nextUrl.searchParams.get('sub_id');

    console.log(partner_address, site_id, sub_id);

    await fetch(new URL(`/partner/site/subid/click/${partner_address}/${site_id}/${sub_id}`, "http://backend:8282"), {
        method: "POST",
    }).catch((r) => { console.log(r) });

    return NextResponse.redirect(new URL(`${next_url ? next_url : '/'}?partner_address=${partner_address}&site_id=${site_id}&sub_id=${sub_id}`, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/partners/referal/:path*',
}