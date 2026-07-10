# DESIGN SYSTEM — Altino Café Noble

> Este documento es la fuente de verdad de diseño para el agente que construirá la web.
> No alterar valores sin justificación. Toda decisión visual se deriva del brand guide oficial.

---

## 1. Tokens de Color

```css
:root {
  /* Primarios */
  --color-verde-bosque:    #426E50; /* Logo, botones primarios, nav activa */
  --color-verde-oliva:     #59614D; /* Fondos secundarios, hover states */
  --color-rojo-cereza:     #981915; /* Acentos, badges, detalles decorativos */
  --color-crema:           #FFF2D7; /* Fondo principal, texto sobre oscuro */

  /* Derivados funcionales */
  --color-bg-primary:      #FFF2D7;
  --color-bg-dark:         #426E50;
  --color-bg-card:         #FFFFFF;
  --color-text-primary:    #2C2C2C;
  --color-text-on-dark:    #FFF2D7;
  --color-text-muted:      #59614D;
  --color-border:          rgba(66, 110, 80, 0.2);
  --color-accent:          #981915;

  /* Semánticos */
  --color-cta-bg:          #426E50;
  --color-cta-hover:       #59614D;
  --color-cta-text:        #FFF2D7;
  --color-badge-lavado:    #426E50;
  --color-badge-honey:     #B8860B;
  --color-badge-natural:   #981915;
  --color-badge-ferm:      #426E50;
}
```

---

## 2. Tipografía

**Fuente:** Nunito (Google Fonts)  
**Import:** `https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap`

```css
:root {
  --font-family-primary: 'Nunito', sans-serif;

  /* Escala tipográfica */
  --font-size-xs:   0.75rem;   /* 12px — labels, badges */
  --font-size-sm:   0.875rem;  /* 14px — body secundario */
  --font-size-base: 1rem;      /* 16px — body principal */
  --font-size-lg:   1.125rem;  /* 18px — subtítulos */
  --font-size-xl:   1.25rem;   /* 20px — headings small */
  --font-size-2xl:  1.5rem;    /* 24px — headings medium */
  --font-size-3xl:  1.875rem;  /* 30px — headings large */
  --font-size-4xl:  2.25rem;   /* 36px — hero subtitle */
  --font-size-5xl:  3rem;      /* 48px — hero headline */

  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;

  --line-height-tight:  1.2;
  --line-height-normal: 1.6;
  --line-height-loose:  1.8;
}
```

**Jerarquía en uso:**

| Elemento | Peso | Tamaño | Color |
|----------|------|--------|-------|
| H1 Hero | Bold | 5xl (móvil: 3xl) | #2C2C2C o #FFF2D7 |
| H2 Sección | Bold | 3xl | #426E50 |
| H3 Card | Bold | xl | #2C2C2C |
| Body | Regular | base | #2C2C2C |
| Body muted | Regular | sm | #59614D |
| Badge / Label | Medium | xs | var(badge-color) |
| Precio | Bold | lg | #426E50 |
| Quote | Bold Italic | 2xl | #FFF2D7 |

---

## 3. Espaciado

```css
:root {
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */

  --section-padding-y:    var(--space-24);
  --section-padding-x:    var(--space-8);
  --container-max-width:  1200px;
  --card-padding:         var(--space-6);
  --border-radius-sm:     0.375rem;
  --border-radius-md:     0.75rem;
  --border-radius-lg:     1.5rem;
  --border-radius-full:   9999px;
}
```

---

## 4. Sombras y Efectos

```css
:root {
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:  0 4px 16px rgba(66, 110, 80, 0.12);
  --shadow-lg:  0 8px 32px rgba(66, 110, 80, 0.18);
  --shadow-card: 0 2px 12px rgba(0,0,0,0.06);
}
```

---

## 5. Componentes

### 5.1 Botón Primario

```
Background: #426E50
Texto: #FFF2D7
Padding: 12px 28px
Border-radius: full (9999px)
Font: Nunito Bold 1rem
Hover: background #59614D, ligera elevación (shadow-md)
Transición: 0.2s ease
```

### 5.2 Botón Secundario (outline)

```
Background: transparent
Borde: 2px solid #426E50
Texto: #426E50
Hover: Background #426E50, texto #FFF2D7
Mismas medidas que primario
```

### 5.3 Badge de Proceso

```
Forma: circular con texto alrededor o pill
Border: 2px solid var(--color-badge-X)
Texto: var(--color-badge-X)
Font: Nunito Bold xs UPPERCASE
Background: transparent o semitransparente
```

Tipos: LAVADO `#426E50` · FERMENTACIÓN `#426E50` · HONEY `#B8860B` · NATURAL `#981915`

### 5.4 Tarjeta de Producto

```
Background: #FFFFFF
Border-radius: md (0.75rem)
Shadow: shadow-card
Padding: card-padding (1.5rem)
Estructura interna:
  - [Badge tipo de beneficio] — top-left
  - Imagen del producto (ratio 1:1 o 4:3)
  - H3: Nombre del producto
  - [Notas de cata]: etiquetas pill pequeñas
  - Tabla: Acidez / Tostión / Dulzor con indicador visual (barras o dots)
  - Precios por presentación
  - CTA: "Pedir ahora" → WhatsApp
Hover: translateY(-4px), shadow-lg
```

