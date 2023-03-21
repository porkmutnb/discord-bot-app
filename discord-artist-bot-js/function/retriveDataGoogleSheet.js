const { google } = require('googleapis');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
    credentials: require('../credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

module.exports.getDataFoodsList = async () => {
    let itemList = [];
    try {
        const range = `FOODS!A2:A1000`;
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        const rows = response.data.values;
        await rows.forEach(element => {
            itemList.push(element[0]);
        })
    } catch (error) {
        console.error(error);
    }
    return itemList;
}