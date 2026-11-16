"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Saves the person's contact card to the visitor's phone.
 *
 * iPhone: Safari opens a served .vcf straight into the contact sheet, so
 * "Create New Contact" is one tap.
 *
 * Android: Chrome will not hand a web page's contact to the Contacts app
 * directly. It first tries an intent that some Contacts apps accept; where
 * the app refuses, Chrome falls back to downloading the file, and a hint
 * tells the visitor to tap Open, then Save.
 */
export function SaveContactButton({ vcfPath }: { vcfPath: string }) {
  const [hint, setHint] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function save(event: React.MouseEvent<HTMLAnchorElement>) {
    const ua = navigator.userAgent;
    if (!/Android/i.test(ua)) return; // iPhone and desktop follow the plain link

    event.preventDefault();
    const vcf = new URL(vcfPath, window.location.href);
    window.location.href =
      `intent://${vcf.host}${vcf.pathname}#Intent;scheme=https;` +
      `action=android.intent.action.VIEW;type=text/x-vcard;` +
      `S.browser_fallback_url=${encodeURIComponent(vcf.href)};end`;

    setHint(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHint(false), 9000);
  }

  return (
    <>
      <a
        href={vcfPath}
        onClick={save}
        className="group flex w-full items-center justify-center gap-3 border border-line-strong bg-paper-raised px-4 py-4 text-xs tracking-[0.16em] text-ink uppercase shadow-[var(--shadow-card)] transition-colors duration-500 hover:border-maroon hover:text-maroon"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4 text-maroon"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
        Save contact to phone
      </a>

      <div
        role="status"
        aria-live="polite"
        className={`fixed inset-x-4 bottom-5 z-40 mx-auto max-w-[430px] border-l-2 border-maroon bg-ink px-5 py-4 text-sm leading-relaxed text-paper shadow-[0_20px_46px_-18px_rgba(28,25,24,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hint ? "visible translate-y-0" : "invisible translate-y-[160%]"
        }`}
      >
        <span className="block font-normal">Almost done</span>
        Tap <b className="font-medium">Open</b> on the download at the bottom of
        your screen, then tap <b className="font-medium">Save</b>.
      </div>
    </>
  );
}
