import { expect, test } from '@playwright/test'

test('el sitio no muestra aviso de cookies y enlaza las páginas legales', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('dialog')).toHaveCount(0)

  const legalNav = page.getByRole('navigation', { name: 'Información legal' })
  await expect(legalNav.getByRole('link', { name: 'Privacidad' })).toHaveAttribute('href', '/privacidad/')
  await expect(legalNav.getByRole('link', { name: 'Términos' })).toHaveAttribute('href', '/terminos/')
  await expect(legalNav.getByRole('link', { name: 'Cookies' })).toHaveAttribute('href', '/cookies/')
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
