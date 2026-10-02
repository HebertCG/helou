# Helou | Landing de diseño conversacional

Landing page responsiva construida con React y Vite.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run test:e2e
```

El build prerenderiza la portada y las páginas legales. El servidor entrega contenido HTML completo a buscadores y usuarios, y React lo hidrata para conservar las interacciones.

Las pruebas E2E cubren móvil, tablet, laptop y escritorio en Chromium, y además
Safari (WebKit) en iPhone y escritorio, incluido el caso con «Reducir movimiento»
activado. Requieren los navegadores instalados: `npx playwright install chromium webkit`.

## Configuración

| Variable | Uso |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional, sin `+` ni espacios (ej. `51987654321`). |

## Despliegue (Cloudflare Pages)

- Comando de build: `npm run build`
- Carpeta de salida: `dist`
- Variable de entorno: `VITE_WHATSAPP_NUMBER`

## SEO

La implementación y el alta paso a paso en Google están documentadas en [`SEO-PERU.md`](./SEO-PERU.md).
