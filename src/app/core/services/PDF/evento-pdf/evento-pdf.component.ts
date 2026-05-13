import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-evento-pdf',
  templateUrl: './evento-pdf.component.html',
  styleUrls: ['./evento-pdf.component.css']
})
export class EventoPdfComponent {

  @Input() evento: any;
  @Input() qrImage: string = '';
  @Input() jornada: any;
  @Input() comunidades: any[] = [];

  async descargarPDF() {

    const DATA: any =
      document.getElementById('eventoPDF');

    const canvas = await html2canvas(DATA, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgWidth = 208;

    const pageHeight = 295;

    const imgHeight =
      canvas.height * imgWidth / canvas.width;

    const heightLeft = imgHeight;

    const contentDataURL =
      canvas.toDataURL('image/png');

    const pdf = new jsPDF(
      'p',
      'mm',
      'a4'
    );

    let position = 0;

    pdf.addImage(
      contentDataURL,
      'PNG',
      0,
      position,
      imgWidth,
      imgHeight
    );

    pdf.save(this.evento.nombre + '.pdf');
  }
}
