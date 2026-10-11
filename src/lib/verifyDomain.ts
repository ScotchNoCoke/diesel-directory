/**
 * Normalizes a URL or host string to a root hostname without 'www.'
 */
export function extractRootDomain(inputUrlOrDomain: string): string {
  try {
    const urlString = inputUrlOrDomain.startsWith('http')
      ? inputUrlOrDomain
      : `https://${inputUrlOrDomain}`;
    const hostname = new URL(urlString).hostname.toLowerCase();
    return hostname.replace(/^www\./, '');
  } catch {
    return inputUrlOrDomain.trim().toLowerCase();
  }
}

/**
 * Checks if the claimant's email domain matches the listing's website domain
 */
export function isDomainEmailMatch(submittedEmail: string, listingWebsiteUrl: string): boolean {
  if (!submittedEmail || !listingWebsiteUrl) return false;

  const emailDomain = submittedEmail.split('@')[1]?.toLowerCase().trim();
  if (!emailDomain) return false;

  const listingDomain = extractRootDomain(listingWebsiteUrl);

  // Exact match or subdomain (e.g. ops@fleet.roadking.com.au -> roadking.com.au)
  return emailDomain === listingDomain || emailDomain.endsWith(`.${listingDomain}`);
}
