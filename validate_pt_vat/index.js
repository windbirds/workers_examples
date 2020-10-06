/**
 * Validates formating for Portugal tax numbers, not actual tax deductibility
 * @param {String} a - VAT Number
 */
const validateVAT = async a => {
  if (
    ((a = a.toString()),
    !["1", "2", "3", "5", "6", "8"].includes(a.substr(0, 1)) &&
      !["45", "70", "71", "72", "77", "79", "90", "91", "98", "99"].includes(
        a.substr(0, 2)
      ))
  )
    return !1;
  var d,
    b =
      9 * a[0] +
      8 * a[1] +
      7 * a[2] +
      6 * a[3] +
      5 * a[4] +
      4 * a[5] +
      3 * a[6] +
      2 * a[7],
    c = b - 11 * parseInt(b / 11);
  return (d = 1 == c || 0 == c ? 0 : 11 - c), a[8] == d;
};

const handleRequest = async event => {
  const parsedUrl = new URL(event.request.url);
  const str = parsedUrl.pathname.replace("/", "");

  let result = {
    vat: parseInt(str, 10),
    valid: await validateVAT(str)
  };

  const responseInit = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  };

  return new Response(JSON.stringify(result), responseInit);
};

addEventListener("fetch", event => event.respondWith(handleRequest(event)));
