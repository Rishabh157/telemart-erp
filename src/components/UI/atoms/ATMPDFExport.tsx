import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
// import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react'

// Ensure that pdfMake has the correct virtual file system

// export const ATMPDFExport = (tableBody: any[], columnLength: any) => {
//     pdfMake.vfs = pdfFonts?.pdfMake?.vfs
//     // Generate the table body dynamically based on headers
//     // const tableBody = [
//       // headers, // First row as the header
//       // ...data.map((row) => headers.map((header) => row[header] || '')), // Map each data row based on the headers
//     // ];
//     // tableBody
//     const docDefinition = {
//         pageSize: 'A4', // Standard page size
//         pageMargins: [10, 20, 10, 20], // Margins [left, top, right, bottom]
//         header: {
//             text: 'Exported Data Report',
//             style: 'header',
//             alignment: 'center',
//         },
//         content: [
//             { text: 'Report', style: 'subHeader', alignment: 'center' },
//             {
//                 table: {
//                     headerRows: 1,
//                     widths: Array(columnLength).fill('*'), // Equal widths for columns
//                     body: tableBody,
//                 },
//                 layout: 'lightHorizontalLines', // Light grid for better readability
//             },
//         ],
//         styles: {
//             header: {
//                 fontSize: 10,
//                 bold: true,
//                 margin: [0, 6, 0, 6],
//             },
//             subHeader: {
//                 fontSize: 8,
//                 margin: [0, 6, 0, 6],
//             },
//         },
//         // defaultStyle: {
//         //   fontSize: 8,
//         // },
//     }

//     pdfMake.createPdf(docDefinition).download('exported-data.pdf')
// }

// // Props interface for the button component
// interface ATMPDFExportButtonProps {
//     tableBody: any // Array of objects with data matching headers
//     onClick?: () => void
//     columnLength:number
// }

// // Button component to trigger the PDF export
// const ATMPDFExportButton: React.FC<ATMPDFExportButtonProps> = ({
//     tableBody,
//     onClick,
//     columnLength,
// }) => {
//     const handleExport = () => {
//         ATMPDFExport(tableBody, columnLength)
//         onClick?.()
//     }

//     return (
//         <button
//             onClick={handleExport}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//             Download PDF
//         </button>
//     )
// }

// export default ATMPDFExportButton

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import React from 'react';

// // Ensure that pdfMake has the correct virtual file system

// export const ATMPDFExport = (headers: string[], data: any[]) => {
//   pdfMake.vfs = pdfFonts?.pdfMake?.vfs;
//   // Generate the table body dynamically based on headers
//   const tableBody = [
//     headers, // First row as the header
//     ...data.map((row) => headers.map((header) => row[header])), // Map each data row based on the headers
//   ];

//   const docDefinition = {
//     header: {
//       text: 'Exported Data Report',
//       style: 'header',
//       alignment: 'center',
//     },
//     content: [
//       { text: 'Report', style: 'subHeader' },
//       {
//         table: {
//           headerRows: 1,
//           widths: Array(headers.length).fill('*'),
//           body: tableBody,
//         },
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 12,
//         bold: true,
//         margin: [0, 10, 0, 10],
//       },
//       subHeader: {
//         fontSize: 12,
//         margin: [0, 10, 0, 10],
//       },
//     },
//   };

//   pdfMake.createPdf(docDefinition).download('exported-data.pdf');
// };

// // Props interface for the button component
// interface ATMPDFExportButtonProps {
//   headers: string[];  // Array of strings representing the headers
//   data: any[];        // Array of objects with data matching headers
//   onClick?: () => void;
// }

// // Button component to trigger the PDF export
// const ATMPDFExportButton: React.FC<ATMPDFExportButtonProps> = ({ headers, data, onClick }) => {

//   const handleExport = () => {
//     ATMPDFExport(headers, data);
//     onClick?.();
//   };

//   return (
//     <button
//       onClick={handleExport}
//       className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//     >
//       Download PDF
//     </button>
//   );
// };

// export default ATMPDFExportButton;










// export const ATMPDFExport = (
//   tableBody: any[],
//   columnLength: number,
//   summarizeColumns: number[]
// ) => {
//   pdfMake.vfs = pdfFonts?.pdfMake?.vfs;
//   // Calculate totals for specified columns
//   const totals = Array(columnLength).fill('');
//   summarizeColumns?.forEach((columnIndex) => {
//     totals[columnIndex] = tableBody?.slice(1).reduce((sum: number, row: any[]) => {
//       const value = parseFloat(row[columnIndex]) || 0;
//       return sum + value;
//     }, 0); // Sum and fix to 2 decimals
//   });

