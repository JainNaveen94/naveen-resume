export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactResult =
  | { ok: true; channel: 'formspree' }
  | { ok: true; channel: 'mailto' }
  | { ok: false; error: string };

export function buildMailtoUrl(
  to: string,
  payload: ContactPayload,
): string {
  const subject = encodeURIComponent(`Portfolio contact from ${payload.name}`);
  const body = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

export async function submitContact(
  payload: ContactPayload,
  recipientEmail: string,
): Promise<ContactResult> {
  const forceMailto = import.meta.env.VITE_FORCE_MAILTO === 'true';
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

  if (forceMailto || !formspreeId?.trim()) {
    window.location.href = buildMailtoUrl(recipientEmail, payload);
    return { ok: true, channel: 'mailto' };
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
    });

    if (response.ok) {
      return { ok: true, channel: 'formspree' };
    }

    if (response.status === 429) {
      window.location.href = buildMailtoUrl(recipientEmail, payload);
      return { ok: true, channel: 'mailto' };
    }

    window.location.href = buildMailtoUrl(recipientEmail, payload);
    return { ok: true, channel: 'mailto' };
  } catch {
    window.location.href = buildMailtoUrl(recipientEmail, payload);
    return { ok: true, channel: 'mailto' };
  }
}
