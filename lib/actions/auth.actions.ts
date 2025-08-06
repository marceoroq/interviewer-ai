"use server";

import { cookies } from "next/headers";
import { db, auth } from "@/lib/firebase/admin";

import { SignInParams, SignUpParams } from "@/types";
import { ONE_WEEK } from "@/constants";

export async function signUpAction(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const user = await db.collection("users").doc(uid).get();

    if (user.exists) {
      return { success: false, message: "User already exists. Please sign in instead." };
    }

    await db.collection("users").doc(uid).set({ name, email });

    return { success: true, message: "User created successfully. Please sign in to continue." };
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    return { success: false, message: "Failed creating user" };
  }
}

export async function signInAction(params: SignInParams) {
  const { idToken } = params;

  try {
    // Verify the ID token
    await auth.verifyIdToken(idToken);

    // If the token is valid, set the session cookie
    await setSessionCookie(idToken);

    return { success: true, message: "User signed in successfully." };
  } catch (error: unknown) {
    console.error("Error signing in:", error);
    return { success: false, message: "Invalid or expired token" };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  });
}
