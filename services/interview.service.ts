import "server-only";

import { db } from "@/lib/firebase/admin";
import { Feedback, GetLatestInterviewsParams, Interview } from "@/types";

const getInterviewById = async (interviewId: string): Promise<Interview | null> => {
  const interview = await db.collection("interviews").doc(interviewId).get();

  if (!interview.exists) {
    return null;
  }

  return interview.data() as Interview | null;
};

const getInterviewsByUserId = async (userId: string): Promise<Interview[]> => {
  const interviews = await db.collection("interviews").where("userid", "==", userId).get();

  return interviews.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
};

const getLatestInterviews = async (params: GetLatestInterviewsParams): Promise<Interview[]> => {
  const { userId, limit = 15 } = params;
  const interviews = await db
    .collection("interviews")
    .orderBy("created_at", "desc")
    .where("finalized", "==", true)
    .where("userid", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
};

const getFeedback = async (interviewId: string, userId: string) => {
  const feedback = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .get();

  if (feedback.empty) {
    return null;
  }

  // only should have one feedback per interview and user
  return {
    ...feedback.docs[0].data(),
    id: feedback.docs[0].id,
  } as Feedback;
};

const InterviewService = {
  getInterviewById,
  getInterviewsByUserId,
  getLatestInterviews,
  getFeedback,
};

export { InterviewService };
