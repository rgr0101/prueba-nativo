import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as Icon from 'react-bootstrap-icons';

interface Paciente {
    id: number;
    nombre_completo: string;
    edad: number;
    sexo: string;
    fecha_nacimiento: string;
    ciudad_origen: string;
    fecha_inscripcion: string;
    hospital: string;
    nombre_tutor: string;
    telefono_tutor: string;
}

interface ReportePacienteProps {
    paciente: Paciente;
}

const ReportePaciente: React.FC<ReportePacienteProps> = ({ paciente }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFont('helvetica', 'normal');

        doc.setFontSize(24);
        doc.setTextColor(37, 176, 155);
        doc.text('Hospital RP', 14, 15);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(13);
        doc.text(`Reporte Médico del Paciente ${paciente.nombre_completo}`, 14, 30);
        doc.setFontSize(10);
        doc.text('Fecha de Emisión: ' + new Date().toLocaleDateString(), 14, 40);

        const medicalData = [
            ['Dato', 'Valor'],
            ['Nombre Completo', paciente.nombre_completo],
            ['Edad', paciente.edad.toString()],
            ['Sexo', paciente.sexo],
            ['Fecha de Nacimiento', paciente.fecha_nacimiento],
            ['Ciudad de Origen', paciente.ciudad_origen],
            ['Fecha de Inscripción', paciente.fecha_inscripcion],
            ['Hospital', paciente.hospital],
            ['Nombre del Tutor', paciente.nombre_tutor],
            ['Teléfono del Tutor', paciente.telefono_tutor],
        ];

        autoTable(doc, {
            head: [medicalData[0]],
            body: medicalData.slice(1),
            theme: 'grid',
            startY: 50,
            styles: {
                cellPadding: 4,
                fontSize: 12,
                overflow: 'linebreak',
                halign: 'left',
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240],
            },
        });

        doc.setFontSize(10);
        doc.text('Hospital RP - Dirección 20, Merida, Mexico', 14, doc.internal.pageSize.getHeight() - 20);
        doc.text('Teléfono: (000) 0000-0000', 14, doc.internal.pageSize.getHeight() - 15);

        doc.save(`Reporte_paciente_${paciente.nombre_completo}.pdf`);
    };

    return (
        <button className="btn btn-danger btn-sm" onClick={generatePDF}>
            <Icon.FilePdfFill />
        </button>
    );
};

export default ReportePaciente;
