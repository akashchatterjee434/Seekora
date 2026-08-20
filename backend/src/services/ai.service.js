import { ChatGoogle } from "@langchain/google";

const llm = new ChatGoogle({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-3.7-flash",
});


export async function testAi(){
    llm.invoke("what is the capital of assam?").then((response)=>{
        console.log(response.text);
        
    })
}