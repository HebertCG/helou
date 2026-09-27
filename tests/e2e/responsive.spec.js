import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('la página no desborda horizontalmente', async ({ page }, testInfo) => {
  test.setTimeout(60_000)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.hero-visual img')).toBeVisible()
  await expect(page.locator('.hero-visual img')).toHaveAttribute('src', '/helo-wave-hero.webp')
  await expect(page.locator('.hero-actions')).toBeInViewport()

  const heroLayout = await page.evaluate(() => {
    const copy = document.querySelector('.hero-copy').getBoundingClientRect()
    const visual = document.querySelector('.hero-visual').getBoundingClientRect()
    return {
      copyLeft: copy.left,
      copyTop: copy.top,
      visualLeft: visual.left,
      visualTop: visual.top,
      viewportWidth: window.innerWidth,
    }
  })

  if (heroLayout.viewportWidth > 900) {
    expect(heroLayout.visualLeft).toBeGreaterThan(heroLayout.copyLeft)
  } else {
    expect(heroLayout.visualTop).toBeGreaterThan(heroLayout.copyTop)
  }

  const revealItems = page.locator('[data-reveal]')
  const revealCount = await revealItems.count()
  for (let index = 0; index < revealCount; index += 1) {
    const item = revealItems.nth(index)
    await item.scrollIntoViewIfNeeded()
    await expect(item).toHaveClass(/is-visible/)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

  const sizes = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    processHeadingWidth: document.querySelector('.process h2').scrollWidth,
    processCopyWidth: document.querySelector('.process-copy').clientWidth,
  }))

  expect(sizes.documentWidth).toBeLessThanOrEqual(sizes.viewportWidth + 1)
  expect(sizes.processHeadingWidth).toBeLessThanOrEqual(sizes.processCopyWidth + 1)
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-full.png`,
    fullPage: true,
    animations: 'disabled',
  })
})

test('la navegación y el laboratorio responden', async ({ page }) => {
  if ((page.viewportSize()?.width ?? 0) <= 900) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Proceso' }).click()
  } else {
    await page.locator('.desktop-nav').getByRole('link', { name: 'Proceso' }).click()
  }

  await expect(page.locator('#proceso')).toBeInViewport()
  await page.getByRole('button', { name: 'Necesito reprogramar mi cita' }).click()
  await expect(page.locator('.chat-bubble-user')).toContainText('me salió un imprevisto')
  await expect(page.locator('.chat-bot-messages')).toContainText('Ya encontré tu cita del jueves')
  await expect(page.locator('.chat-quick-replies span').first()).toBeVisible()
})

test('el formulario muestra errores y confirma el envío', async ({ page }) => {
  await page.locator('#contacto').scrollIntoViewIfNeeded()
  await page.locator('.contact-form').getByRole('button', { name: 'Hablemos' }).click()
  await expect(page.getByRole('alert')).toContainText('Completa nombre')

  await page.getByLabel('Nombre').fill('María')
  await page.getByLabel('Correo').fill('maria@ejemplo.com')
  await page.getByLabel('¿Qué conversación quieres mejorar?').fill('Quiero mejorar el soporte a clientes.')
  await page.locator('.contact-form').getByRole('button', { name: 'Hablemos' }).click()
  await expect(page.getByRole('alert')).toContainText('Necesitamos tu autorización')

  await page.getByLabel(/Acepto la Política de privacidad/).check()
  await page.locator('.contact-form').getByRole('button', { name: 'Hablemos' }).click()
  await expect(page.getByRole('status')).toContainText('Todo listo')
})

test('la identidad editorial mantiene tipografía y paleta', async ({ page }) => {
  const visualTokens = await page.evaluate(() => {
    const body = getComputedStyle(document.body)
    const heading = getComputedStyle(document.querySelector('h1'))
    const highlight = getComputedStyle(document.querySelector('.hero-highlight'))
    const process = getComputedStyle(document.querySelector('.process'))
    const services = getComputedStyle(document.querySelector('.services'))
    const cardHeights = [...document.querySelectorAll('.service-card')]
      .map((card) => card.getBoundingClientRect().height)
    return {
      background: body.backgroundColor,
      headingFont: heading.fontFamily,
      highlightColor: highlight.color,
      highlightStyle: highlight.fontStyle,
      processBackground: process.backgroundImage,
      servicesBorderBottom: services.borderBottomWidth,
      maxCardHeight: Math.max(...cardHeights),
    }
  })

  await expect(page.locator('.brand').first()).toContainText('Helou')
  expect(visualTokens.background).toBe('rgb(236, 244, 241)')
  expect(visualTokens.headingFont).toContain('Instrument Serif')
  expect(visualTokens.highlightColor).toBe('rgb(102, 64, 252)')
  expect(visualTokens.highlightStyle).toBe('italic')
  expect(visualTokens.processBackground).toContain('linear-gradient')
  expect(visualTokens.processBackground).toContain('helou-process-texture.png')
  expect(visualTokens.servicesBorderBottom).toBe('0px')
  expect(visualTokens.maxCardHeight).toBeLessThanOrEqual(330)
  await expect(page.locator('.process-note-mascot')).toHaveAttribute('src', '/helou-process-mascot.png')
  await expect(page.locator('.process-list article')).toHaveCount(4)
})

test('el botón de WhatsApp aparece solo después del hero', async ({ page }) => {
  const fab = page.getByRole('link', { name: 'Escríbenos por WhatsApp' })
  await expect(page.locator('.whatsapp-fab')).not.toHaveClass(/is-visible/)

  await page.locator('#servicios').scrollIntoViewIfNeeded()
  await expect(page.locator('.whatsapp-fab')).toHaveClass(/is-visible/)
  await expect(fab).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+\?text=/)
})

test('el manifiesto revela sus líneas con resaltados', async ({ page }) => {
  const lines = page.locator('.manifesto-lines')
  await lines.scrollIntoViewIfNeeded()
  await expect(lines).toHaveClass(/is-visible/)
  await expect(page.locator('.manifesto-line')).toHaveCount(4)
  await expect(lines.locator('em').first()).toHaveCSS('font-style', 'italic')
})

test('el footer invita a contactar por WhatsApp y oculta el botón flotante', async ({ page }) => {
  const cta = page.locator('.site-footer').getByRole('link', { name: 'Contactar por WhatsApp' })
  await page.locator('.footer-bottom').scrollIntoViewIfNeeded()
  await expect(cta).toBeVisible()
  await expect(cta).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+\?text=/)
  await expect(page.locator('.whatsapp-fab')).not.toHaveClass(/is-visible/)
})