### 5.5 Línea de Cata (indicador visual)

Para los atributos Acidez / Tostión / Dulzor usar uno de:
- Escala de 3 niveles: baja | media | alta (dots coloreados)
- Mini barra de progreso en #426E50

### 5.6 Quote Banner

```
Background: #426E50
Texto: #FFF2D7
Padding: space-16 horizontal, space-12 vertical
Font: Nunito Bold Italic, font-size-2xl
Elemento decorativo: línea topográfica SVG como overlay sutil (opacidad 10%)
Alineación: centrado
```

### 5.7 Sección de Estadísticas / Datos Clave

```
Layout: 3 o 4 columnas
Número grande: font-size-5xl, Bold, #426E50
Label: font-size-sm, #59614D
Separador: línea verde sutil o punto decorativo rojo cereza
```

---

## 6. Sistema Gráfico — Instrucciones de Uso

### Motivo topográfico

- Líneas SVG de curvas de nivel — color #426E50 sobre crema, o crema sobre verde
- Opacidad del motivo: 15-25% cuando es decorativo (fondo), 100% cuando es elemento principal
- Usar como: fondos de sección, overlays en hero, decoración de packaging

### Ilustración de montañas

- Silueta de montañas con sol naciente — trazo limpio, sin relleno o relleno sólido
- Color: #426E50 o crema según fondo
- Uso: hero, sección "Origen", fondo de quote banner

### Fotografía

**Estilo requerido:** Auténtico, campo real, luz natural, colores cálidos-naturales
**Sujetos prioritarios:**
- Manos del caficultor con cerezas de café
- Vista aérea/alta del cafetal entre montañas
- Detalle de granos y proceso
- Comunidad de la finca
- Producto final (empaque blanco sobre fondo natural)

**Nunca usar:** Fotos de stock genéricas de café, fondos blancos de estudio sin contexto de marca, filtros fuertes que eliminen los tonos naturales.

---

## 7. Layout y Grid

```
Container: max-width 1200px, centrado, padding horizontal variable
Grid de productos: 2 cols (móvil) → 3 cols (tablet) → 4 cols (desktop)
Grid de 3 pilares: 1 col → 3 cols
Secciones alternas: fondo crema / fondo verde (para romper monotonía)
Navbar: sticky, fondo #FFF2D7 con sombra sutil al hacer scroll
```

---

## 8. SEO Metadata por Página

### `/` — Home

```html
<title>Altino Café Noble — Aroma del Paramillo | Dabeiba, Antioquia</title>
<meta name="description" content="Café de alta montaña nacido a 1850 MSNM en Dabeiba, Antioquia. Variedades premium, fermentación artesanal y compromiso con la comunidad del Nudo del Paramillo.">
<meta property="og:title" content="Altino — Café Noble de Alta Montaña">
<meta property="og:description" content="Café de origen colombiano a 1850 MSNM. Lavado, Honey, Natural y Fermentación Extendida.">
<meta property="og:image" content="/og-home.jpg">
<meta name="twitter:card" content="summary_large_image">
```

### `/origen`

```html
<title>Nuestro Origen — Finca Los Socios, Dabeiba | Altino Café</title>
<meta name="description" content="Altino nace en la Vereda Charrascal, Dabeiba, a 1850 MSNM. Conoce la historia de la Finca Los Socios y el propósito de dignificar el campo colombiano.">
```

### `/catalogo`

```html
<title>Catálogo — Café Premium y Accesorios | Altino Café Noble</title>
<meta name="description" content="Café Suave Lavado, Fermentación Extendida, Honey y Natural. Termos, molinos, métodos de preparación y más. Precios directos del productor.">
```

### `/contacto`

```html
<title>Contacto y Distribuidores | Altino Café Noble</title>
<meta name="description" content="Contáctanos por WhatsApp o Instagram. Precios especiales para distribuidores y cafeterías. Dabeiba, Antioquia.">
```

---

## 9. Accesibilidad (no negociable)

- Contraste mínimo 4.5:1 en todo texto (verificar #FFF2D7 sobre #426E50 ✓)
- `alt` descriptivo en TODAS las imágenes de producto y origen
- `aria-label` en botones de CTA a WhatsApp e Instagram
- Navegación completa por teclado en menú y formulario
- Focus visible con outline en #981915 (contraste suficiente)
- `lang="es"` en `<html>`

---

## 10. Animaciones (sugeridas, no bloqueantes)

- **Scroll reveal:** secciones con fade-in + translateY(20px → 0) suave, threshold 0.1
- **Hover cards:** translateY(-4px) + shadow-lg, transition 0.2s ease
- **CTA buttons:** scale(1.02) en hover
- **Badge de proceso:** borde animado pulsante muy sutil (opcional)
- Librería sugerida si se usa JS: `@vueuse/motion`, Framer Motion, o CSS puro
- **Regla:** ninguna animación puede bloquear la interacción o demorar más de 300ms
