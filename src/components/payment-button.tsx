import { useEffect, useRef } from "react";

// Only Razorpay's own checkout script is allowed to run from admin-pasted code.
const ALLOWED_SCRIPT_HOST = "https://checkout.razorpay.com/";

export function isPaymentUrl(value: string) {
  return /^https?:\/\/\S+$/.test(value.trim());
}

export function hasRazorpayButton(html: string) {
  return /<script[^>]+src=["']https:\/\/checkout\.razorpay\.com\//i.test(html);
}

// Shows Razorpay's own button, exactly as Razorpay generates it.
export function PaymentButton({ html }: { html: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const host = formRef.current;
    if (!host) return;
    host.innerHTML = "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("script").forEach((old) => {
      const src = old.getAttribute("src") ?? "";
      if (!src.startsWith(ALLOWED_SCRIPT_HOST)) return;
      const script = document.createElement("script");
      Array.from(old.attributes).forEach((a) => script.setAttribute(a.name, a.value));
      host.appendChild(script);
    });
    return () => {
      host.innerHTML = "";
    };
  }, [html]);

  return <form ref={formRef} className="flex justify-center" />;
}
