export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatShortDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatAbhaId(raw?: string): string {
  if (!raw) return 'Not Linked';
  // Example format: 91-4521-8923-1049
  const clean = raw.replace(/\D/g, '');
  if (clean.length === 14) {
    return `${clean.slice(0, 2)}-${clean.slice(2, 6)}-${clean.slice(6, 10)}-${clean.slice(10)}`;
  }
  return raw;
}

export function formatPercent(value?: number): string {
  if (value === undefined || isNaN(value)) return '0%';
  return `${Math.round(value)}%`;
}
