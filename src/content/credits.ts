/**
 * Credits for third-party photos (Creative Commons). Every photo used on the
 * site must be listed here; the footer renders this list. Filled in with the
 * homepage photos in step 5.
 */
export type PhotoCredit = {
  subject: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export const photoCredits: PhotoCredit[] = [];
