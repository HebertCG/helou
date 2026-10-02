import { expect, test } from '@playwright/test'

test('la portada entrega contenido SEO en el HTML inicial', async ({ request }) => {
  const response = await request.get('/')
  expect(response.ok()).toBeTruthy()

  const html = await response.text()
  expect(html).toContain('<html lang="es-PE">')
  expect(html).toContain('<title>Diseño conversacional con IA en Perú | Helou</title>')
  expect(html).toContain('<h1>')
  expect(html).toContain('Diseño conversacional para empresas en Perú.')
  expect(html).not.toContain('<div id="root"></div>')
})
test('publica canonical, robots y datos estructurados coherentes', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://helou.net.pe/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index, follow, max-image-preview:large',
  )
  await expect(page.locator('h1')).toHaveCount(1)

  const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())
  const types = structuredData['@graph'].map((item) => item['@type']).flat()
  expect(types).toEqual(expect.arrayContaining(['Organization', 'ProfessionalService', 'WebSite', 'Service', 'FAQPage']))
})

test('React hidrata el HTML prerenderizado sin errores', async ({ page }) => {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await page.locator('summary').first().click()
  await expect(page.locator('.seo-faq-list details').first()).toHaveAttribute('open', '')
  expect(errors).toEqual([])
})
