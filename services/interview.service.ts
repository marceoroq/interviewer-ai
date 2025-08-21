import "server-only";

import { db } from "@/lib/firebase/admin";
import { GetLatestInterviewsParams, Interview } from "@/types";

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

const InterviewService = {
  getInterviewsByUserId,
  getLatestInterviews,
};

export { InterviewService };
