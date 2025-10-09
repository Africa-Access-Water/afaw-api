const puppeteer = require('puppeteer');
const generateDonationReceiptHTML = require('../templates/DonationReceiptTemplate');

const organization = {
    name: "AFRICA ACCESS WATER",
    address: "Lot 5676/M/6, Lusaka West, Lusaka, Zambia",
    email: "info@africaaccesswater.org",
    phone: "+260 211 231 174",
    website: "www.africaaccesswater.org",
    regNumber: "Non-profit Organization, Company No. 120190001569",
};

const generateDonationReceipt = async (req, res) => {
    try {
        const donation = req.body;

        const pdfBuffer = await generateDonationReceiptPDFBuffer(donation);

        // Send PDF as download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Receipt-${donation.id}.pdf`);
        res.send(pdfBuffer);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate receipt PDF' });
    }
};

// Generate PDF buffer for email attachment (no HTTP response)
const generateDonationReceiptPDFBuffer = async (donation) => {
    try {
        // Generate HTML string
        const html = generateDonationReceiptHTML(donation, organization, new Date().toLocaleDateString());

        let browser;

        // Use different packages for local vs production
        if (process.env.NODE_ENV === 'production') {
            // Production: Use puppeteer-core with @sparticuz/chromium
            const puppeteerCore = await import('puppeteer-core');
            const chromium = await import('@sparticuz/chromium');
            
            browser = await puppeteerCore.default.launch({
                args: chromium.default.args,
                defaultViewport: chromium.default.defaultViewport,
                executablePath: await chromium.default.executablePath(),
                headless: chromium.default.headless,
            });
        } else {
            browser = await puppeteer.launch();
        }
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
            scale: 0.9 // adjust slightly if still too long
        });

        await browser.close();

        return pdfBuffer;
    } catch (err) {
        console.error('Failed to generate receipt PDF buffer:', err);
        throw err;
    }
};

module.exports = {
    generateDonationReceipt,
    generateDonationReceiptPDFBuffer
};