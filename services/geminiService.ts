import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}


const getPrompt = (field: string, goal: string) => `
    You are an AI assistant for GradNiche, a study abroad information platform for Indian students. 
    Your role is to provide helpful, data-driven suggestions.
    
    Please recommend the top 2-3 countries for a student interested in "${field}" with a primary career goal of "${goal}". 
    
    For each recommended country, provide a brief, compelling reason (2-3 sentences) why it's a good fit, considering the student's field and goal. 
    
    Keep the tone informative and encouraging. Format the response as simple text, not JSON. Start with a positive opening sentence. For example: "Based on your interest in [Field] and goal of [Goal], here are some excellent countries to consider:"
    
    Structure the output clearly, using the country names as headings.
  `;

export const recommendCountry = async (field: string, goal: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const prompt = getPrompt(field, goal);

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get recommendation from AI.");
  }
};

export async function* recommendCountryStream(field: string, goal: string) {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const prompt = getPrompt(field, goal);

    try {
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
            }
        });

        for await (const chunk of response) {
            yield chunk.text;
        }

    } catch (error) {
        console.error("Gemini API stream call failed:", error);
        throw new Error("Failed to get streaming recommendation from AI.");
    }
}

const sopAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: {
            type: Type.NUMBER,
            description: "An overall score for the SOP on a scale of 0 to 100.",
        },
        summary: {
            type: Type.STRING,
            description: "A brief, 2-3 sentence summary of the key strengths and areas for improvement."
        },
        clarity: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER, description: "Score from 1-10 for Clarity & Structure." },
                feedback: { type: Type.STRING, description: "Specific feedback on the clarity, flow, and structure of the essay." }
            },
             required: ["score", "feedback"]
        },
        storytelling: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER, description: "Score from 1-10 for Storytelling & Motivation." },
                feedback: { type: Type.STRING, description: "Feedback on how well the applicant tells their story, shows motivation, and connects experiences to their goals." }
            },
             required: ["score", "feedback"]
        },
        grammar: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER, description: "Score from 1-10 for Grammar & Tone." },
                feedback: { type: Type.STRING, description: "Feedback on grammar, syntax, vocabulary, and the overall professional tone of the essay." }
            },
            required: ["score", "feedback"]
        },
        impact: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER, description: "Score from 1-10 for Overall Impact." },
                feedback: { type: Type.STRING, description: "Feedback on the overall persuasiveness and impact of the SOP on an admissions committee." }
            },
            required: ["score", "feedback"]
        },
        paraphraseInsights: {
            type: Type.ARRAY,
            description: "An array of 2-3 specific suggestions to paraphrase sentences for better impact.",
            items: {
                type: Type.OBJECT,
                properties: {
                    originalSentence: { type: Type.STRING, description: "The original sentence from the SOP that could be improved." },
                    suggestion: { type: Type.STRING, description: "A rewritten, more impactful version of the sentence." },
                    reason: { type: Type.STRING, description: "A brief explanation of why the suggestion is an improvement (e.g., more concise, stronger verbs)." }
                },
                required: ["originalSentence", "suggestion", "reason"]
            }
        },
        aiContentAnalysis: {
            type: Type.OBJECT,
            description: "An analysis of the likelihood that the SOP was written by an AI.",
            properties: {
                score: { type: Type.NUMBER, description: "A percentage score representing the likelihood of AI authorship (0% = fully human, 100% = fully AI-generated)." },
                feedback: { type: Type.STRING, description: "A brief justification for the AI content score." }
            },
            required: ["score", "feedback"]
        },
        plagiarismAnalysis: {
            type: Type.OBJECT,
            description: "An analysis of the text for unoriginal content and clichés.",
            properties: {
                score: { type: Type.NUMBER, description: "A percentage score for unoriginal content (0% = completely original, 100% = highly unoriginal/plagiarized)." },
                feedback: { type: Type.STRING, description: "A brief explanation for the unoriginal content score, highlighting any generic phrases or clichés found." }
            },
            required: ["score", "feedback"]
        }
    },
    required: ["overallScore", "summary", "clarity", "storytelling", "grammar", "impact", "paraphraseInsights", "aiContentAnalysis", "plagiarismAnalysis"]
};

const getSOPPrompt = (sopText: string) => `
You are an expert admissions counselor for a top-tier global university. Your task is to analyze a student's Statement of Purpose (SOP) and provide constructive, actionable feedback in a structured JSON format.

Analyze the following SOP based on six key criteria:
1.  **Clarity & Structure**: Is the essay well-organized, logical, and easy to follow?
2.  **Storytelling & Motivation**: Does the applicant tell a compelling story and clearly articulate their motivations?
3.  **Grammar & Tone**: Is the writing clear, concise, and professional?
4.  **Overall Impact**: How persuasive is the SOP for an admissions committee?
5.  **AI Content Detection**: Analyze the writing style for patterns indicative of AI generation. Provide a percentage score representing the likelihood of AI authorship (0% = fully human, 100% = fully AI) and a brief justification.
6.  **Unoriginal Content Check**: Scan for clichés, generic phrases, and content that appears heavily paraphrased or unoriginal. Provide a percentage score for unoriginal content (0% = completely original, 100% = highly unoriginal) and explain your reasoning.

Based on your analysis, provide a structured response in JSON format.

Finally, identify 2-3 specific sentences from the SOP that are weak or could be more impactful. For each, provide the original sentence, a rewritten suggestion, and a brief reason for the improvement. Populate this in the \`paraphraseInsights\` array.

The SOP text is:
---
${sopText}
---
`;

export async function* analyzeSOPStream(sopText: string) {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const prompt = getSOPPrompt(sopText);

    try {
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: sopAnalysisSchema,
                temperature: 0.5,
            }
        });

        for await (const chunk of response) {
            yield chunk.text;
        }

    } catch (error) {
        console.error("Gemini API stream call for SOP analysis failed:", error);
        throw new Error("Failed to get streaming analysis from AI.");
    }
}

export async function* getAIChatResponseStream(history: ChatMessage[], newMessage: string, context: string) {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const model = 'gemini-2.5-flash';

    // Format the history correctly for the API
    const contents = [
        ...history.flatMap(h => ({
            role: h.role,
            parts: h.parts.map(p => ({ text: p.text }))
        })),
        { role: 'user', parts: [{ text: newMessage }] }
    ];

    try {
        const response = await ai.models.generateContentStream({
            model: model,
            contents: contents,
            config: {
              systemInstruction: `You are a friendly and helpful study abroad assistant for a platform called GradNiche. Your goal is to answer user questions based on the information provided about the platform's offerings. Be concise and encouraging. Here is some context about the universities and destinations featured on GradNiche:\n\n${context}\n\nOnly use this information to answer questions. If the user asks something outside of this context, politely state that you can only provide information about the destinations and universities featured on GradNiche.`,
              temperature: 0.7,
            }
        });

        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Gemini API chat stream call failed:", error);
        throw new Error("Failed to get streaming chat response from AI.");
    }
}