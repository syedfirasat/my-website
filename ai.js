export async function handler(event) {
  const body = JSON.parse(event.body || "{}");

  const OPENAI_KEY = process.env.OPENAI_API_KEY;

  let prompt = "";

  if(body.messageType==="weekly"){
    prompt=`Generate a motivational weekly summary for ${body.completed} completed days.`;
  }
  else if(body.messageType==="motivation"){
    prompt=`Give motivational message. Streak:${body.streak}. Missed:${body.missed}. Tone supportive calm.`;
  }
  else{
    prompt=`Divide ${body.goal} into 100 progressive daily tasks.`;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${OPENAI_KEY}`
    },
    body:JSON.stringify({
      model:"gpt-4o-mini",
      messages:[{role:"user",content:prompt}]
    })
  });

  const data=await response.json();
  return {
    statusCode:200,
    body:JSON.stringify({text:data.choices[0].message.content})
  };
}
