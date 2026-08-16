import PDFDocument from 'pdfkit';

/**
 * Generate & stream dynamic PDF payment receipt response
 * @param {Object} payment 
 * @param {Object} invoice 
 * @param {Object} student 
 * @param {Response} res 
 */
export const generatePaymentReceiptPdf = (payment, invoice, student, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Stream headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="receipt_${payment.paymentNumber}.pdf"`);

  doc.pipe(res);

  // Institution Header
  doc
    .fillColor('#7C3AED')
    .fontSize(22)
    .font('Helvetica-Bold')
    .text('Aladadpur Pioneer School', { align: 'center' });

  doc
    .fillColor('#64748B')
    .fontSize(10)
    .font('Helvetica')
    .text('Excellence in Education and Character', { align: 'center' })
    .text('Aladadpur, Bangladesh | Phone: +880 1700-000000', { align: 'center' });

  doc.moveDown(1.5);
  doc.strokeColor('#E2E8F0').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  // Title
  doc
    .fillColor('#1E293B')
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('OFFICIAL PAYMENT RECEIPT', { align: 'center' });

  doc.moveDown(1);

  // Receipt Details Metadata Block
  const startY = doc.y;
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E293B');
  doc.text(`Receipt No: `, 50, startY, { continued: true }).font('Helvetica').text(payment.paymentNumber);
  doc.font('Helvetica-Bold').text(`Payment Date: `, 50, startY + 15, { continued: true }).font('Helvetica').text(new Date(payment.paymentDate).toLocaleDateString());
  doc.font('Helvetica-Bold').text(`Payment Method: `, 50, startY + 30, { continued: true }).font('Helvetica').text(payment.paymentMethod.toUpperCase());

  doc.font('Helvetica-Bold').text(`Admission No: `, 320, startY, { continued: true }).font('Helvetica').text(student.admissionNumber);
  doc.font('Helvetica-Bold').text(`Student Name: `, 320, startY + 15, { continued: true }).font('Helvetica').text(student.userId?.name || 'N/A');
  doc.font('Helvetica-Bold').text(`Class & Section: `, 320, startY + 30, { continued: true }).font('Helvetica').text(`${student.classId?.name || ''} - ${student.sectionId?.name || ''}`);

  doc.moveDown(3);

  // Financial Summary Table
  const tableTop = doc.y + 20;
  doc.rect(50, tableTop, 500, 25).fill('#F8F9FD');
  doc.fillColor('#1E293B').font('Helvetica-Bold').fontSize(10);
  doc.text('Description', 60, tableTop + 8);
  doc.text('Invoice Ref', 250, tableTop + 8);
  doc.text('Total Amount', 360, tableTop + 8);
  doc.text('Amount Paid', 460, tableTop + 8);

  const rowTop = tableTop + 30;
  doc.font('Helvetica').fillColor('#334155');
  doc.text(invoice.feeStructureId?.title || 'Academic Fee', 60, rowTop);
  doc.text(invoice.invoiceNumber, 250, rowTop);
  doc.text(`$${invoice.totalAmount.toFixed(2)}`, 360, rowTop);
  doc.text(`$${payment.amountPaid.toFixed(2)}`, 460, rowTop);

  doc.moveDown(4);

  // Status & Note
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#16A34A');
  doc.text(`Invoice Status: ${invoice.status.toUpperCase()}`, 50, doc.y);

  doc.moveDown(2);
  doc.font('Helvetica-Oblique').fontSize(9).fillColor('#94A3B8');
  doc.text('This is a computer-generated official receipt from Spik SMS. No signature required.', { align: 'center' });

  // Finalize PDF stream
  doc.end();
};
