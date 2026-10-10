import { useEffect, useRef, useState } from "react";

// Only Razorpay's own checkout script is allowed to run from admin-pasted code.
const ALLOWED_SCRIPT_HOST = "https://checkout.razorpay.com/";

export function isPaymentUrl(value: string) {
  return /^https?:\/\/\S+$/.test(value.trim());
}

export function hasRazorpayButton(html: string) {
  return /<script[^>]+src=["']https:\/\/checkout\.razorpay\.com\//i.test(html);
}

const siteButton =
  "inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-sm font-bold tracking-wider text-primary-foreground shadow-lime transition-opacity hover:opacity-90 disabled:opacity-60";

// Shows OUR button. Razorpay's own button is loaded invisibly behind it, and a click
// on ours triggers theirs, so Razorpay's checkout opens straight away.
export function PaymentButton({ html, label = "PAY NOW →" }: { html: string; label?: string }) {
  const hostRef = useRef<HTMLFormElement>(null);
  const [ready, setReady] = useState(false);

  // Razorpay draws its button as a link: <span class="razorpay-payment-button"><a href="https://razorpay.com/payment-button/...">
  const findRazorpayLink = () =>
    hostRef.current?.querySelector<HTMLAnchorElement>('a[href*="razorpay.com"]') ?? null;
  const findRazorpayButton = () =>
    findRazorpayLink() ??
    hostRef.current?.querySelector<HTMLElement>(
      "button.razorpay-payment-button, .razorpay-payment-button, button[type=submit], input[type=submit]",
    ) ??
    null;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setReady(false);
    host.innerHTML = "";

    const check = () => {
      if (findRazorpayButton()) setReady(true);
    };
    const observer = new MutationObserver(check);
    observer.observe(host, { childList: true, subtree: true });

    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("script").forEach((old) => {
      const src = old.getAttribute("src") ?? "";
      if (!src.startsWith(ALLOWED_SCRIPT_HOST)) return;
      const script = document.createElement("script");
      Array.from(old.attributes).forEach((a) => script.setAttribute(a.name, a.value));
      host.appendChild(script);
    });
    check();
    return () => {
      observer.disconnect();
      host.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  const pay = () => {
    const link = findRazorpayLink();
    if (link?.href) {
      // go straight to Razorpay's payment page
      window.location.assign(link.href);
      return;
    }
    findRazorpayButton()?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button type="button" className={siteButton} onClick={pay} disabled={!ready}>
        {ready ? label : "LOADING PAYMENT…"}
      </button>
      {/* Razorpay's own button, kept invisible behind ours */}
      <form
        ref={hostRef}
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
