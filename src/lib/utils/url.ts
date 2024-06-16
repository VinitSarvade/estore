export function normalizeUrl(url: string): string {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  return url;
}

export function getSlugFromCodeAndName(code: string, name: string): string {
  return `${name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')}-${code}`;
}

export function getProductCodeAndNameFromSlug(slug: string): [string, string] {
  const parts = slug.split('-');
  if (parts.length < 2) {
    throw new Error('Invalid slug');
  }
  const code = parts[parts.length - 1];
  const name = parts.slice(0, parts.length - 1).join(' ');
  return [code, name];
}
