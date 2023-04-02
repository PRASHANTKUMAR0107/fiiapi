const {google} = require('googleapis');

import key from './credentials.json' assert { type: 'json' };

export const SHEET_ID = '1RQxUwl37mQGZCDVlKoTUWcrl3EIJzT0LLKfeztuCaK8';

const client = new google.auth.JWT(key.client_email, null, key.private_key, [
  'https://www.googleapis.com/auth/spreadsheets',
]);
const sheets = google.sheets({ version: 'v4', auth: client });

export default sheets;