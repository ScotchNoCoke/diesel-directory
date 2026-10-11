export async function onRequestPost(context: any) {
  const { request } = context;
  try {
    const data = await request.json();
    const { businessName, email, phone, website } = data;

    if (!businessName || !phone || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required business, phone, or email fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Domain check
    const emailDomain = email.split('@')[1]?.toLowerCase().trim() || '';
    const websiteDomain = (website || '').replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase().trim();

    const isMatch = websiteDomain && (emailDomain === websiteDomain || emailDomain.endsWith('.' + websiteDomain));

    if (isMatch) {
      return new Response(
        JSON.stringify({
          status: 'verified',
          message: 'Official domain match confirmed. Instant verification link dispatched to your inbox.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'pending_review',
        message: 'Claim received. Unmatched domain or personal email detected — queued for phone/ABN verification.'
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Server error processing claim' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
