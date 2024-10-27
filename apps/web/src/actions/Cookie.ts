"use server"
import { cookies } from "next/headers";
function getAccessToken() {
    return cookies().get('access_token');
}
function getRefreshToken() {
    return cookies().get('refresh_token');
}

function setCookieToken(token: string) {
    cookies().set('access_token', token, {
        httpOnly: true,  
        secure: true,   
        maxAge: 60 * 60 ,  
        path: "/",      
        sameSite: "strict",
    });
}
function removeTokenFromCookies() {
    cookies().delete('access_token');
    cookies().delete('refresh_token');
}
function removeAccessToken() {
  cookies().delete('access_token');
}
export { getAccessToken, removeTokenFromCookies ,setCookieToken, getRefreshToken, removeAccessToken};
