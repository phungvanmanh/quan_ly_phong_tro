import  dotenv from 'dotenv';
import  puppeteer from 'puppeteer';
import  nodemailer from 'nodemailer';
import  fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { Request, Response } from 'express';

const generatePDF = async (htmlContent: string, email: string) => {
  // Đường dẫn thư mục pdfs
  const pdfDirectory = path.join(__dirname, '..', 'pdfs');
  
  // Kiểm tra xem thư mục pdfs có tồn tại không, nếu không thì tạo mới
  if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory, { recursive: true });
  }

  const pdfPath = path.join(pdfDirectory, `${email}_contract.pdf`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set content HTML cho trang
  await page.setContent(htmlContent);

  // Tạo PDF và lưu vào file
  await page.pdf({ path: pdfPath, format: 'a4' });

  await browser.close();

  return pdfPath;
};
// Gửi email kèm hợp đồng PDF
interface User {
  name: string;
  email: string;
}

const sendEmail = async (user: User, pdfPath: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: user.email,
    subject: "Hợp đồng thuê trọ",
    text: `Chào ${user.name},\n\nDưới đây là hợp đồng thuê trọ của bạn.\n\nTrân trọng!`,
    attachments: [{ filename: "hopdong.pdf", path: pdfPath }],
  };

  await transporter.sendMail(mailOptions);
};

// API tạo hợp đồng
export const createContract = async (req: Request, res: Response) => {
  try {
    const { name, email, signature, htmlContent} = req.body;
    if (!name || !email || !signature || !htmlContent) {
      return res.status(400).json({ message: "Thiếu thông tin hợp đồng." });
    }

    // Tạo file image từ base64
    const signaturePath = path.join(__dirname, '..', 'signatures', `${name}_signature.png`);
    const base64Data = signature.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(signaturePath, base64Data, 'base64');

    // Tạo file PDF từ HTML 

    const pdfPath = await generatePDF(htmlContent, email);

    // Chèn chữ ký vào PDF
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1]; // Lấy trang cuối cùng

    const signatureImageBytes = fs.readFileSync(signaturePath);
    const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
    const signatureDims = signatureImage.scale(0.5);

    // Lấy kích thước trang PDF
    const { width, height } = lastPage.getSize();

    // Điều chỉnh tọa độ x và y để đặt chữ ký dưới phần "ĐẠI DIỆN BÊN THUÊ ( B )"
    lastPage.drawImage(signatureImage, {
      x: width / 2 - signatureDims.width / 2+20,
      y: 600, 
      width: signatureDims.width,
      height: signatureDims.height,
    });

    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdfPath, modifiedPdfBytes);

    // Gửi email kèm hợp đồng
    await sendEmail({ name, email }, pdfPath);

    res.json({ message: "Hợp đồng đã được gửi qua email!" });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: "Lỗi xử lý hợp đồng." });
  }
};
