const { config } = require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    credentials: require('../credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

module.exports.getDataSongList = async (name) => {
    let itemList = [];
    try {
        const range = `${name}!B1:B100`;
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        const rows = response.data.values;
        await rows.forEach(element => {
            if(element[0].includes('https://www.youtube.com') || element[0].includes('https://open.spotify.com/')) {
                itemList.push(element[0]);
            }
        })
    } catch (error) {
        console.error(error);
    }
    return itemList;
}