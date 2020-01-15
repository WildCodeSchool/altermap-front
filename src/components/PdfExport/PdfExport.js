import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './PdfExport.css';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import domtoimage from 'dom-to-image';
import {
  PDFDocument, rgb,
} from 'pdf-lib';
import download from 'downloadjs';

export default function PdfExport() {
  const exportPdf = () => {
    domtoimage.toPng(document.getElementById('Map'), { width: window.innerWidth, height: window.innerHeight })
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
      })
      .catch((error) => {
        console.log(error);
        alert('Une erreur est survenue !');
      });
  };

  let count = 0;

  Array.from(document.querySelectorAll('.leaflet-right > *'))
    .map(
      (x) => (x.children.length === 0 ? 1 : x.children.length)
      ,
    ).map(
      (item) => {
        count += item;
        return item;
      },
    );

  return (
    <button type="button" onClick={exportPdf} className="PdfExport" style={{ marginTop: count > 4 ? 37 * count : 38 * (count - 1), transition: 'ease .5s' }}>
      <Icon icon={faFilePdf} className="PdfExport__icon" />
    </button>
  );
}
