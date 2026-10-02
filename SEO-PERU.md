# Plan SEO de Helou para Perú

## Objetivo principal

Posicionar a Helou ante empresas peruanas que buscan diseñar asistentes, chatbots y experiencias conversacionales con IA. La intención principal de la portada es **contratar un servicio de diseño conversacional con IA en Perú**.

## Mapa inicial de búsquedas

| URL | Intención objetivo |
|---|---|
| `/` | diseño conversacional con IA en Perú |
| futura `/servicios/diseno-conversacional/` | servicio y consultoría de diseño conversacional |
| futura `/servicios/chatbots-ia/` | diseño de chatbots con IA para empresas |
| futura `/servicios/asistentes-virtuales/` | diseño de asistentes virtuales en Perú |
| futura `/casos/` | evidencia, resultados y casos reales |

No conviene crear esas páginas con texto genérico ni duplicado. Cada una debe responder una necesidad distinta, explicar el proceso, mostrar entregables propios y enlazar hacia un caso real.

## Publicación y alta en Google Search Console

1. Publicar esta versión en producción y comprobar que abren:
   - `https://helou.net.pe/`
   - `https://helou.net.pe/robots.txt`
   - `https://helou.net.pe/sitemap.xml`
2. Entrar en [Google Search Console](https://search.google.com/search-console/).
3. Pulsar **Añadir propiedad** y elegir **Dominio**.
4. Escribir `helou.net.pe`, sin `https://` ni `/`.
5. Copiar el registro TXT que entrega Google.
6. En Cloudflare abrir **DNS > Registros > Añadir registro**:
   - Tipo: `TXT`
   - Nombre: `@`
   - Contenido: el valor completo `google-site-verification=...`
   - TTL: automático
7. Volver a Search Console y pulsar **Verificar**. No eliminar el TXT después.
8. En **Indexación > Sitemaps**, escribir `sitemap.xml` y pulsar **Enviar**.
9. En **Inspección de URLs**, pegar `https://helou.net.pe/`, ejecutar **Probar URL publicada** y luego **Solicitar indexación**.
10. Revisar a los 7–14 días:
    - **Indexación > Páginas**: la portada debe figurar como indexada.
    - **Rendimiento > Resultados de búsqueda**: consultas, clics, impresiones y posición media.
    - **Experiencia > Core Web Vitals**: corregir cualquier URL marcada como deficiente.
    - **Seguridad y acciones manuales**: ambos informes deben estar limpios.

## Trabajo mensual para ganar posiciones

1. Crear una página de servicio por intención real, no por variaciones repetidas de palabras clave.
2. Publicar casos de estudio con contexto, problema, proceso, entregables y resultado verificable.
3. Añadir una página sobre el responsable de Helou, experiencia, metodología y formas de contacto. Esto refuerza confianza y autoría.
4. Conseguir menciones y enlaces editoriales desde clientes, aliados, comunidades de UX/IA y medios peruanos. No comprar paquetes de enlaces.
5. Revisar Search Console cada mes y mejorar primero las consultas con muchas impresiones y posiciones entre 5 y 20.
6. Mantener el sitemap y la fecha `lastmod` solo cuando una página cambie de forma sustancial.

## Perfil de Empresa de Google

Crearlo solo si Helou cumple las reglas de elegibilidad de Google: debe atender clientes en una ubicación real o desplazarse presencialmente hacia ellos. Un negocio exclusivamente remoto no es elegible. Si la dirección es residencial y no recibe clientes, debe ocultarse y configurarse un área de servicio real, no todo el país de forma artificial.

## Medición recomendada

- Conversión principal: envío efectivo del formulario.
- Conversiones secundarias: clic en WhatsApp y clic en correo.
- Separar tráfico de marca (`Helou`) y no marca (`diseño conversacional`, `chatbot con IA`).
- Comparar periodos de 28 días; el SEO no debe evaluarse por cambios diarios.
