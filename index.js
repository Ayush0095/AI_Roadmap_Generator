import Groq from "groq-sdk";
import "dotenv/config";
import express from "express";
import cors from "cors";

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/generate-roadmap",async(req,res)=>{
    try {
        const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an expert product strategist and professional roadmap architect with 15+ years of experience in tech project planning, stakeholder alignment, and Agile execution.
          Yur job is to generate the roadmap for: ${req.body.topic}.
          And, format as JSON array, Here is the sample structure {title:"XYZ",description:"Lorem Ipsem....",id:"1",estimated_time:"14 hours"}.
          Important Note: Kindly adhere to the JSON structure provided to you as sample structure.`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  let aiContent = chatCompletion.choices[0]?.message?.content;
  console.log(aiContent);
  //cleaning of the content
    } catch (error) {
        console.log("We have encountered an error",error)
    }
    //   // Print the completion returned by the LLM.
    // console.log(chatCompletion.choices[0]?.message?.content || "");
}) 

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});