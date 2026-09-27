# Helou | Landing de diseño conversacional

Landing page responsiva construida con React y Vite.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run test:e2e
```

Las pruebas E2E cubren móvil, tablet, laptop y escritorio.

## Configuración

| Variable | Uso |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional, sin `+` ni espacios (ej. `51987654321`). |

## Despliegue (Cloudflare Pages)

- Comando de build: `npm run build`
- Carpeta de salida: `dist`
- Variable de entorno: `VITE_WHATSAPP_NUMBER`
