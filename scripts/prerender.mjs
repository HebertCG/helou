import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { render } from '../.seo-ssr/entry-server.js'

const routes = [
  ['index.html', 'inicio'],
  ['privacidad/index.html', 'privacidad'],
  ['terminos/index.html', 'terminos'],
  ['cookies/index.html', 'cookies'],
]

for (const [relativePath, page] of routes) {
  const filePath = resolve('dist', relativePath)
  const html = await readFile(filePath, 'utf8')
  const rootPattern = page === 'inicio'
    ? '<div id="root"></div>'
    : `<div id="root" data-page="${page}"></div>`
  const renderedRoot = page === 'inicio'
    ? `<div id="root">${render(page)}</div>`
    : `<div id="root" data-page="${page}">${render(page)}</div>`

  if (!html.includes(rootPattern)) {
    throw new Error(`No se encontró el contenedor de React en ${relativePath}`)
  }

  await writeFile(filePath, html.replace(rootPattern, renderedRoot))
}

await rm(resolve('.seo-ssr'), { recursive: true, force: true })
