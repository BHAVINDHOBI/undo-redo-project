require("dotenv").config();

const router = require("express").Router();
const puppeteer = require('puppeteer');

router.post('/generatepdf', async (req, res) => {
    const { content } = req.body;

    try {
        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          timeout: 0,
      });
        const page = await browser.newPage();

        await page.setContent(content, { waitUntil: 'domcontentloaded' ,timeout: 60000 });

        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        res.setHeader('Content-Disposition', 'attachment; filename=content.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } 
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ success: false, message: "Error generating PDF"});  
    }
});

module.exports = router