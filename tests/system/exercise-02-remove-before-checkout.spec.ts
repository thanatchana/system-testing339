import { test, expect } from '@playwright/test';

test('ST-02: Locked User ไม่สามารถเข้าใช้งานระบบได้', async ({ page }) => {
  await page.goto('/');

  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // ตรวจสอบ Error message และต้องไม่โดนเปลี่ยนหน้า
  await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
  await expect(page).not.toHaveURL(/inventory\.html/);
  await expect(page.locator('#user-name')).toBeVisible();
});