# Altino Cafe Noble

Sitio web corporativo de Altino Cafe Noble, una marca de cafe de alta montana nacida en Dabeiba, Antioquia, con enfoque en origen, trazabilidad y venta directa de cafe y accesorios.

## Descripcion del proyecto

Este repositorio contiene una web estatica multi pagina enfocada en:

- Presentacion de marca y propuesta de valor.
- Narrativa de origen (finca, territorio y proceso).
- Catalogo de productos con precios y CTAs a WhatsApp.
- Contacto comercial y flujo para distribuidores.

La web usa una arquitectura sin build step tradicional: HTML + CSS + JS en cliente, con logica centralizada en [main.js](main.js) y estilos compartidos en [styles.css](styles.css). El runtime hidrata templates declarativos definidos con etiquetas como x-dc y scripts text/x-dc.

## Tecnologias y versiones

![HTML5](https://img.shields.io/badge/HTML5-Est%C3%A1tico-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Estilos-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/Licencia-MIT-green)

Notas tecnicas:

- El runtime en [main.js](main.js) es JavaScript puro (sin React ni ReactDOM).
- Los estilos compartidos y del skeleton de carga estan centralizados en [styles.css](styles.css).
- No existe package.json ni proceso de compilacion requerido para ejecutar el sitio.

## Requerimientos

- Navegador moderno con soporte ES6+ (Chrome, Edge, Firefox, Safari).
- Opcional recomendado: servidor local para pruebas de rutas y recursos estaticos.

## Ejecucion

### Opcion 1: abrir directamente

1. Abrir [index.html](index.html) en el navegador.

### Opcion 2: servidor local con Python

1. Desde la raiz del proyecto, ejecutar:
	python -m http.server 8080
2. Abrir:
	http://localhost:8080/index.html

### Opcion 3: servidor local con Node

1. Ejecutar:
	npx serve .
2. Abrir la URL indicada por la terminal.

## Estructura de archivos

/
- [index.html](index.html) : pagina principal (home).
- [origen.html](origen.html) : historia, territorio y ficha tecnica.
- [catalogo.html](catalogo.html) : productos de cafe y accesorios.
- [contacto.html](contacto.html) : formulario de contacto y distribuidores.
- [main.js](main.js) : logica compartida del sitio (runtime x-dc, estado, eventos, skeleton y utilidades globales).
- [styles.css](styles.css) : estilos compartidos del sitio (incluye skeleton de carga).
- [support.js](support.js) : archivo legado conservado para compatibilidad.
- [robots.txt](robots.txt) : directivas de rastreo.
- [sitemap.xml](sitemap.xml) : mapa del sitio para indexacion.
- [LICENSE](LICENSE) : licencia MIT.
- [README.md](README.md) : documentacion del proyecto.
- [assets](assets) : recursos visuales (logos, fondo, imagenes).
- [docs](docs) : definicion de marca, contenido y design system.

## Contenido de apoyo

- [docs/BRIEF.md](docs/BRIEF.md) : identidad de marca, tono y posicionamiento.
- [docs/CONTENT.md](docs/CONTENT.md) : arquitectura de contenido por pagina.
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) : tokens, componentes y lineamientos visuales.

## Autor

- Andres Orozco
- Email: andres.orozco.dev@gmail.com

## Licencia

Este proyecto esta licenciado bajo MIT. Ver [LICENSE](LICENSE).