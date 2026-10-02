import { expect, test } from '@playwright/test'

const opacityOf = (locator) =>
  locator.evaluate((element) => Number(window.getComputedStyle(element).opacity))

const expectVisibleOpacity = async (locator, timeout = 8000) => {
  await expect.poll(() => opacityOf(locator), { timeout }).toBeGreaterThan(0.95)
}

test('el hero aparece también cuando la imagen ya está en caché', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero-visual')).toHaveClass(/is-ready/)

  // La segunda carga sirve la imagen desde caché: Safari la resuelve antes de
  // que React enganche onLoad, y así se quedaba el hero pausado e invisible.
  await page.reload()
  await expect(page.locator('.hero-visual')).toHaveClass(/is-ready/)
  await expectVisibleOpacity(page.locator('.hero-visual'))
  await expectVisibleOpacity(page.locator('.hero-copy'))
})

test('cada bloque con animación de entrada termina visible', async ({ page }) => {
  test.setTimeout(90_000)
  await page.goto('/')

  const items = page.locator('[data-reveal], [data-reveal-group]')
  const count = await items.count()
  expect(count).toBeGreaterThan(5)

  for (let index = 0; index < count; index += 1) {
    const item = items.nth(index)
    await item.scrollIntoViewIfNeeded()
    await expect(item).toHaveClass(/is-visible/)
    await expectVisibleOpacity(item)
  }
})

test('las esferas del footer se pintan sin filtros SVG', async ({ page }) => {
  await page.goto('/')
  await page.locator('.site-footer').scrollIntoViewIfNeeded()

  // El filtro SVG que las deformaba no se acelera en Safari: era el tirón en
  // iPhone y en algunas versiones de iOS dejaba las esferas sin pintar.
  await expect(page.locator('filter#orb-grain')).toHaveCount(0)

  const orbs = page.locator('.orb')
  await expect(orbs).toHaveCount(3)
  for (let index = 0; index < 3; index += 1) {
    const orb = orbs.nth(index)
    await expect(orb).toBeVisible()
    expect(await orb.evaluate((el) => window.getComputedStyle(el).filter)).toBe('none')
  }
})

test('la conversación del laboratorio arranca al entrar en pantalla', async ({ page }) => {
  await page.goto('/')

  const preview = page.locator('.conversation-preview')
  await expect(preview).not.toHaveClass(/is-live/)

  await preview.scrollIntoViewIfNeeded()
  await expect(preview).toHaveClass(/is-live/)
  await expectVisibleOpacity(page.locator('.chat-bubble-bot').first())
  await expectVisibleOpacity(page.locator('.chat-quick-replies'))
})

test('los bucles de animación se detienen fuera de pantalla', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-footer')).not.toHaveClass(/is-in-view/)

  await page.locator('.site-footer').scrollIntoViewIfNeeded()
  await expect(page.locator('.site-footer')).toHaveClass(/is-in-view/)
})

test('el scroll suave por JS no se interpone en pantallas táctiles', async ({ page }) => {
  await page.goto('/')

  const isTouch = await page.evaluate(
    () => window.matchMedia('(hover: none) and (pointer: coarse)').matches,
  )
  const usesLenis = await page.evaluate(
    () => document.documentElement.classList.contains('lenis'),
  )

  // En táctil manda el scroll nativo del sistema: ya tiene inercia propia.
  expect(usesLenis).toBe(!isTouch)
})

test('el CSS publicado no usa funciones que Safari descarta', async ({ page, request }) => {
  await page.goto('/')

  const hrefs = await page
    .locator('link[rel="stylesheet"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
  expect(hrefs.length).toBeGreaterThan(0)

  for (const href of hrefs) {
    const response = await request.get(href)
    expect(response.ok(), href).toBeTruthy()
    const css = await response.text()

    // color-mix() no existe en iOS 16.1 y anteriores, y al fallar el navegador
    // descarta la declaración entera (fondos y textos que desaparecen).
    expect(css, href).not.toContain('color-mix(')

    // backdrop-filter necesita prefijo hasta Safari 18.
    const prefixed = (css.match(/-webkit-backdrop-filter/g) ?? []).length
    const plain = (css.match(/(?<!-webkit-)backdrop-filter/g) ?? []).length
    expect(prefixed, href).toBe(plain)
  }
})

test.describe('con "Reducir movimiento" activo', () => {
  test.use({ reducedMotion: 'reduce' })

  test('la aparición sigue siendo perceptible, no instantánea', async ({ page }) => {
    await page.goto('/')

    /*
     * Antes la regla llevaba toda animación y transición a 0.01ms: el contenido
     * salía de golpe y el sitio se veía inerte. Reducir movimiento es quitar
     * desplazamiento, no quitar el fundido.
     */
    const revealDuration = await page
      .locator('[data-reveal]')
      .first()
      .evaluate((el) => window.getComputedStyle(el).transitionDuration)
    expect(Number.parseFloat(revealDuration)).toBeGreaterThan(0.2)

    const heroDuration = await page
      .locator('.hero-copy')
      .evaluate((el) => window.getComputedStyle(el).animationDuration)
    expect(Number.parseFloat(heroDuration)).toBeGreaterThan(0.2)
  })

  test('el contenido aparece en fundido en vez de quedarse inerte', async ({ page }) => {
    await page.goto('/')
    await expectVisibleOpacity(page.locator('.hero-copy'))

    const lines = page.locator('.manifesto-lines')
    await lines.scrollIntoViewIfNeeded()
    await expect(lines).toHaveClass(/is-visible/)

    const firstLine = page.locator('.manifesto-line-inner').first()
    await expectVisibleOpacity(firstLine)
    // Fundido sí, desplazamiento no.
    expect(await firstLine.evaluate((el) => window.getComputedStyle(el).transform)).toBe('none')

    const preview = page.locator('.conversation-preview')
    await preview.scrollIntoViewIfNeeded()
    await expectVisibleOpacity(page.locator('.chat-bubble-bot').first())
  })
})
