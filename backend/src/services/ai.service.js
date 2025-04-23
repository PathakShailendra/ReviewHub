import { GoogleGenAI } from '@google/genai';
import config from '../config/config';

const ai = new GoogleGenAI({ apiKey: config.GOOGLE_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "create a function in js to add two numbers",
    config : {
        systemInstruction: "you are a experienced software engineer, you are expert in MERN stack, you are developing application from 7 years. you write code in such as way that no error will be there, you are wroting a code which is easy to understand and maintainable",
    }
  });
  console.log(response.text);
}
 
await main();