/*
 * Compute the directory containing the exam PDFs.
 *
 * Originally the path was built using environment variables so the app
 * could be deployed under different base URLs. For this simplified
 * version we avoid any environment configuration and assume the PDFs are
 * served directly from the `/pdf` folder in the public directory.
 */

const BASE = '/pdf';

/**
 * Pure convenience: list only the stems once.
 * If you add a new exam, just append the stem here.
 */
const stems = [
  "20120613",
  "20120710",
  "20120905",
  "20120918",
  "20130208",
  "20130611",
  "20130715",
  "20130910",
  "20130923",
  "20140127",
  "20140714",
  "20140819",
  "20140908",
  "20140923",
  "20150208",
  "20150622",
  "20150713",
  "20150907",
  "20150923",
  "20160205",
  "20160622",
  "20160720",
  "20160908",
  "20160917",
  "20170202",
  "20180618",
  "20180711",
  "20180920",
  "20181211",
  "20190205",
  "20190621",
  "20190722",
  "20190918",
  "20191213",
  "20200205"
];

const pdfMap = {};

stems.forEach(stem => {
  pdfMap[stem] = {
    exam:     `${BASE}/compito_${stem}.pdf`,    
    solution: `${BASE}/soluzioni_${stem}.pdf`
  };
});

export default pdfMap;