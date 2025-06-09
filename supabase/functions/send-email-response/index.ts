
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  name: string;
  responseText: string;
  originalMessage: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Email function called with method:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const { to, name, responseText, originalMessage }: EmailRequest = await req.json();
    
    console.log("Sending email to:", to, "for:", name);

    if (!to || !name || !responseText) {
      throw new Error("Missing required fields: to, name, or responseText");
    }

    const emailResponse = await resend.emails.send({
      from: "Suporte <onboarding@resend.dev>",
      to: [to],
      subject: "Resposta da sua mensagem - Empresa",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Olá ${name}!</h2>
          
          <p style="color: #666; margin-bottom: 20px;">
            Obrigado por entrar em contato conosco. Aqui está nossa resposta para sua mensagem:
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Sua mensagem original:</h3>
            <p style="color: #666; font-style: italic;">"${originalMessage}"</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #333; margin-bottom: 10px;">Nossa resposta:</h3>
            <p style="color: #333; line-height: 1.6;">${responseText}</p>
          </div>
          
          <p style="color: #666; margin-top: 30px;">
            Se você tiver alguma dúvida adicional, não hesite em nos contatar novamente.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center;">
            Este e-mail foi enviado automaticamente pelo nosso sistema.<br>
            © 2024 Empresa. Todos os direitos reservados.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email-response function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Erro interno do servidor",
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
