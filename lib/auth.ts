import "server-only";

import { cookies } from "next/headers";
import { auth, db } from "@/lib/firebase/admin";

import { User } from "@/types";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    // 1. Verify the session cookie with Firebase Admin
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // 2. Fetch the user's profile from Firestore
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) return null;

    // 3. Return the user data
    return { ...userDoc.data(), id: userDoc.id } as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return user !== null;
}
