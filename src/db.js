const fs = require('fs');
const path = require('path');

const quotesPath = path.resolve(__dirname, 'data/quotes-data.json');
const jsonString = fs.readFileSync(quotesPath);
const data = JSON.parse(jsonString);
const { quotes } = data; // object destructuring

// PUBLIC METHODS
const getAllQuotes = () => quotes;

const getTimeString = () => {
  const d = new Date();
  const dateString = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return dateString;
};

const randomQuote = (array) => {
  if (!array.length) throw new Error('Array is empty!');
  return array[Math.floor(Math.random() * array.length)];
};

const recentQuote = (array) => {
  if (!array.length) throw new Error('Array is empty!');
  return array[(array.length - 1)];
};

const getQuoteById = (id) => {
  const foundQuote = data.quotes.find((quote) => quote.id === id);

  if (id === undefined || id === '') {
    return data.quotes;
  }

  return foundQuote || {};
};

const generateNewId = () => crypto.randomUUID();

module.exports = {
  getAllQuotes, getTimeString, randomQuote, recentQuote, getQuoteById, generateNewId,
};
