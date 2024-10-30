"use server";
import { cookies } from "next/headers";

async function getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get('access_token');
}

async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get('refresh_token');
}

async function setCookieToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('access_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60, // 1 hour
        path: "/",
        sameSite: "strict",
    });
}

async function removeTokenFromCookies() {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
}

async function removeAccessToken() {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
}

export { getAccessToken, removeTokenFromCookies, setCookieToken, getRefreshToken, removeAccessToken };
