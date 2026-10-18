import type { CSSProperties, ReactNode } from "react";
import { DEFAULT_ORDER_MESSAGE, whatsappLink } from "@/lib/site";

export function Gumball({
  color,
  size = 40,
  className = "",
  style,
}: {
  color: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`gb ${className}`}
      style={{ ["--c" as string]: color, width: size, height: size, ...style }}
    />
  );
}

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden fill="currentColor">
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.96 12.96 0 0 0 16.04 29C23.2 29 29.04 23.18 29.04 16S23.2 3 16.04 3Zm0 23.64c-1.95 0-3.86-.52-5.53-1.52l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.6 10.6 0 0 1-1.63-5.66c0-5.87 4.8-10.65 10.72-10.65 5.9 0 10.7 4.78 10.7 10.65 0 5.87-4.8 10.64-10.7 10.64Zm5.87-7.97c-.32-.16-1.9-.93-2.2-1.04-.29-.1-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.44 5.47 4.83.77.33 1.36.52 1.83.67.77.24 1.47.21 2.02.13.62-.09 1.9-.77 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function WaButton({
  message = DEFAULT_ORDER_MESSAGE,
  children,
  variant = "primary",
  className = "",
}: {
  message?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${variant} ${className}`}
      data-magnetic
    >
      <span className="btn-icon">
        <WhatsAppIcon />
      </span>
      <span className="btn-label">{children}</span>
    </a>
  );
}
