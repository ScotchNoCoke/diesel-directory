export const prerender = false;

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

    if (!businessName || !phone || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required business, phone, or email fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const listingWebsiteUrl = website || '';
    const isVerifiedDomain = isDomainEmailMatch(email, listingWebsiteUrl);

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

    return new Response(
      JSON.stringify({
        success: true,
        status: 'pending_review',
        message: 'Claim received. Standard webmail or unmatched domain detected — queued for phone/ABN verification.',
        claim: claimRecord
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Internal server error processing claim.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
