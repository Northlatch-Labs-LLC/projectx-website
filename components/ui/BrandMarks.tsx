// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import type { SVGProps } from 'react';

export type MarkProps = SVGProps<SVGSVGElement>;

export function SuiMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="px-brand-sui" x1="16" y1="3" x2="16" y2="29">
          <stop stopColor="#6FBCF0" />
          <stop offset="1" stopColor="#2A7FD4" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.4c4.6 5.7 8 9.9 8 14.2a8 8 0 1 1-16 0C8 13.3 11.4 9.1 16 3.4Z"
        fill="url(#px-brand-sui)"
      />
      <path
        d="M11.6 18.6c-.6 3.3 1.4 6 4.9 6.6"
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SwitchboardMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="px-brand-sb" x1="5" y1="8" x2="27" y2="24">
          <stop stopColor="#C9F24D" />
          <stop offset="1" stopColor="#5BD4A4" />
        </linearGradient>
      </defs>
      <path
        d="M5 8.5 15.5 16 5 23.5"
        stroke="url(#px-brand-sb)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8.5 24.5 16 14 23.5"
        stroke="url(#px-brand-sb)"
        strokeOpacity="0.45"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26.5" cy="16" r="2.4" fill="#C9F24D" />
    </svg>
  );
}

export function CetusMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="px-brand-cetus" x1="4" y1="16" x2="28" y2="16">
          <stop stopColor="#28E0C8" />
          <stop offset="1" stopColor="#1E9BD8" />
        </linearGradient>
      </defs>
      <path
        d="M4 19.5c3-4.5 5.4-4.5 8 0s5.2 4.5 8 0 5-4.5 8 0"
        stroke="url(#px-brand-cetus)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M4 12.5c3-4.5 5.4-4.5 8 0s5.2 4.5 8 0 5-4.5 8 0"
        stroke="url(#px-brand-cetus)"
        strokeOpacity="0.4"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UsdcMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="13" fill="#2775CA" />
      <path
        d="M16 7.6v16.8"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M19.9 11.7c-.8-1.3-2.2-2-3.9-2-2.4 0-4 1.3-4 3.2 0 1.8 1.3 2.7 4 3.3 2.7.6 4 1.5 4 3.3 0 1.9-1.6 3.2-4 3.2-1.8 0-3.3-.8-4.1-2.2"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ValidatorMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="px-brand-val" x1="16" y1="4" x2="16" y2="28">
          <stop stopColor="#FFD37A" />
          <stop offset="1" stopColor="#E39A1B" />
        </linearGradient>
      </defs>
      <path d="m16 4.6 11 5.7-11 5.7-11-5.7 11-5.7Z" fill="url(#px-brand-val)" />
      <path
        d="m5 16 11 5.7L27 16"
        stroke="url(#px-brand-val)"
        strokeOpacity="0.7"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m5 21.7 11 5.7 11-5.7"
        stroke="url(#px-brand-val)"
        strokeOpacity="0.4"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectXApiMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="px-brand-api-a" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8ef2ff" />
          <stop offset="1" stopColor="#2b87ea" />
        </linearGradient>
        <linearGradient id="px-brand-api-b" x1="29" y1="5" x2="6" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ce7b4" />
          <stop offset="1" stopColor="#22b076" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="12.6" stroke="url(#px-brand-api-a)" strokeOpacity="0.4" strokeWidth="1.5" />
      <path d="M8.8 8.8 23.2 23.2" stroke="url(#px-brand-api-a)" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M23.2 8.8 8.8 23.2" stroke="url(#px-brand-api-b)" strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.2" fill="#05080f" />
    </svg>
  );
}

export function AptosMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="13" fill="#0E1A16" stroke="#3AD6A0" strokeOpacity="0.5" strokeWidth="1.4" />
      <path
        d="M8 13.2h6.6l2-2.3h6.1M6.6 19.1h7.7l2 2.3h7.5"
        stroke="#3AD6A0"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MovementMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="px-brand-move" x1="6" y1="24" x2="26" y2="7">
          <stop stopColor="#FFE55C" />
          <stop offset="1" stopColor="#FFB020" />
        </linearGradient>
      </defs>
      <path
        d="M5 24 16 5l11 19"
        stroke="url(#px-brand-move)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.6 24 16 14.5 21.4 24"
        stroke="url(#px-brand-move)"
        strokeOpacity="0.45"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
