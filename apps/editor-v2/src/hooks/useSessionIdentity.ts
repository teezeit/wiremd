import { useMemo } from 'react';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

const SESSION_ID_KEY = 'wiremd-session-id';
const SESSION_NAME_KEY = 'wiremd-session-name';

function generateId(): string {
  return crypto.randomUUID();
}

function generateName(): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: ' ',
    style: 'capital',
    length: 2,
  });
}

export function useSessionIdentity(): { sessionId: string; name: string } {
  return useMemo(() => {
    let sessionId = localStorage.getItem(SESSION_ID_KEY);
    let name = localStorage.getItem(SESSION_NAME_KEY);

    if (!sessionId) {
      sessionId = generateId();
      localStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    if (!name) {
      name = generateName();
      localStorage.setItem(SESSION_NAME_KEY, name);
    }

    return { sessionId, name };
  }, []);
}
