"use client";

import { useState, useCallback, useRef } from "react";

export function useClipboard(resetDelay = 3000) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setCopiedText(text);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        setCopiedText(null);
      }, resetDelay);
    },
    [resetDelay]
  );

  return { copied, copiedText, copy };
}
