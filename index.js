import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';   

const app = express();
const port = 3000;
const apiKey = "396882a0b8d22b2ea80617bc";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render("index.ejs", { content: "Awaiting your information!"});
});

app.post('/', async (req, res) => {

    var base_currency = req.body.base_code.toUpperCase();
    var target_currency = req.body.target_code.toUpperCase();
    var amount = req.body.amount;
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base_currency}/${target_currency}/${amount}`);
    const result = response.data;
    res.render("index.ejs", { 
        request: "sent",
        baseCurrency: base_currency,
        targetCurrency: target_currency,
        conversionRate: result.conversion_rate,
        baseAmount: amount,
        targetAmount: result.conversion_result,
     });
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});