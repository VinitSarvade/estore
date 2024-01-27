const normalizeSrc = (src) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

const IMAGE_BASE = 'https://vinit.dev';

export default function cloudflareLoader({ src, width, height, quality }) {
  const params = [`width=${width}`, `gravity=auto`, `fit=contain`, 'f=auto'];
  if (height) {
    params.push(`height=${height}`);
  }

  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `${IMAGE_BASE}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
