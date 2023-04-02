import express from 'express';
const app = express();
import { z, ZodError } from 'zod';
import bodyParser from "body-parser";
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


import sheets, { SHEET_ID } from './sheetClient.js';


app.use(express.json());

app.get("/",function(req,res){
  res.send("working .....");
})
app.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const { name,age,gender,phone_number,alternate_phone_number,email,address,medical_history,experience,last_gym_name,requirements,transaction,duration,currDate } = req.body;

    // Object to Sheets
    // const rows = Object.values(body);
    // console.log(rows);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:B',
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name,age,gender,phone_number,alternate_phone_number,email,address,medical_history,experience,last_gym_name,requirements,transaction,duration,currDate]],
      },
    });
    res.json({ message: 'Data added successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error });
    }
  }
});

app.listen(5000, () => console.log(`App running on http://localhost:5000`));