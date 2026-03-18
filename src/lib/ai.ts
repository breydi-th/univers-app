export interface GeneratedCredentials {
  id_user: string;
  password_user: string;
}

/**
 * Generates a unique username and a secure password using OpenRouter (GPT).
 */
export async function generateCredentials(firstName: string, lastName: string, role: 'student' | 'teacher' | 'admin'): Promise<GeneratedCredentials> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
  
  let idInstruction = "The username should be lowercase, without spaces or special characters (except dots).";
  if (role === 'admin') {
    idInstruction = "The username MUST be a professional email address (e.g. firstname.lastname@univers-ouanaminthe.edu).";
  }

  const prompt = `Generate a unique, professional identifier and a highly secure password for a new ${role} named "${firstName} ${lastName}". 
  ${idInstruction}
  The password MUST be extremely secure, at least 12 characters long, and contain a random mix of uppercase letters, lowercase letters, numbers, and multiple special characters (!@#$%^&*).
  Return the response ONLY as a JSON object with the following exact structure:
  {
    "id_user": "generated_identifier",
    "password_user": "generated_password"
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
          { role: "system", content: "You are a highly secure identity generator for a school administration system." },
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
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    
    let username = `${firstName.toLowerCase().charAt(0)}.${lastName.toLowerCase()}${randomSuffix}`.replace(/[^a-z0-9.]/g, '');
    if (role === 'admin') {
      username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@univers-ouanaminthe.edu`.replace(/[^a-z0-9.@-]/g, '');
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 14; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return {
      id_user: username,
      password_user: password
    };
  }
}
