# Lista De Recursos Visuales - Altino

Fecha: 2026-07-23

Este documento consolida los recursos graficos necesarios para completar el sitio web de Altino, con medidas de uso en maqueta y medidas recomendadas de entrega para produccion web.

## 1. Recursos A Crear (Prioridad Alta)

| Recurso | Pagina | Uso en maqueta | Tamano de uso real | Tamano de entrega recomendado | Formato |
|---|---|---|---|---|---|
| Imagen principal hero | index.html | Imagen principal del bloque hero ("Un cafe noble") | 200 px de ancho (alto automatico) | 1024 x 1024 px | PNG transparente o WebP |
| Foto producto Lavado | index.html / catalogo.html | Tarjeta de cafe | Relacion 1:1 (aprox 240-320 px en pantalla) | 1024 x 1024 px | JPG o WebP |
| Foto producto Fermentacion | index.html / catalogo.html | Tarjeta de cafe | Relacion 1:1 | 1024 x 1024 px | JPG o WebP |
| Foto producto Honey | index.html / catalogo.html | Tarjeta de cafe | Relacion 1:1 | 1024 x 1024 px | JPG o WebP |
| Foto producto Natural | index.html / catalogo.html | Tarjeta de cafe | Relacion 1:1 | 1024 x 1024 px | JPG o WebP |
| Foto cafetal entre montanas | origen.html | Bloque narrativo de origen | Relacion 4:3 | 1600 x 1200 px | JPG o WebP |
| Foto manos del caficultor | origen.html | Bloque narrativo de origen | Relacion 4:3 | 1600 x 1200 px | JPG o WebP |
| OG Home | index.html | Compartir en redes (og:image) | Social card | 1200 x 630 px | JPG |
| OG Catalogo | catalogo.html | Compartir en redes (og:image) | Social card | 1200 x 630 px | JPG |
| OG Origen | origen.html | Compartir en redes (og:image) | Social card | 1200 x 630 px | JPG |
| OG Contacto | contacto.html | Compartir en redes (og:image) | Social card | 1200 x 630 px | JPG |

## 2. Recurso Faltante Detectado

| Recurso | Ubicacion de uso | Estado | Especificacion |
|---|---|---|---|
| topo-cream.svg | styles.css (catalogo, origen, contacto) | Faltante en assets | Crear SVG de patron/topografia sutil, monocromatico, apto para fondo |

## 3. Recursos Ya Existentes (No Urgentes)

| Recurso | Archivo actual | Resolucion detectada | Estado |
|---|---|---|---|
| Logo verde | assets/AF_LOGO CAFE ALTINO_verde.png | 6558 x 4664 | Existe, alta resolucion |
| Logo beige | assets/AF_LOGO CAFE ALTINO_beige.png | 6557 x 4664 | Existe, alta resolucion |
| Icono Instagram | assets/icon-instagram.png | 96 x 96 | Existe |
| Icono Ubicacion | assets/icon-ubicacion.png | 96 x 96 | Existe |
| Icono WhatsApp | assets/icon-whatsapp.png | 96 x 96 | Existe |
| Fondo general | assets/background.svg | Vectorial | Existe |

## 4. Nombres Sugeridos De Entrega

- hero-home-main-1024.png
- cafe-lavado-1024.jpg
- cafe-fermentacion-1024.jpg
- cafe-honey-1024.jpg
- cafe-natural-1024.jpg
- origen-cafetal-1600x1200.jpg
- origen-manos-1600x1200.jpg
- og-home-1200x630.jpg
- og-catalogo-1200x630.jpg
- og-origen-1200x630.jpg
- og-contacto-1200x630.jpg
- topo-cream.svg

## 5. Brief Rapido Para El Disenador

1. Mantener estetica cafe premium: tonos verdes, beige y terracota, luz natural.
2. Fotos de producto en formato 1:1 con zona segura para etiquetas visuales.
3. Fotos de origen en formato 4:3 con narrativa humana y territorial.
4. Entregar cada recurso en version optimizada para web y version master.
5. Priorizacion sugerida de produccion:
   - Fase 1: Hero home + 4 productos + 4 OG
   - Fase 2: 2 fotos de origen + topo-cream.svg

## 6. Checklist De Entrega

- [ ] Hero home exportado en 1024 x 1024
- [ ] 4 fotos de producto exportadas en 1024 x 1024
- [ ] 2 fotos de origen exportadas en 1600 x 1200
- [ ] 4 imagenes OG exportadas en 1200 x 630
- [ ] Archivo topo-cream.svg entregado
- [ ] Nombres de archivo segun convencion
- [ ] Version web y master por cada recurso
