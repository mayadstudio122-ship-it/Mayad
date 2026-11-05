import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AdminTalentApplicationRecord } from '@/services/adminService';

/**
 * Safely format and cap string length for Excel cells (Max Excel limit is 32,767 chars)
 */
const sanitizeForExcel = (val: any): string => {
  if (val === null || val === undefined) return 'N/A';
  if (typeof val === 'number') return val.toString();
  const str = String(val).trim();
  if (!str) return 'N/A';

  // Base64 Images or Docs crash Excel because they are 50KB to 5MB (50,000 to 5,000,000 characters)
  if (str.startsWith('data:image')) {
    const sizeKb = Math.round(str.length / 1024);
    return `[Embedded Image (${sizeKb} KB Data)]`;
  }
  if (str.startsWith('data:application/pdf') || str.startsWith('data:')) {
    const sizeKb = Math.round(str.length / 1024);
    return `[Embedded Document (${sizeKb} KB Data)]`;
  }

  // Hard safety limit for Excel (Excel strictly crashes above 32,767 characters)
  if (str.length > 30000) {
    return str.slice(0, 30000) + '... [TRUNCATED]';
  }

  return str;
};

/**
 * Format a single talent application record for Excel output
 */
const formatRecordForExcel = (app: AdminTalentApplicationRecord, index: number) => {
  const roles = Array.isArray(app.interestedRoles)
    ? app.interestedRoles.map((r) => sanitizeForExcel(r)).join(', ')
    : sanitizeForExcel(app.interestedRoles);

  const projectVideos = Array.isArray(app.projectVideoUrls)
    ? app.projectVideoUrls.map((v) => sanitizeForExcel(v)).join(', ')
    : sanitizeForExcel(app.projectVideoUrls);

  const formattedDate = app.createdAt
    ? new Date(app.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  return {
    'S.No': index + 1,
    'Full Name': sanitizeForExcel(app.fullName),
    'Age': app.age || 'N/A',
    'Gender': sanitizeForExcel(app.gender),
    'Interested Roles': roles,
    'Experience Level': sanitizeForExcel(app.experienceLevel),
    'Years of Experience': sanitizeForExcel(app.yearsOfExperience),
    'Preferred Language': sanitizeForExcel(app.preferredLanguage),
    'Email': sanitizeForExcel(app.email),
    'WhatsApp Number': sanitizeForExcel(app.whatsAppNumber),
    'Calling Number': sanitizeForExcel(app.callingNumber),
    'City': sanitizeForExcel(app.city),
    'State': sanitizeForExcel(app.state),
    'Country': sanitizeForExcel(app.country || 'India'),
    'Full Address': sanitizeForExcel(app.fullAddress),
    'Status': sanitizeForExcel(app.status || 'Pending'),
    'About / Bio': sanitizeForExcel(app.aboutYourself),
    'Previous Projects': sanitizeForExcel(app.previousProjects),
    'Profile Photo': sanitizeForExcel(app.profilePhoto),
    'Intro Video URL': sanitizeForExcel(app.introductoryVideoUrl),
    'Project Video URLs': projectVideos,
    'Synopsis PDF': sanitizeForExcel(app.synopsisPdfUrl),
    'Social Link 1': sanitizeForExcel(app.socialLink1),
    'Social Link 2': sanitizeForExcel(app.socialLink2),
    'Submitted Date': formattedDate,
  };
};

/**
 * Export talent applications to Excel (.xlsx) file
 */
export const exportTalentToExcel = (
  records: AdminTalentApplicationRecord[],
  fileNamePrefix: string = 'MAYAD_Artist_Registrations'
) => {
  if (!records || records.length === 0) {
    throw new Error('No talent records available to export.');
  }

  const rows = records.map((rec, idx) => formatRecordForExcel(rec, idx));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Define sensible column widths
  worksheet['!cols'] = [
    { wch: 6 },  // S.No
    { wch: 24 }, // Full Name
    { wch: 6 },  // Age
    { wch: 10 }, // Gender
    { wch: 22 }, // Interested Roles
    { wch: 16 }, // Experience Level
    { wch: 18 }, // Years of Experience
    { wch: 16 }, // Preferred Language
    { wch: 28 }, // Email
    { wch: 16 }, // WhatsApp
    { wch: 16 }, // Calling
    { wch: 16 }, // City
    { wch: 16 }, // State
    { wch: 12 }, // Country
    { wch: 35 }, // Full Address
    { wch: 14 }, // Status
    { wch: 45 }, // About / Bio
    { wch: 35 }, // Previous Projects
    { wch: 32 }, // Photo URL
    { wch: 32 }, // Intro Video
    { wch: 32 }, // Project Videos
    { wch: 32 }, // Synopsis PDF
    { wch: 25 }, // Social 1
    { wch: 25 }, // Social 2
    { wch: 16 }, // Submitted Date
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Artist Registrations');

  const today = new Date().toISOString().split('T')[0];
  const filename = `${fileNamePrefix}_${today}.xlsx`;

  XLSX.writeFile(workbook, filename);
};

/**
 * Export talent applications list to PDF (.pdf) file in landscape table format
 */
export const exportTalentToPdf = (
  records: AdminTalentApplicationRecord[],
  filterSubtitle: string = 'All Categories'
) => {
  if (!records || records.length === 0) {
    throw new Error('No talent records available to export.');
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Top Accent Banner
  doc.setFillColor(11, 14, 27); // Dark navy slate
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold line
  doc.setFillColor(212, 175, 55); // Gold
  doc.rect(0, 27, pageWidth, 1.5, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(245, 215, 122); // Warm Gold
  doc.text('MAYAD OTT PLATFORM — ARTIST REGISTRATIONS DIRECTORY', 14, 12);

  // Subtitle / metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text(`Filter: ${filterSubtitle}  •  Total Records: ${records.length}  •  Export Date: ${today}`, 14, 20);

  // Build table data
  const head = [
    [
      '#',
      'Applicant Name',
      'Age/Gender',
      'Interested Roles',
      'Experience',
      'Email / Contact',
      'Location',
      'Status',
      'Date',
    ],
  ];

  const body = records.map((app, idx) => {
    const roles = Array.isArray(app.interestedRoles)
      ? app.interestedRoles.join(', ')
      : (app.interestedRoles || '—');

    const contactStr = `${app.email || '—'}\nWA: ${app.whatsAppNumber || '—'}`;
    const locationStr = `${app.city || '—'}, ${app.state || '—'}`;
    const expStr = `${app.experienceLevel || '—'}${app.yearsOfExperience ? ` (${app.yearsOfExperience})` : ''}`;
    const dateStr = app.createdAt
      ? new Date(app.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: '2-digit',
        })
      : '—';

    return [
      (idx + 1).toString(),
      app.fullName || '—',
      `${app.age || '—'} Yrs\n${app.gender || '—'}`,
      roles,
      expStr,
      contactStr,
      locationStr,
      app.status || 'Pending',
      dateStr,
    ];
  });

  autoTable(doc, {
    startY: 33,
    head,
    body,
    theme: 'striped',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [245, 215, 122],
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      cellPadding: 2.5,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },  // #
      1: { cellWidth: 38, fontStyle: 'bold' }, // Name
      2: { cellWidth: 20 },                  // Age/Gender
      3: { cellWidth: 40 },                  // Roles
      4: { cellWidth: 26 },                  // Experience
      5: { cellWidth: 50 },                  // Contact
      6: { cellWidth: 35 },                  // Location
      7: { cellWidth: 24, fontStyle: 'bold' }, // Status
      8: { cellWidth: 20 },                  // Date
    },
    didDrawPage: (data) => {
      // Page numbering footer
      const pageCount = (doc.internal as any).getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `MAYAD Platform Governance • Confidential Administrative Document • Page ${data.pageNumber} of ${pageCount}`,
        14,
        doc.internal.pageSize.getHeight() - 6
      );
    },
  });

  const todayIso = new Date().toISOString().split('T')[0];
  doc.save(`MAYAD_Artist_Registrations_${todayIso}.pdf`);
};

