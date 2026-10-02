import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  /*
   * WebKit resuelve los saltos a anclas con un desplazamiento animado que, con
   * varios navegadores compitiendo por la CPU, a veces no llega a tiempo. Es
   * del entorno, no del sitio: un reintento evita el ruido sin tapar fallos
   * reales, que siguen repitiéndose.
   */
  retries: 1,
  reporter: [['list']],
  /*
   * Buena parte de lo que se comprueba depende de animaciones y temporizadores.
   * Con WebKit en la matriz, los 5 s por defecto se quedan cortos cuando varios
   * navegadores compiten por la CPU, y aparecen fallos que no son del sitio.
   */
  expect: { timeout: 12_000 },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'mobile-390', use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } } },
    { name: 'tablet-768', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'laptop-1366', use: { viewport: { width: 1366, height: 768 } } },
    { name: 'desktop-1600', use: { viewport: { width: 1600, height: 1000 } } },
    // WebKit = motor de Safari (macOS e iOS): aquí aparecen los fallos propios de iPhone.
    { name: 'safari-iphone', use: { ...devices['iPhone 13'] } },
    { name: 'safari-desktop', use: { ...devices['Desktop Safari'] } },
    // Mismo Safari con "Reducir movimiento", el ajuste que dejaba el sitio inerte.
    {
      name: 'safari-iphone-reduced-motion',
      use: { ...devices['iPhone 13'], reducedMotion: 'reduce' },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120000,
  },
})
