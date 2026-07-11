// Playwright screenshot and debugging script
import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader']
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  // Capture console output
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  
  // Capture network failures
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push(`FAILED: ${request.url()} - ${request.failure()?.errorText}`);
  });

  // Track asset loads
  const assetLoads = [];
  page.on('response', response => {
    const url = response.url();
    if (url.includes('/model/') || url.endsWith('.glb') || url.endsWith('.webp')) {
      assetLoads.push(`${response.status()} ${url}`);
    }
  });

  console.log("Navigating to localhost:5173...");
  
  // Force fresh load by adding cache-busting timestamp
  await page.goto('http://localhost:5173?t=' + Date.now(), { waitUntil: 'networkidle' });
  
  // Wait for iframe to appear
  try {
    await page.waitForSelector('iframe', { timeout: 15000 });
    console.log("Iframe element found!");
  } catch (e) {
    console.error("Iframe not found:", e.message);
  }
  
  // Wait a short duration to capture the loading state screen
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './screenshot_loading.png', fullPage: false });
  console.log("Loading screenshot saved to ./screenshot_loading.png");
  
  // Wait for model to fully load and render
  await page.waitForTimeout(7000);
  
  // Take final screenshot
  await page.screenshot({ path: './screenshot.png', fullPage: false });
  console.log("Final screenshot saved to ./screenshot.png");

  // Print results
  console.log("\n=== Asset Loads ===");
  assetLoads.forEach(a => console.log("  " + a));

  console.log("\n=== Console Output ===");
  consoleLogs.forEach(log => console.log("  " + log));

  if (failedRequests.length > 0) {
    console.log("\n=== FAILED Requests ===");
    failedRequests.forEach(req => console.log("  " + req));
  } else {
    console.log("\nNo failed network requests!");
  }
  
  await browser.close();
}

main().catch(console.error);