//   // Append a totals row to the table body
//   tableBody.push(
//     totals.map((total, index) => ({
//       text: index === 0 ? 'Total' : total, // Label the first column as "Total"
//       style: index === 0 ? 'totalLabel' : 'totalValue',
//     }))
//   );

//   const docDefinition = {
//     pageSize: 'A4',
//     pageMargins: [10, 20, 10, 20],
//     header: {
//       text: 'Exported Data Report',
//       style: 'header',
//       alignment: 'center',
//     },
//     content: [
//       { text: 'Agent Report', alignment: 'center' },
//       {
//         table: {
//           headerRows: 1,
//           widths: Array(columnLength).fill('*'),
//           body: tableBody,
//         },
//       },
//     ],
//     styles: {
//       header: {
//         bold: true,
//         margin: [0, 10, 0, 10],
//       },
//       totalLabel: {
//         bold: true,
//         alignment: 'left',
//         fillColor: '#CCCCCC',
//       },
//       totalValue: {
//         bold: true,
//         alignment: 'right',
//         fillColor: '#F0F0F0',
//       },
//     },
//   };

//   pdfMake.createPdf(docDefinition).download('exported-data-with-totals.pdf');
// };

// // Button component
// interface ATMPDFExportButtonProps {
//   tableBody: any[];
//   columnLength: number;
//   summarizeColumns: number[]; // Indices of columns to summarize
//   onClick?: () => void;
// }

// const ATMPDFExportButton: React.FC<ATMPDFExportButtonProps> = ({
//   tableBody,
//   columnLength,
//   summarizeColumns,
//   onClick,
// }) => {
//   const handleExport = () => {
//     ATMPDFExport(tableBody, columnLength, summarizeColumns);
//     onClick?.();
//   };

//   return (
//     <button
//       onClick={handleExport}
//       className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//     >
//       Download PDF
//     </button>
//   );
// };

// export default ATMPDFExportButton;



export const ATMPDFExport = (
  tableBody: any[],
  columnLength: number,
  summarizeColumns: number[]
) => {
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs;

  // Calculate totals for specified columns
  const totals = Array(columnLength).fill('');
  summarizeColumns?.forEach((columnIndex) => {
    totals[columnIndex] = tableBody?.slice(1).reduce((sum: number, row: any[]) => {
      const value = parseFloat(row[columnIndex]) || 0;
      return sum + value;
    }, 0); // Sum and fix to 2 decimals
  });

  // Append a totals row to the table body
  tableBody.push(
    totals.map((total, index) => ({
      text: index === 0 ? 'Total' : total, // Label the first column as "Total"
      style: index === 0 ? 'totalLabel' : 'totalValue',
    }))
  );

  // Calculate dynamic font size based on row count and column count
  const fontSize = Math.max(10, 12 - Math.floor((tableBody.length + columnLength) / 10));

  const docDefinition = {
    pageSize: columnLength<7 ? 'A4': 'A3',
    pageMargins: [10, 20, 10, 20],
    header: {
      text: 'Exported Data Report',
      style: 'header',
      alignment: 'center',
    },
    content: [
      { text: 'Agent Report', alignment: 'center' },
      {
        table: {
          headerRows: 1,
          widths: Array(columnLength).fill('*'),
          body: tableBody,
        },
      },
    ],
    styles: {
      header: {
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: fontSize, // Adjust header font size dynamically
      },
      totalLabel: {
        bold: true,
        alignment: 'left',
        fillColor: '#CCCCCC',
        fontSize: fontSize, // Adjust total label font size dynamically
      },
      totalValue: {
        bold: true,
        alignment: 'right',
        fillColor: '#F0F0F0',
        fontSize: fontSize, // Adjust total value font size dynamically
      },
      tableCell: {
        fontSize: fontSize, // Adjust cell font size dynamically
      },
    },
  };

  pdfMake.createPdf(docDefinition).download('exported-data-with-totals.pdf');
};

// Button component
interface ATMPDFExportButtonProps {
  tableBody: any[];
  columnLength: number;
  summarizeColumns: number[]; // Indices of columns to summarize
  onClick?: () => void;
}

const ATMPDFExportButton: React.FC<ATMPDFExportButtonProps> = ({
  tableBody,
  columnLength,
  summarizeColumns,
  onClick,
}) => {
  const handleExport = () => {
    ATMPDFExport(tableBody, columnLength, summarizeColumns);
    onClick?.();
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
