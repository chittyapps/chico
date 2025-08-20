import twilio from 'twilio';

// Check if Twilio credentials are available
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_ACCOUNT_SID_ENV_VAR;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || process.env.TWILIO_AUTH_TOKEN_ENV_VAR;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_PHONE_NUMBER_ENV_VAR;

const hasTwilioCredentials = twilioAccountSid && twilioAuthToken && twilioPhoneNumber;

// Only initialize client if credentials are available
const client = hasTwilioCredentials 
  ? twilio(twilioAccountSid, twilioAuthToken)
  : null;

export interface SMSResponse {
  success: boolean;
  messageSid?: string;
  error?: string;
}

export async function sendSMS(to: string, message: string): Promise<SMSResponse> {
  if (!client || !hasTwilioCredentials) {
    console.log(`[DEMO MODE] Would send SMS to ${to}: ${message}`);
    return {
      success: false,
      error: "Twilio credentials not configured. Please add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to environment variables."
    };
  }

  try {
    const twilioMessage = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to
    });

    return {
      success: true,
      messageSid: twilioMessage.sid
    };
  } catch (error: any) {
    console.error("Failed to send SMS:", error);
    return {
      success: false,
      error: error.message || "Failed to send SMS"
    };
  }
}

export async function sendVisitorApprovalRequest(tenantPhone: string, visitorPhone: string, propertyName: string): Promise<SMSResponse> {
  const message = `🔔 Visitor request for ${propertyName}. Someone at ${visitorPhone} is requesting entry. Reply YES to approve, NO to deny, or SAVE to add to trusted list.`;
  
  return sendSMS(tenantPhone, message);
}

export async function sendVisitorApprovalResponse(visitorPhone: string, approved: boolean, propertyName: string): Promise<SMSResponse> {
  const message = approved 
    ? `✅ Access approved for ${propertyName}! You may enter.`
    : `❌ Access denied for ${propertyName}. Please contact the tenant directly.`;
  
  return sendSMS(visitorPhone, message);
}

export async function sendLeadAutoResponse(phone: string, message: string): Promise<SMSResponse> {
  return sendSMS(phone, message);
}

export function parseIncomingSMS(body: any) {
  return {
    from: body.From || "",
    to: body.To || "",
    message: body.Body || "",
    messageSid: body.MessageSid || ""
  };
}
