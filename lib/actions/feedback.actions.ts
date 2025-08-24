"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

import { db } from "@/lib/firebase/admin";

import { feedbackSchema } from "@/constants";
import { CreateFeedbackParams } from "@/types";

export async function createFeedbackAction(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  const formattedTranscript = transcript
    .map(({ role, content }: { role: string; content: string }) => {
      return `- ${role}: ${content}\n`;
    })
    .join("");

  try {
    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      providerOptions: {
        google: {
          structuredOutputs: false,
        },
      },
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.

        Produce a JSON object that EXACTLY matches this structure and constraints:
        - totalScore: number from 0 to 100. Compute it as the rounded average of the five category scores.

        - categoryScores: a TUPLE with FIVE objects in THIS EXACT ORDER (names must match literally):
          1) { name: "Communication Skills", score: number 0..100, comment: string (1-2 sentences, specific and actionable) }
          2) { name: "Technical Knowledge",  score: number 0..100, comment: string (1-2 sentences, specific and actionable) }
          3) { name: "Problem Solving",      score: number 0..100, comment: string (1-2 sentences, specific and actionable) }
          4) { name: "Cultural Fit",         score: number 0..100, comment: string (1-2 sentences, specific and actionable) }
          5) { name: "Confidence and Clarity", score: number 0..100, comment: string (1-2 sentences, specific and actionable) }

        - strengths: array of 3-5 short bullet-style strings highlighting concrete strengths seen in the transcript.

        - areasForImprovement: array of 3-5 short bullet-style strings with direct, constructive improvements tied to the transcript.

        - finalAssessment: a concise paragraph (3-5 sentences) that synthesizes the evaluation, balancing strengths and gaps and giving a clear overall verdict.

        Rules:
        - Use ONLY the five fixed category names above; do NOT add, remove, or rename categories.
        - Ensure numbers are plain numbers (no strings, no percentage symbols).
        - Keep comments specific to what appears in the transcript.
        - Return ONLY the JSON object, no extra text.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    await db.collection("feedback").doc(interviewId).set({
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    });

    return { success: true, feedbackId: interviewId };
  } catch (error) {
    console.error("Error creating feedback", error);
    return { success: false };
  }
}
