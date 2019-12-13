const fs = require('fs'),
      csvtojson = require('csvtojson');

const csvFile = process.argv[2];

if (!csvFile) {
  throw Error('CSV file not specified');
}

csvtojson().fromFile(csvFile).then(rows => {
  
  const days = {};
  let lastDay = '';

  rows.forEach(row => {
    if (row.day) {
      lastDay = row.day;
      days[row.day] = [getTranslations(row)]
    } else {
      days[lastDay].push(getTranslations(row));
    }
  })

  console.log(days);

});

function getTranslations(row) {
  let translations = {
    en: {},
    fr: {}
  }

  Object.keys(row).forEach(key => {
    const value = row[key];
    if (isTranslated(key)) {
      const lang = key.substring(0, 1);
      translations[lang][key] = value;
    } else {
      translations.en[key] = value;
      translations.fr[key] = value;
    }
  })
  return translations;
}

function isTranslated(key) {
  return ['en_', 'fr_'].includes(key.substring(0, 2));
}