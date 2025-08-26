"use server";

import { cookies } from "next/headers";
import { db, auth } from "@/lib/firebase/admin";
import { stripUndefined } from "@/lib/utils";

import { signOut } from "firebase/auth";
import { auth as clientAuth } from "@/lib/firebase/client";

import { SignInParams, SignUpParams } from "@/types";
import { ONE_WEEK } from "@/constants";

export async function signUpAction(params: SignUpParams) {
  const { uid, name, email, avatar } = params;

  try {
    const user = await db.collection("users").doc(uid).get();

    if (user.exists) {
      return { success: false, message: "User already exists. Please sign in instead." };
    }

    // Avatar is optional so we removed if is undefined
    await db.collection("users").doc(uid).set(stripUndefined({ name, email, avatar }));

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

export async function signInWithGoogleAction(params: SignInParams) {
  const { idToken } = params;

  try {
    // Verify the ID token
    const decodedClaims = await auth.verifyIdToken(idToken);
    const uid = decodedClaims.uid;

    // Check if user exists in Firestore
    const userDocRef = db.collection("users").doc(uid);
    const userDoc = await userDocRef.get();

    // If user does not exist, create a new document
    if (!userDoc.exists) {
      await userDocRef.set({
        name: decodedClaims.name,
        email: decodedClaims.email,
        avatar: decodedClaims.picture,
      });
    }

    // Then set the session cookie
    await setSessionCookie(idToken);

    return { success: true, message: "User signed in successfully." };
  } catch (error: unknown) {
    console.error("Error signing in:", error);
    return { success: false, message: "Invalid or expired token" };
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  // Sign out from Firebase Browser Client
  await signOut(clientAuth);

  if (!sessionCookie) {
    return { success: true, message: "User signed out successfully." };
  }

  // Sign out from Firebase Admin Client
  try {
    // Invalidate the Firebase Admin session
    const decodedClaims = await auth.verifySessionCookie(sessionCookie);
    await auth.revokeRefreshTokens(decodedClaims.sub);

    // Delete the session cookie
    cookieStore.delete("session");

    return { success: true, message: "User signed out successfully." };
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    return { success: false, message: "Failed signing out." };
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
