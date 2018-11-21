var cookie = require('cookie');
var cfaccess = require('cfaccess');

const kids = [
  "facb70eaf23a06573eb449601e345b8d2de562fb943de556d2cfda34870f7629",
  "5504c6480fd61da9b787c2485f38945cd9ff01825391c7b5f56efd9169bb6c44"
]
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
  var auth = await cfaccess.Verify(jwt, aud, accessDomain, kids);
  return new Response(JSON.stringify(auth))
}
