const cache = new Map<string, Map<string, string>>();
const pending = new Map<string, Promise<Map<string, string>>>();

export async function getWordlist(url: string): Promise<Map<string, string>> {
  const cached = cache.get(url);
  if (cached) return cached;

  const inflight = pending.get(url);
  if (inflight) return inflight;

  const promise = fetchAndParse(url);
  pending.set(url, promise);

  try {
    const wordMap = await promise;
    cache.set(url, wordMap);
    return wordMap;
  } finally {
    pending.delete(url);
  }
}

async function fetchAndParse(url: string): Promise<Map<string, string>> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch EFF wordlist: ${response.status}`);
  }

  const text = await response.text();
  const wordMap = new Map<string, string>();

  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const [index, word] = trimmed.split("\t");
    if (index && word) {
      wordMap.set(index, word);
    }
  }

  return wordMap;
}
