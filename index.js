var cookie = require('cookie');
var cfaccessjwt = require('cfaccessjwt');

const accessDomain = 'https://ejjio.cloudflareaccess.com';
const aud = '9d4a635bdcc097213b4474263bb494515713df90575b6efc0ec7ace78e0a30cb';

addEventListener('fetch', event => {
  event.respondWith(main(event.request));
})

async function main(r) {
  var cookieHeader = r.headers.get("cookie")
  if (!cookieHeader) {
    return new Response("{}", {statusCode:400})
  }
  var cookies = cookie.parse(cookieHeader)
  if (!cookies) {
    return new Response("{}", {statusCode:400})
  }
  var jwt = cookies.CF_Authorization;
  if (!jwt) {
    return new Response("{}", {statusCode:400})
  }
  // We also need to fetch the JWK keys.
  var jwkBlob = await fetch(accessDomain + '/cdn-cgi/access/certs')
  var jwks = await jwkBlob.json()
  var auth = await cfaccessjwt(jwks, jwt, aud, accessDomain)
  return new Response('Welcome ' + auth.email)
}
