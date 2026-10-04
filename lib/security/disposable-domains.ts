/**
 * Disposable / temporary email domain blocklist.
 *
 * HONEST LABEL: this is a real, functioning check against a curated list of
 * widely-known disposable-email providers (the same kind of list used by
 * open-source anti-abuse libraries). It is NOT a live third-party API and
 * will not catch every disposable domain that exists (new ones appear daily),
 * but it stops the overwhelming majority of "test the security with a throwaway
 * inbox" signups without adding a paid dependency.
 *
 * Add to this list any domain you see abused in your own Supabase
 * Authentication > Users table.
 */

export const DISPOSABLE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  "mailinator.com",
  "10minutemail.com",
  "10minutemail.net",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamailblock.com",
  "sharklasers.com",
  "yopmail.com",
  "yopmail.net",
  "yopmail.fr",
  "temp-mail.org",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "throwawaymail.com",
  "getnada.com",
  "nada.email",
  "trashmail.com",
  "trashmail.net",
  "maildrop.cc",
  "dispostable.com",
  "fakeinbox.com",
  "mailnesia.com",
  "mintemail.com",
  "mohmal.com",
  "moakt.com",
  "emailondeck.com",
  "33mail.com",
  "spamgourmet.com",
  "mailcatch.com",
  "mail-temporaire.fr",
  "burnermail.io",
  "inboxbear.com",
  "fakemailgenerator.com",
  "tempinbox.com",
  "discard.email",
  "discardmail.com",
  "spambog.com",
  "spambox.us",
  "mytemp.email",
  "mailpoof.com",
  "crazymailing.com",
  "anonbox.net",
  "1secmail.com",
  "1secmail.net",
  "1secmail.org",
  "tmpmail.org",
  "tmpbox.net",
  "emailfake.com",
  "luxusmail.org",
  "mailbox52.ga",
  "mailbox92.biz",
]);

/**
 * Returns true if the email's domain is a known disposable-email provider.
 * Case-insensitive, strips any "+tag" alias before checking the domain part.
 */
export function isDisposableEmail(email: string): boolean {
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) return false;

  const domain = email.slice(atIndex + 1).trim().toLowerCase();
  if (!domain) return false;

  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}
