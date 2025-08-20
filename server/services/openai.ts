import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface LeadCategorization {
  category: "rental_inquiry" | "maintenance" | "viewing_request" | "general" | "visitor_entry" | "tenant_communication" | "complaint" | "payment";
  urgency: number; // 1-5 scale
  suggestedResponse: string;
  extractedInfo: {
    name?: string;
    email?: string;
    preferredContactMethod?: string;
    timeframe?: string;
    budget?: string;
    specificNeeds?: string;
  };
}

export async function categorizeLeadMessage(message: string, phoneNumber: string): Promise<LeadCategorization> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert at categorizing property management inquiries. Analyze the message and classify it into one of these categories:
          - rental_inquiry: Someone interested in renting
          - maintenance: Repair/maintenance requests from tenants
          - viewing_request: Wanting to schedule a property tour
          - general: General questions about properties
          - visitor_entry: Requesting visitor access/entry
          - tenant_communication: Current tenant general communication
          - complaint: Tenant complaints or issues
          - payment: Payment-related inquiries
          
          Also determine urgency (1-5, where 5 is most urgent) and suggest an appropriate response.
          Extract any useful information like name, email, contact preferences, timeframe, budget, or specific needs.
          
          Respond with JSON in this exact format: {
            "category": "category_name",
            "urgency": number,
            "suggestedResponse": "response text",
            "extractedInfo": {
              "name": "extracted name if found",
              "email": "extracted email if found",
              "preferredContactMethod": "phone/text/email if mentioned",
              "timeframe": "when they need/want something",
              "budget": "budget mentioned if any",
              "specificNeeds": "specific requirements mentioned"
            }
          }`
        },
        {
          role: "user",
          content: `Phone: ${phoneNumber}\nMessage: ${message}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      category: result.category || "general",
      urgency: Math.max(1, Math.min(5, result.urgency || 3)),
      suggestedResponse: result.suggestedResponse || "Thank you for your message. We'll get back to you shortly.",
      extractedInfo: result.extractedInfo || {}
    };
  } catch (error) {
    console.error("Failed to categorize lead:", error);
    // Return default categorization on error
    return {
      category: "general",
      urgency: 3,
      suggestedResponse: "Thank you for your message. We'll get back to you shortly.",
      extractedInfo: {}
    };
  }
}

export async function generateFollowUpMessage(
  leadCategory: string,
  originalMessage: string,
  daysSinceLastContact: number
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Generate a friendly, professional follow-up message for a property management lead. 
          Keep it concise, personable, and focused on moving the conversation forward.
          Adjust tone based on days since last contact and lead category.`
        },
        {
          role: "user",
          content: `Category: ${leadCategory}
          Original message: ${originalMessage}
          Days since last contact: ${daysSinceLastContact}
          
          Generate a follow-up message that feels natural and helpful.`
        }
      ],
    });

    return response.choices[0].message.content || "Hi! Just checking in to see if you have any questions about our properties.";
  } catch (error) {
    console.error("Failed to generate follow-up:", error);
    return "Hi! Just checking in to see if you have any questions about our properties.";
  }
}
