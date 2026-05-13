import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {

  constructor() { }

  async exportarExcelPrueba(datosEvento: any, datosAsistentes: any) {

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Asistentes');

    /*
    =========================================
    TITULO PRINCIPAL
    =========================================
    */

    worksheet.mergeCells('A1:F1');

    const titulo = worksheet.getCell('A1');

    titulo.value = 'LISTADO DE ASISTENTES';

    titulo.font = {
      bold: true,
      size: 18
    };

    titulo.alignment = {
      horizontal: 'center',
      vertical: 'middle'
    };

    /*
    =========================================
    INFORMACION DEL EVENTO
    =========================================
    */

    worksheet.getCell('A3').value = 'Evento:';
    worksheet.getCell('B3').value = datosEvento.nombre;

    worksheet.getCell('A4').value = 'Jornada:';
    worksheet.getCell('B4').value = datosEvento.horaDeInicio + " - " + datosEvento.horaDeFinalizacion;

    // worksheet.getCell('D3').value = 'Fecha:';
    // worksheet.getCell('E3').value = new Date;

    // worksheet.getCell('D4').value = 'Lugar:';
    // worksheet.getCell('E4').value = 'Auditorio Principal';

    /*
    =========================================
    ENCABEZADOS TABLA
    =========================================
    */

    const headerRow = worksheet.addRow([
      'Nombre',
      'Apellido',
      'Correo',
      'Código',
      'Comunidad',
      'Hora ingreso'
    ]);

    headerRow.eachCell((cell) => {

      cell.font = {
        bold: true,
        color: {
          argb: 'FFFFFF'
        }
      };

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: '4472C4'
        }
      };

      cell.alignment = {
        horizontal: 'center'
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

    });

    /*
    =========================================
    FILAS DE DATOS
    =========================================
    */

    datosAsistentes.forEach((asistente: any) => {

      const row = worksheet.addRow([
        asistente.nombre,
        asistente.apellido,
        asistente.correo,
        asistente.codigo,
        asistente.comunidad.nombre,
        //asistente.horaDeIngreso.toLocalString()
      ]);

      row.eachCell((cell) => {

        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };

      });

    });

    /*
    =========================================
    ANCHO COLUMNAS
    =========================================
    */

    worksheet.columns = [
      { width: 20 },
      { width: 20 },
      { width: 35 },
      { width: 15 },
      { width: 25 },
      { width: 20 }
    ];

    /*
    =========================================
    DESCARGA
    =========================================
    */

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob(
      [buffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

    FileSaver.saveAs(blob, 'reporte-asistentes.xlsx');
  }
}
