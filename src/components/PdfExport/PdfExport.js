import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './PdfExport.css';
import { faFilePdf, faSpinner } from '@fortawesome/free-solid-svg-icons';
import domtoimage from 'dom-to-image';
import {
  PDFDocument, rgb,
} from 'pdf-lib';
import download from 'downloadjs';

export default function PdfExport() {
  const [isLoading, setIsLoading] = useState(false);
  const exportPdf = async () => {
    setIsLoading(true);
    await domtoimage.toPng(document.getElementById('Map'), { width: window.innerWidth, height: window.innerHeight })
      .then(async (dataUrl) => {
        const currentDate = new Date().toISOString().split('T')[0].split('-').map((x) => Number(x)).join('-');
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const pngImage = await pdfDoc.embedPng(dataUrl);
        let pngDims = pngImage.scale(1);
        let scale = 1;
        while (pngDims.width > (page.getWidth() - (page.getWidth() / (7.14 * 2)) * 2)) {
          scale -= 0.001;
          pngDims = pngImage.scale(scale);
        }
        page.drawImage(pngImage, {
          x: page.getWidth() / 2 - (pngDims.width / 2),
          y: page.getHeight() - (pngDims.height + ((page.getHeight() * 6.73) / 100)),
          width: pngDims.width,
          height: pngDims.height,
        });
        page.drawText(`Altermap : ${currentDate}`, {
          x: page.getWidth() / (7.14 * 2),
          y: page.getHeight() - (pngDims.height + ((page.getHeight() * 6.73) / 100)) - 35,
          size: 24,
          color: rgb(0, 0, 0),
        });
        // Download pdf create by-lib
        download(await pdfDoc.save(), `altermap-${currentDate}.pdf`, 'application/pdf');
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Une erreur est survenue !');
      });
  };

  return (
    <>
      <button type="button" onClick={exportPdf} className="PdfExport">
        <Icon icon={faFilePdf} className="PdfExport__icon" />
      </button>
      <button type="button" onClick={exportPdf} className={isLoading ? 'PdfExport__load' : 'hidden'}>
        <Icon icon={faSpinner} className="PdfExport__icon--loader" />
      </button>
    </>
  );
}
