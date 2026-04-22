interface Props {
  endpoint: string;
  query?: string;
  wrappedByKey?: string;
}

/**
 * Helper para peticiones a Strapi v4+ con Soporte de Token
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    if (typeof query === 'string') {
      url.search = query;
    } else {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value as string);
      });
    }
  }

  const headers: RequestInit["headers"] = {};
  
  if (import.meta.env.STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${import.meta.env.STRAPI_TOKEN}`;
  }

  try {
    console.log(`🔍 Intentando conectar a: ${url.toString()}`);
    const res = await fetch(url.toString(), { 
      headers,
      signal: AbortSignal.timeout(10000) // Timeout de 10s para evitar cuelgues
    });

    if (!res.ok) {
      console.error(`❌ Strapi Error: ${res.status} ${res.statusText} at ${endpoint}`);
      throw new Error(`Failed to fetch from Strapi: ${res.status}`);
    }

    const data = await res.json();
    return (wrappedByKey ? data[wrappedByKey] : data) as T;
  } catch (error) {
    console.error(`🚨 Fatal API Error [${endpoint}]:`, error);
    return null as any;
  }
}

/**
 * Optimiza URLs de Cloudinary inyectando f_auto,q_auto
 */
export function optimizeImage(url: string | undefined, width?: number): string {
  if (!url) return 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80';
  if (url.includes('upload/') && url.includes('cloudinary')) {
    // f_auto: formato automático (webp/avif)
    // q_auto: calidad automática
    // w_X: redimensionar al ancho X
    // c_fill: recortar para llenar el contenedor
    const params = width ? `f_auto,q_auto,w_${width},c_fill` : 'f_auto,q_auto';
    return url.replace('upload/', `upload/${params}/`);
  }
  return url;
}
