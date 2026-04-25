import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getRestaurantInsights(data: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Tu es un expert en gestion de restaurant (Revenue Management).
      Analyse les données suivantes et donne 3 conseils stratégiques courts pour améliorer le rendement :
      Données : ${JSON.stringify(data)}
      Réponds en Français. Format: liste à puces.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "L'IA est temporairement indisponible pour l'analyse.";
  }
}
