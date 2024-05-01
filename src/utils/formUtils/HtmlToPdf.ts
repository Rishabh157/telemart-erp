import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePdf = async (contentRef: any) => {
    const contentRefNode = contentRef.current

    // Check if contentRefNode exists before proceeding
    if (!contentRefNode) {
        console.error('Content reference node is not available.')
        return null // Return null if contentRefNode is not available
    }

    // Set up canvas options for html2canvas
    const canvasOptions = {
        // Adjust scale as needed for quality and size reduction
        scale: window.devicePixelRatio, // Use devicePixelRatio for better quality
        logging: true,
        width: contentRefNode.offsetWidth, // Adjust width and height based on your content
        height: contentRefNode.offsetHeight,
    }

    try {
        // Generate PDF
        const canvas = await html2canvas(contentRefNode, canvasOptions)
        const imgData = canvas.toDataURL('image/jpeg', 1) // Adjust JPEG quality (0.7 is an example)
        const pdf = new jsPDF('p', 'mm', 'a4') // Specify PDF page size ('a4' is just an example)

        // Calculate aspect ratio for scaling image on PDF
        const aspectRatio = canvas.width / canvas.height
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdfWidth / aspectRatio

        // Calculate margin (e.g., 10 mm margin on all sides)
        // const margin = 10
        // const contentWidth = pdfWidth - 2 * margin
        // const contentHeight = pdfHeight - 2 * margin

        // Add image to PDF with margin
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
        // pdf.addImage(
        //     imgData,
        //     'JPEG',
        //     pdfWidth,
        //     pdfHeight
        //     // margin,
        //     // margin,
        //     // contentWidth,
        //     // contentHeight
        // ) as any

        // Save the PDF as a data URI
        const pdfDataUri: any = pdf.output('datauristring')
        // handleUpload(pdfDataUri, receiptData)

        return pdfDataUri // Return the PDF data URI
    } catch (error) {
        console.error('Error generating PDF:', error)
        return null // Return null if an error occurs
    }
}
