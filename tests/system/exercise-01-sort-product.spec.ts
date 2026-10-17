import { test, expect } from '@playwright/test';

test('Exercise 01: เรียงลำดับสินค้าตามราคาจากน้อยไปมาก (Price Low to High)', async ({ page }) => {
  // 1. Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  // 2. เลือกตัวกรอง (Dropdown) เป็น "Price (low to high)"
  // Value ของตัวเลือกนี้ใน HTML คือ "lohi"
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // 3. ดึงราคาสินค้าทั้งหมดในหน้าเว็บมาเก็บไว้ใน Array
  const priceElements = page.locator('.inventory_item_price');
  const priceTexts = await priceElements.allTextContents();

  // แปลงข้อความราคาเช่น "$7.99" ให้เป็นตัวเลข 7.99
  const prices = priceTexts.map(price => parseFloat(price.replace('$', '')));

  // 4. Verify: ตรวจสอบว่าราคาทั้งหมดเรียงจากน้อยไปมากจริงๆ (Ascending)
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});