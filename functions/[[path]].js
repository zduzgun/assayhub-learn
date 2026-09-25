// Dil öneksiz adresleri (/, /l/<KİMLİK>, /docking/..., /md/...) ziyaretçinin diline yönlendirir.
// Yalnız dist/_routes.json içindeki yollarda çalışır; statik dosyalar bu işlevden geçmez.
import { decideLang, prefixedPath } from '../lib/lang.js';

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const { lang, reason } = decideLang({
    cookie: request.headers.get('Cookie'),
    country: request.cf && request.cf.country,
    acceptLanguage: request.headers.get('Accept-Language')
  });
  const target = prefixedPath(url.pathname, lang);
  if (!target) return context.next();
  return new Response(null, {
    status: 302,
    headers: {
      Location: target + url.search,
      'Cache-Control': 'no-store',
      Vary: 'Cookie, Accept-Language',
      'X-AHL-Lang-Reason': reason,
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}
