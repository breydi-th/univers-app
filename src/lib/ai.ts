export interface GeneratedCredentials {
  id_user: string;
  password_user: string;
}

/**
 * Generates a unique username and a secure password using OpenRouter (GPT).
 */
export async function generateCredentials(firstName: string, lastName: string, role: 'student' | 'teacher'): Promise<GeneratedCredentials> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
  
  const prompt = `Generate a unique, short, and professional username and a secure 8-character password for a new ${role} named "${firstName} ${lastName}". 
  The username should be lowercase, without spaces or special characters (except dots).
  The password should be easy to type but include letters and numbers.
  Return the response ONLY as a JSON object with the following structure:
  {
    "id_user": "username",
    "password_user": "password"
  }`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // Required by OpenRouter
        "X-Title": "Univers App", // Recommended by OpenRouter
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Very efficient and cost-effective model
        messages: [
          { role: "system", content: "You are a specialized identity generator for a school administration system." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" } // Tell the model to output JSON
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    return JSON.parse(content);

  } catch (error) {
    console.error('Error generating credentials via OpenRouter:', error);
    // Fallback in case of failure
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const username = `${firstName.toLowerCase().charAt(0)}.${lastName.toLowerCase()}${randomSuffix}`.replace(/[^a-z.]/g, '');
    const password = Math.random().toString(36).slice(-8);
    return {
      id_user: username,
      password_user: password
    };
  }
}
