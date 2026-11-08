import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  try {
    await page.goto('http://localhost:8000/admin/students', { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log('FAILED TO LOAD:', e);
  }

  await browser.close();
})();
