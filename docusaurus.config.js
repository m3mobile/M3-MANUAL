const {themes: prismThemes} = require('prism-react-renderer');
const manualCatalog = require('./manual.config.js');

const docsUrl = (path) => `/docs/${path}/`;

const whiteCodeTheme = {
  ...prismThemes.github,
  plain: {
    ...prismThemes.github.plain,
    backgroundColor: '#ffffff'
  }
};

const dropdownItems = (items) =>
  items.map((item) => ({
    label: item.label,
    to: docsUrl(item.path)
  }));

const config = {
  title: 'M3 MOBILE',
  tagline: 'APP manuals and developer docs',
  favicon: 'img/favicon.svg',
  url: 'https://example.com',
  baseUrl: '/',
  organizationName: 'manual',
  projectName: 'manual-site',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko']
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          exclude: ['index.mdx', 'app/index.mdx']
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      }
    ]
  ],
  themeConfig: {
    navbar: {
      title: 'M3 MOBILE',
      items: [
        {
          type: 'dropdown',
          label: 'APP',
          position: 'left',
          items: dropdownItems(manualCatalog.apps)
        },
        {
          type: 'dropdown',
          label: 'Developers',
          position: 'left',
          items: dropdownItems(manualCatalog.developerDocs)
        }
      ]
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} M3 MOBILE`
    },
    prism: {
      theme: whiteCodeTheme,
      darkTheme: whiteCodeTheme
    }
  }
};

module.exports = config;
