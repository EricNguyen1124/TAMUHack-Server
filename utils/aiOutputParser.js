const axios = require("axios");
var invoiceDate;
var invoicePrice;

const checkDate = (checkString) => {
  var dateRegex = /(\d{1,4}([.\-\/])\d{1,2}([.\-\/])\d{1,4})/g;
  var dateArray = checkString.match(dateRegex);

  if (dateArray === null) {
    return "No Date Found";
  }

  invoiceDate = dateArray[0];
  return invoiceDate;
};

const checkPrice = (checkString) => {
  var priceRegex = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/g;
  var priceArray = checkString.match(priceRegex);

  if (priceArray === null) {
    return "No Price Found";
  }

  invoicePrice = priceArray[priceArray.length - 1];
  return invoicePrice;
};

const checkAddress = async (checkString) => {
  var addressRegex = /[0-9](.*)/gm;

  var question = "What is the address? \n" + checkString;
  var invoiceAddress = await axios.post(
    "https://api.openai.com/v1/engines/text-davinci-001/completions",
    {
      prompt: question,
      max_tokens: 160,
      temperature: 0.1,
      frequency_penalty: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer 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`,
      },
    }
  );

  return invoiceAddress.data.choices[0].text.match(addressRegex)[0];
};

//var result = checkPrice("55.00 1,000 1,000,000.99 5,99 (European price) 5.999,99 (European price) 0.11 $55.69");
//var result = checkDate("INVOICE Nimoy Corp 2510 Hoffman Avenue New York, New York 10013, USA www.nimoycorp.com Nimoy Corp BILL TO Tree Musketeers Elvera Benimadho 99385 Charity St #840 San Jose, CA 95110 Santa Clara chvera.benimadho@cox.net Involce Number: 3403 POD Invoice Date: 1/2/2019 Payment Duel 03/02/2019 Amount Due (USD): $2,644.18 Title Unit Cost QTY Price $499.00 (USD) 5 $2.495.00 QuickBook Online Sync Sync with 3rd Party Software Template Design Design a template as per the customers requests. 99.00 (USD) 6 $599.00 Sub Total: Discount (20%): Tax (7%): $3,089.00 $617.80 $172.98 Total Amount (USD): $2,644.18 Terms and Services Balance Due Upon Receipt: $0.00");
//console.log(result);
// async function something(){
// var fuck = await checkAddress("INVOICE Nimoy Corp 2510 Hoffman Avenue New York, New York 10013, USA www.nimoycorp.com Nimoy Corp BILL TO Tree Musketeers Elvera Benimadho 99385 Charity St #840 San Jose, CA 95110 Santa Clara chvera.benimadho@cox.net Involce Number: 3403 POD Invoice Date: 1/2/2019 Payment Duel 03/02/2019 Amount Due (USD): $2,644.18 Title Unit Cost QTY Price $499.00 (USD) 5 $2.495.00 QuickBook Online Sync Sync with 3rd Party Software Template Design Design a template as per the customers requests. 99.00 (USD) 6 $599.00 Sub Total: Discount (20%): Tax (7%): $3,089.00 $617.80 $172.98 Total Amount (USD): $2,644.18 Terms and Services Balance Due Upon Receipt: $266.50");
// console.log(fuck);}
// something()
module.exports = { checkDate, checkPrice, checkAddress };
