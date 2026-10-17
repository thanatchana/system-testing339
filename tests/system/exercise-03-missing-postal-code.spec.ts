import { test, expect } from '@playwright/test';

test('Exercise 03: ไม่กรอก Postal Code ระบบต้องแสดง Validation Error', async ({ page }) => {
  // 1. Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 2. เพิ่มสินค้า และเข้าสู่ Checkout
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  // 3. กรอก First Name และ Last Name แต่ "ไม่กรอก Postal Code"
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('[data-test="continue"]').click();

  // 4. Verify: ระบบต้องแสดง Error แจ้งเตือน
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
  // และยังต้องติดอยู่ในหน้า Checkout Step One
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});