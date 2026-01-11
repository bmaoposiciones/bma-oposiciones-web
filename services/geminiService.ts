
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askFirefighterTutor = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Eres el instructor jefe de BMA OPOSICIONES. 
        Tu misión es ayudar con el temario de Bomberos de Alicante.
        Siempre sé motivador y profesional.`,
        temperature: 0.3,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error asking Gemini:", error);
    return "Error en la comunicación con el instructor jefe.";
  }
};

export const generateTopicTest = async (topicTitle: string, topicDescription: string): Promise<Question[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Genera un test técnico de 5 preguntas de opción múltiple para opositores a bomberos sobre el tema: "${topicTitle}". 
      Descripción del contexto: ${topicDescription}.
      Cada pregunta debe tener 4 opciones (A, B, C, D) y una explicación técnica de la respuesta correcta.
      El nivel de dificultad debe ser alto, similar al examen real del Ayuntamiento de Alicante.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              question: { type: Type.STRING },
              options: {
                type: Type.OBJECT,
                properties: {
                  A: { type: Type.STRING },
                  B: { type: Type.STRING },
                  C: { type: Type.STRING },
                  D: { type: Type.STRING },
                },
                required: ["A", "B", "C", "D"]
              },
              correctAnswer: { type: Type.STRING, description: "Solo una letra: A, B, C o D" },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating test:", error);
    throw new Error("No se pudo generar el test por IA.");
  }
};

export const getGeminiAssistantResponse = async (history: ChatMessage[], input: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Actúa como un experto sénior en infraestructura de Google. 
        Responde siempre en español de forma profesional y clara.`,
      },
    });

    const response = await chat.sendMessage({ message: input });
    return response.text;
  } catch (error) {
    console.error("Error in transfer assistant:", error);
    return "Lo siento, hubo un error al procesar tu consulta.";
  }
};
