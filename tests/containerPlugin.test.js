import { run, html, css } from './util/run'

test('options are not required', () => {
  let config = { content: [{ raw: html`<div class="container"></div>` }] }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
      }
      @media (width >= 640px) {
        .container {
          max-width: 640px;
        }
      }
      @media (width >= 768px) {
        .container {
          max-width: 768px;
        }
      }
      @media (width >= 1024px) {
        .container {
          max-width: 1024px;
        }
      }
      @media (width >= 1280px) {
        .container {
          max-width: 1280px;
        }
      }
      @media (width >= 1536px) {
        .container {
          max-width: 1536px;
        }
      }
    `)
  })
})

test('screens can be passed explicitly', () => {
  let config = {
    content: [{ raw: html`<div class="container"></div>` }],
    theme: {
      container: {
        screens: ['400px', '500px'],
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
      }
      @media (width >= 400px) {
        .container {
          max-width: 400px;
        }
      }
      @media (width >= 500px) {
        .container {
          max-width: 500px;
        }
      }
    `)
  })
})

test('screens are ordered ascending by min-width', () => {
  let config = {
    content: [{ raw: html`<div class="container"></div>` }],
    theme: {
      container: {
        screens: ['500px', '400px'],
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
      }
      @media (width >= 400px) {
        .container {
          max-width: 400px;
        }
      }
      @media (width >= 500px) {
        .container {
          max-width: 500px;
        }
      }
    `)
  })
})

test('screens are deduplicated by min-width', () => {
  let config = {
    content: [{ raw: html`<div class="container"></div>` }],
    theme: {
      container: {
        screens: {
          sm: '576px',
          md: '768px',
          'sm-only': { min: '576px', max: '767px' },
        },
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
      }
      @media (width >= 576px) {
        .container {
          max-width: 576px;
        }
      }
      @media (width >= 768px) {
        .container {
          max-width: 768px;
        }
      }
    `)
  })
})

test('the container can be centered by default', () => {
  let config = {
    content: [{ raw: html`<div class="container"></div>` }],
    theme: {
      container: {
        center: true,
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
      @media (width >= 640px) {
        .container {
          max-width: 640px;
        }
      }
      @media (width >= 768px) {
        .container {
          max-width: 768px;
        }
      }
      @media (width >= 1024px) {
        .container {
          max-width: 1024px;
        }
      }
      @media (width >= 1280px) {
        .container {
          max-width: 1280px;
        }
      }
      @media (width >= 1536px) {
        .container {
          max-width: 1536px;
        }
      }
    `)
  })
})

test('horizontal padding can be included by default', () => {
  let config = {
    content: [{ raw: html`<div class="container"></div>` }],
    theme: {
      container: {
        padding: '2rem',
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
      }
      @media (width >= 640px) {
        .container {
          max-width: 640px;
        }
      }
      @media (width >= 768px) {
        .container {
          max-width: 768px;
        }
      }
      @media (width >= 1024px) {
        .container {
          max-width: 1024px;
        }
      }
      @media (width >= 1280px) {
        .container {
          max-width: 1280px;
        }
      }
      @media (width >= 1536px) {
        .container {
          max-width: 1536px;
        }
      }
    `)
  })
})

test('responsive horizontal padding can be included by default', () => {
  let config = {
    content: [{ raw: html`<div class="container"></div>` }],
    theme: {
      screens: {
        sm: '576px',
        md: { min: '768px' },
        lg: { 'min-width': '992px' },
        xl: { min: '1200px', max: '1600px' },
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      @media (width >= 576px) {
        .container {
          max-width: 576px;
          padding-left: 2rem;
          padding-right: 2rem;
        }
      }
      @media (width >= 768px) {
        .container {
          max-width: 768px;
        }
      }
      @media (width >= 992px) {
        .container {
          max-width: 992px;
          padding-left: 4rem;
          padding-right: 4rem;
        }
      }
      @media (width >= 1200px) {
        .container {
          max-width: 1200px;
          padding-left: 5rem;
          padding-right: 5rem;
        }
      }
    `)
  })
})

test('setting all options at once', () => {
  let config = {
    content: [{ raw: html`<div class="container"></div>` }],
    theme: {
      container: {
        screens: ['400px', '500px'],
        center: true,
        padding: '2rem',
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding-left: 2rem;
        padding-right: 2rem;
      }
      @media (width >= 400px) {
        .container {
          max-width: 400px;
        }
      }
      @media (width >= 500px) {
        .container {
          max-width: 500px;
        }
      }
    `)
  })
})

test('container can use variants', () => {
  let config = {
    content: [{ raw: html`<div class="lg:hover:container"></div>` }],
    theme: {
      container: {
        screens: ['400px', '500px'],
      },
    },
  }

  return run('@tailwind components', config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      @media (width >= 1024px) {
        .lg\:hover\:container:hover {
          width: 100%;
        }
        @media (width >= 400px) {
          .lg\:hover\:container:hover {
            max-width: 400px;
          }
        }
        @media (width >= 500px) {
          .lg\:hover\:container:hover {
            max-width: 500px;
          }
        }
      }
    `)
  })
})
