// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui /|\ · Co-authored-by: Claude
'use client';

import { useState } from 'react';
import { Check, Copy } from './Icons';

/**
 * A block of text a reader is expected to put in their own repository, with the copy button
 * beside it rather than the instruction "type this".
 *
 * The reason it exists is narrower than "code blocks are nice". `.protocolx-verify.json` is the
 * one file standing between a reader and five check runs, and a config transcribed by hand is a
 * config with a smart quote in it — the runner then refuses it, and the reader concludes the
 * product is broken rather than that their editor helped. Copying is the difference between a
 * three-second setup and a support conversation.
 *
 * `AddressChip` already carries this behaviour for on-chain identifiers, and this deliberately
 * mirrors its states rather than inventing a second vocabulary: the tick replaces the clipboard
 * for 1.6 seconds and nothing else moves. The clipboard API is refused outright in some contexts
 * (an insecure origin, a permissions policy), so the failure path leaves the text visible and
 * selectable — the block is readable whether or not the button ever works.
 */
export function CopyBlock({
  code,
  label,
  caption,
  className = '',
}: {
  code: string;
  /** What the button copies, said in words, for a screen reader that cannot see the block. */
  label: string;
  /** The file name or path this belongs at, shown above the block. */
  caption?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Deliberately silent: the text is on the page and selectable, so a refused clipboard is a
      // missing convenience, not a missing instruction.
    }
  }

  return (
    <div className={`panel w-full overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-3">
        <span className="font-mono text-[0.8125rem] text-px-faint">{caption ?? label}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : `Copy ${label}`}
          className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-1 text-[0.8125rem] text-px-faint transition hover:text-px-accent"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-px-prize" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[0.85rem] leading-[1.8] text-px-muted">
        {code}
      </pre>
    </div>
  );
}
