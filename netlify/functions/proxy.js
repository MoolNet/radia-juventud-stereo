const RADIOBOSS_URL = 'https://headsman-travel-kleenex.ngrok-free.dev';
const PASS = 'YQrEYYArwz';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/xml',
  };

  // Manejar preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Obtener los parámetros de la query
  const params = event.queryStringParameters || {};
  delete params[''];

  // Construir la URL hacia RadioBoss
  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  const url = `${RADIOBOSS_URL}?pass=${PASS}&ngrok-skip-browser-warning=true&${queryString}`;

  try {
    const response = await fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Mozilla/5.0 (RadiaProxy/1.0)',
      },
    });

    const body = await response.text();

    return {
      statusCode: 200,
      headers,
      body,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers,
      body: `<error>${err.message}</error>`,
    };
  }
};
