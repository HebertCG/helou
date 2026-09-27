import { expect, test } from '@playwright/test'

test('el aviso de cookies aparece en la primera visita y recuerda la elección', async ({ page }) => {
  await page.goto('/')
  const banner = page.getByRole('dialog', { name: '¿Hablamos de cookies?' })
  await expect(banner).toBeVisible()

  await banner.getByRole('button', { name: 'Solo necesarias' }).click()
  await expect(banner).toBeHidden()
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('helou-cookie-consent')))
  expect(saved).toMatchObject({ necessary: true, analytics: false })

  await page.reload()
  await expect(page.getByRole('dialog', { name: '¿Hablamos de cookies?' })).toBeHidden()
})

test('las preferencias de cookies se pueden cambiar desde el footer', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('dialog').getByRole('button', { name: 'Aceptar todas' }).click()

  await page.locator('.footer-legal').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Preferencias de cookies' }).click()
  const banner = page.getByRole('dialog', { name: '¿Hablamos de cookies?' })
  await expect(banner.getByLabel(/Analítica/)).toBeChecked()

  await banner.getByLabel(/Analítica/).uncheck()
  await banner.getByRole('button', { name: 'Guardar preferencias' }).click()
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('helou-cookie-consent')))
  expect(saved.analytics).toBe(false)
})

for (const [path, heading] of [
  ['/privacidad/', 'Política de privacidad'],
  ['/terminos/', 'Términos y condiciones'],
  ['/cookies/', 'Política de cookies'],
]) {
  test(`la página legal ${path} carga con su título y el contacto del titular`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://helou.net.pe${path}`)
    await expect(page.locator('main')).toContainText('cornejogarciahebertjose@gmail.com')
    await expect(page.locator('.site-header').getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
  })
}

test('el sitio publica favicon, imagen para compartir y archivos para buscadores', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', '/favicon.svg')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://helou.net.pe/og-image.png')

  for (const file of ['/favicon.svg', '/favicon-32.png', '/apple-touch-icon.png', '/og-image.png', '/robots.txt', '/sitemap.xml', '/site.webmanifest']) {
    const response = await request.get(file)
    expect(response.ok(), file).toBeTruthy()
  }
})
