import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react';

// Ensure that pdfMake has the correct virtual file system

export const ATMPDFExport = (headers: string[], data: any[]) => {
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs;
  // Generate the table body dynamically based on headers
  const tableBody = [
    headers, // First row as the header
    ...data.map((row) => headers.map((header) => row[header])), // Map each data row based on the headers
  ];

  const docDefinition = {
    header: {
      text: 'Exported Data Report',
      style: 'header',
      alignment: 'center',
    },
    content: [
      { text: 'Report', style: 'subHeader' },
      {
        table: {
          headerRows: 1,
          widths: Array(headers.length).fill('*'),
          body: tableBody,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 10],
      },
      subHeader: {
        fontSize: 14,
        margin: [0, 10, 0, 10],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download('exported-data.pdf');
};

// Props interface for the button component
interface ATMPDFExportButtonProps {
  headers: string[];  // Array of strings representing the headers
  data: any[];        // Array of objects with data matching headers
}

// Button component to trigger the PDF export
const ATMPDFExportButton: React.FC<ATMPDFExportButtonProps> = ({ headers, data }) => {
  const handleExport = () => {
    ATMPDFExport(headers, data);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
};

export default ATMPDFExportButton;
