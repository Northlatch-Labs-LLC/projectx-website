
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowUpRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Icon>
);

export const ShieldCheck = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const Trophy = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4.5A2.5 2.5 0 0 0 7 8.5M17 6h2.5A2.5 2.5 0 0 1 17 8.5" />
    <path d="M12 14v3M9 20h6M10 17h4" />
  </Icon>
);

export const Layers = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
    <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
  </Icon>
);

export const Lock = (props: IconProps) => (
  <Icon {...props}>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Icon>
);

export const Clock = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const Coins = (props: IconProps) => (
  <Icon {...props}>
    <ellipse cx="9" cy="7" rx="5.5" ry="2.75" />
    <path d="M3.5 7v5c0 1.5 2.5 2.75 5.5 2.75s5.5-1.25 5.5-2.75V7" />
    <path d="M14.5 10.2c2.6.3 4.5 1.4 4.5 2.7v5c0 1.5-2.5 2.8-5.5 2.8-2.4 0-4.4-.8-5.2-1.8" />
  </Icon>
);

export const Code = (props: IconProps) => (
  <Icon {...props}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
  </Icon>
);

export const Book = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
    <path d="M19 18v3H6.5A2.5 2.5 0 0 1 4 18.5" />
  </Icon>
);

export const Chart = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 16v-4M12 16V8M16 16v-6" />
  </Icon>
);

export const Link2 = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10 13a4 4 0 0 0 5.66 0l2.5-2.5a4 4 0 0 0-5.66-5.66l-1.2 1.2" />
    <path d="M14 11a4 4 0 0 0-5.66 0l-2.5 2.5a4 4 0 1 0 5.66 5.66l1.2-1.2" />
  </Icon>
);

export const Copy = (props: IconProps) => (
  <Icon {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </Icon>
);

export const Check = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Icon>
);

export const Menu = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const Close = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const Sparkle = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
  </Icon>
);

export const Warning = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 4.5 21 20H3l9-15.5Z" />
    <path d="M12 10v4M12 17h.01" />
  </Icon>
);

export const Wallet = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M16.5 14.5h.01" />
  </Icon>
);

export const Github = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

export const XSocial = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.53 3H20.5l-6.49 7.42L21.75 21h-5.98l-4.68-6.12L5.72 21H2.75l6.94-7.93L2.5 3h6.13l4.23 5.59L17.53 3Zm-1.04 16.2h1.64L7.6 4.71H5.83L16.49 19.2Z" />
  </svg>
);

export const Discord = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.3 5.36A16.4 16.4 0 0 0 15.3 4.1a.06.06 0 0 0-.07.03c-.17.31-.37.71-.5 1.03a15.2 15.2 0 0 0-4.55 0 10.5 10.5 0 0 0-.51-1.03.06.06 0 0 0-.07-.03c-1.4.24-2.74.66-4 1.26a.06.06 0 0 0-.03.02C2.16 9.1 1.5 12.7 1.83 16.26c0 .02.02.04.04.05a16.6 16.6 0 0 0 4.97 2.5.07.07 0 0 0 .07-.02c.38-.52.72-1.07 1.01-1.65a.06.06 0 0 0-.03-.09 11 11 0 0 1-1.55-.73.06.06 0 0 1 0-.1l.3-.24a.06.06 0 0 1 .07 0 11.8 11.8 0 0 0 10.01 0 .06.06 0 0 1 .07 0l.31.24a.06.06 0 0 1 0 .1c-.5.29-1.01.53-1.56.73a.06.06 0 0 0-.03.09c.3.58.63 1.13 1.01 1.65a.07.07 0 0 0 .07.02 16.5 16.5 0 0 0 4.98-2.5.06.06 0 0 0 .03-.05c.4-4.11-.65-7.68-2.76-10.85a.05.05 0 0 0-.02-.02ZM8.52 14.09c-.98 0-1.79-.9-1.79-2s.79-2 1.8-2c1 0 1.81.91 1.79 2 0 1.1-.79 2-1.8 2Zm6.97 0c-.98 0-1.79-.9-1.79-2s.79-2 1.79-2c1.01 0 1.81.91 1.8 2 0 1.1-.79 2-1.8 2Z" />
  </svg>
);