const formatMediaForPdf = (val?: string) => {
  if (!val) return '—';
  if (val.startsWith('data:image')) {
    return `[Embedded Photo (${Math.round(val.length / 1024)} KB)]`;
  }
  if (val.startsWith('data:')) {
    return `[Embedded File (${Math.round(val.length / 1024)} KB)]`;
  }
  if (val.length > 300) {
    return val.slice(0, 300) + '...';
  }
  return val;
};

/**
 * Export single artist dossier as PDF
 */
export const exportSingleArtistPdf = (app: AdminTalentApplicationRecord) => {
  if (!app) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(11, 14, 27);
  doc.rect(0, 0, pageWidth, 32, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 31, pageWidth, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(245, 215, 122);
  doc.text('MAYAD EXECUTIVE PORTAL', 14, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.text('Official Talent Registration Dossier', 14, 21);

  // Applicant Title Card
  let curY = 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text(app.fullName || 'Artist Applicant', 14, curY);

  curY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  const metaLine = `Age: ${app.age || '—'}  •  Gender: ${app.gender || '—'}  •  Status: ${app.status || 'Pending'}  •  Date: ${
    app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN') : '—'
  }`;
  doc.text(metaLine, 14, curY);

  curY += 8;

  // Roles Box
  const roles = Array.isArray(app.interestedRoles) ? app.interestedRoles.join(', ') : (app.interestedRoles || '—');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(212, 175, 55);
  doc.text(`Interested Roles: ${roles}`, 14, curY);

  curY += 8;

  // Build Sections via autoTable
  autoTable(doc, {
    startY: curY,
    theme: 'grid',
    head: [['Field', 'Applicant Details']],
    body: [
      ['Full Name', app.fullName || '—'],
      ['Age & Gender', `${app.age || '—'} Years / ${app.gender || '—'}`],
      ['Interested Roles', roles],
      ['Experience Level', app.experienceLevel || '—'],
      ['Years of Experience', app.yearsOfExperience || '0 Years'],
      ['Preferred Language', app.preferredLanguage || '—'],
      ['Email Address', app.email || '—'],
      ['WhatsApp Number', app.whatsAppNumber || '—'],
      ['Calling Number', app.callingNumber || '—'],
      ['City & State', `${app.city || '—'}, ${app.state || '—'} (${app.country || 'India'})`],
      ['Full Residential Address', app.fullAddress || '—'],
      ['Application Status', app.status || 'Pending'],
      ['Profile Photo', formatMediaForPdf(app.profilePhoto)],
      ['Introductory Video URL', formatMediaForPdf(app.introductoryVideoUrl)],
      [
        'Project Video URLs',
        Array.isArray(app.projectVideoUrls)
          ? app.projectVideoUrls.filter(Boolean).map(formatMediaForPdf).join('\n') || '—'
          : formatMediaForPdf(app.projectVideoUrls),
      ],
      ['Synopsis / Script PDF', formatMediaForPdf(app.synopsisPdfUrl)],
      ['Social Link 1', app.socialLink1 || '—'],
      ['Social Link 2', app.socialLink2 || '—'],
      ['Previous Projects / Work', app.previousProjects || 'None specified'],
      ['About Applicant / Bio', app.aboutYourself || 'None specified'],
    ],
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [245, 215, 122],
      fontSize: 9,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59],
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold', textColor: [71, 85, 105] },
      1: { cellWidth: 132 },
    },
    didDrawPage: (data) => {
      const pageCount = (doc.internal as any).getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `MAYAD Platform Governance • Talent Application Dossier • Page ${data.pageNumber} of ${pageCount}`,
        14,
        doc.internal.pageSize.getHeight() - 6
      );
    },
  });

  const sanitized = (app.fullName || 'Artist').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`MAYAD_Dossier_${sanitized}.pdf`);
};

