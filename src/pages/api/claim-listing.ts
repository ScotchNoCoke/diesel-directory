import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { businessName, suburb, contactName, phone, email, abn, afterHoursDispatch, bDoubleAccess } = data;

    // Basic server-side guard
    if (!businessName || !phone || !email) {
      return new Response(JSON.stringify({ error: 'Missing required business or contact fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Clean ABN (11 digits standard Australian format)
    const cleanAbn = (abn || '').replace(/\s+/g, '');
    if (cleanAbn && !/^\d{11}$/.test(cleanAbn)) {
      return new Response(JSON.stringify({ error: 'Invalid ABN format. Must be an 11-digit Australian Business Number.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`[Listing Claim Received] ${businessName} (${suburb}) by ${contactName} - Phone: ${phone}, Email: ${email}, ABN: ${cleanAbn}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Listing update request received. Our verification team will cross-check the ABN and contact number within 24 hours.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Server error processing listing claim.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
