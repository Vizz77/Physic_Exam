/**
 * Map of exam PDFs to their corresponding solution PDFs
 * Using the date format YYYYMMDD as identifier
 */

const pdfMap = {
  '20120613': {
    // These paths assume your PDF files are in the `public/pdf` directory
    // and will be available at the root of your deployed site.
    exam: 'pdf/compito_20120613.pdf',
    solution: 'pdf/soluzioni_20120613.pdf'
  }
};

export default pdfMap;