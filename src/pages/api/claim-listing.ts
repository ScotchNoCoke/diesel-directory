import type { APIRoute } from 'astro';
import { isDomainEmailMatch } from '../../lib/verifyDomain';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      businessName,
      suburb,
      contactName,
      phone,
      email,
      abn,
      website,
      afterHoursDispatch,
      bDoubleAccess,
      roadTrainAccess,
      notes
    } = data;

    // 1. Basic server-side guard
    if (!businessName || !phone || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required business, phone, or email fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Perform Domain Email Matching
    // Fall back to listing website if passed, or query your listing store
    const listingWebsiteUrl = website || '';
    const isVerifiedDomain = isDomainEmailMatch(email, listingWebsiteUrl);

    // 3. Routing decision
    const claimRecord = {
      businessName,
      suburb,
      contactName,
      phone,
      email,
      abn,
      verificationStatus: isVerifiedDomain ? 'domain_verified' : 'pending_manual_review',
      submittedAt: new Date().toISOString(),
      flags: {
        afterHoursDispatch: Boolean(afterHoursDispatch),
        bDoubleAccess: Boolean(bDoubleAccess),
        roadTrainAccess: Boolean(roadTrainAccess)
      },
      notes
    };

    if (isVerifiedDomain) {
      // In production: dispatch one-time magic link / token to email
      return new Response(
        JSON.stringify({
          success: true,
          status: 'verified',
          message: 'Official domain match confirmed. Instant verification link dispatched to your inbox.',
          claim: claimRecord
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If webmail (@gmail, etc.) or no domain match, queue for review
    return new Response(
      JSON.stringify({
        success: true,
        status: 'pending_review',
        message: 'Claim received. Standard webmail or unmatched domain detected — queued for phone/ABN verification.',
        claim: claimRecord
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error processing claim.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
