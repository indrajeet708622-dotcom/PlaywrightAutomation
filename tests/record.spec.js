import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dwyndham%2Bhotels%26oq%3Dwyndham%2Bhotels%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDgwNzZqMGoyqAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DS2Ssad-lKIKPseMPwL6DuQ8&q=EhAkAUkAiDnr_4h5w6Ci3MrtGMvIsc0GIjBEfd4l2anBvHIUhNrhcxK6Kn-zkekZqhsSbANF56w9WQa5_0dEzO0UTwLkYn0sZLUyAVJaAUM');
  await page.locator('iframe[name="a-r50wy8rj6fwe"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.getByRole('link', { name: 'Wyndham Hotels | Official' }).click();
  await page.locator('.text-box-position-container').click();
  await page.getByRole('button', { name: 'Manage Preferences' }).click();
});