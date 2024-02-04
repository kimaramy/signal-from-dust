function composeOrigin(protocol: string | null, host: string | null) {
  if (protocol && host) {
    return `${protocol}://${host}`;
  }
  return null;
}

function parseCachedOrigin(headers: Headers) {
  /**
   * @see Doc [Origin header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin)
   */
  const autoGeneratedOrigin = headers.get('origin');
  const manuallyGeneratedOrigin = headers.get('x-origin');
  return autoGeneratedOrigin ?? manuallyGeneratedOrigin;
}

function parseOrigin(headers: Headers) {
  /**
   * @see Doc [X-Fowarded-Proto header](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Forwarded-Proto)
   */
  const protocol =
    headers.get('x-forwarded-proto') ??
    new RegExp(['localhost', '127.0.0.1'].join('|')).test(
      headers.get('host') ?? ''
    )
      ? 'http'
      : 'https';
  const host = headers.get('host'); // 'host' includes port
  // const pathname = headers.get('next-url');
  const origin = composeOrigin(protocol, host);
  return origin;
}

function parseUserAgent(headers: Headers) {
  return headers.get('user-agent');
}

function parseHeader(headers: Headers) {
  const cachedOrigin = parseCachedOrigin(headers);
  const origin = parseOrigin(headers);
  const userAgent = parseUserAgent(headers);
  process.env.NODE_ENV === 'development' &&
    console.log({ cachedOrigin, origin, userAgent });
  return { origin: cachedOrigin ?? origin, userAgent };
}

export { parseHeader };
