// Claude AI service for lead categorization
// More cost-effective alternative to OpenAI

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
  // For now, provide a simple rule-based categorization
  // This can be upgraded to use Claude API when credentials are available
  
  const messageLower = message.toLowerCase();
  
  // Simple keyword-based categorization
  let category: LeadCategorization['category'] = "general";
  let urgency = 3;
  let suggestedResponse = "Thank you for your message. We'll get back to you shortly.";
  
  // Rental inquiry detection
  if (messageLower.includes('rent') || messageLower.includes('lease') || 
      messageLower.includes('available') || messageLower.includes('apartment') ||
      messageLower.includes('unit') || messageLower.includes('bedroom')) {
    category = "rental_inquiry";
    urgency = 4;
    suggestedResponse = "Thanks for your interest! Our property is available. I'd be happy to schedule a viewing. When would be a good time for you?";
  }
  
  // Maintenance requests
  else if (messageLower.includes('broken') || messageLower.includes('repair') || 
           messageLower.includes('fix') || messageLower.includes('maintenance') ||
           messageLower.includes('leak') || messageLower.includes('heat') ||
           messageLower.includes('ac') || messageLower.includes('plumbing')) {
    category = "maintenance";
    urgency = 4;
    suggestedResponse = "I received your maintenance request. I'll arrange for someone to take a look as soon as possible. Is this urgent?";
  }
  
  // Viewing requests
  else if (messageLower.includes('view') || messageLower.includes('tour') || 
           messageLower.includes('see') || messageLower.includes('visit') ||
           messageLower.includes('show')) {
    category = "viewing_request";
    urgency = 3;
    suggestedResponse = "I'd be happy to show you the property. Are you available this week? I have openings on weekdays after 5pm and weekends.";
  }
  
  // Visitor entry
  else if (messageLower.includes('here for') || messageLower.includes('visiting') ||
           messageLower.includes('delivery') || messageLower.includes('guest') ||
           messageLower.match(/\d{3}/)) { // Contains 3 digits (likely unit number)
    category = "visitor_entry";
    urgency = 5;
    suggestedResponse = "I'll notify the tenant right away. Please wait for their approval.";
  }
  
  // Payment related
  else if (messageLower.includes('payment') || messageLower.includes('rent due') ||
           messageLower.includes('deposit') || messageLower.includes('late fee')) {
    category = "payment";
    urgency = 3;
    suggestedResponse = "Thanks for reaching out about payment. Let me check your account and get back to you with details.";
  }
  
  // Extract basic info
  const extractedInfo: LeadCategorization['extractedInfo'] = {};
  
  // Try to extract name (first word if it looks like a name)
  const words = message.split(' ');
  if (words.length > 0 && words[0].length > 2 && /^[A-Za-z]+$/.test(words[0])) {
    extractedInfo.name = words[0];
  }
  
  // Extract email if present
  const emailMatch = message.match(/[\w\.-]+@[\w\.-]+\.\w+/);
  if (emailMatch) {
    extractedInfo.email = emailMatch[0];
  }
  
  // Extract budget mentions
  const budgetMatch = message.match(/\$[\d,]+/);
  if (budgetMatch) {
    extractedInfo.budget = budgetMatch[0];
  }
  
  console.log(`[CATEGORIZATION] ${phoneNumber}: "${message}" -> ${category} (urgency: ${urgency})`);
  
  return {
    category,
    urgency,
    suggestedResponse,
    extractedInfo
  };
}

export async function generateFollowUpMessage(
  leadCategory: string,
  originalMessage: string,
  daysSinceLastContact: number
): Promise<string> {
  // Simple follow-up message generation
  let followUp = "Hi! Just checking in to see if you have any questions.";
  
  switch (leadCategory) {
    case 'rental_inquiry':
      if (daysSinceLastContact <= 1) {
        followUp = "Hi! I wanted to follow up on your rental inquiry. Are you still looking for a place?";
      } else if (daysSinceLastContact <= 3) {
        followUp = "Just checking if you're still interested in viewing our property. I have some availability this week.";
      } else {
        followUp = "Hope you're doing well! Our property is still available if you're still looking. Let me know if you'd like to schedule a viewing.";
      }
      break;
      
    case 'viewing_request':
      followUp = "Hi! Following up on your request to view the property. I have some openings this week - would any of these times work for you?";
      break;
      
    case 'maintenance':
      followUp = "Checking in on your maintenance request. Has the issue been resolved? Please let me know if you need any updates.";
      break;
      
    default:
      followUp = "Hi! Just wanted to follow up on your message. Is there anything else I can help you with?";
  }
  
  return followUp;
}