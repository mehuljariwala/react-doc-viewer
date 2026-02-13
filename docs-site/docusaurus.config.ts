import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '@iamjariwala/react-doc-viewer',
  tagline: 'The most feature-complete open-source document viewer for React. Render PDF, Word, Excel, PowerPoint, images, video, CSV, HTML, and 20+ file types in a single component.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://mehuljariwala.github.io',
  baseUrl: '/react-doc-viewer-docs/',

  organizationName: 'mehuljariwala',
  projectName: 'react-doc-viewer-docs',

  onBrokenLinks: 'throw',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'react document viewer, react pdf viewer, pdf viewer component, file viewer react, docx viewer, xlsx viewer, pptx viewer, react annotations, drag and drop viewer, thumbnail sidebar, react i18n viewer, react-doc-viewer, react file preview, document preview react, best react pdf library',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": "@iamjariwala/react-doc-viewer",
        "description": "The most feature-complete open-source document viewer for React. 20+ file types, annotations, drag-and-drop, thumbnails, theming, i18n.",
        "url": "https://github.com/mehuljariwala/react-doc-viewer",
        "codeRepository": "https://github.com/mehuljariwala/react-doc-viewer",
        "programmingLanguage": ["TypeScript", "React"],
        "license": "https://www.apache.org/licenses/LICENSE-2.0",
        "author": {"@type": "Person", "name": "Mehul Jariwala"},
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mehuljariwala/react-doc-viewer/tree/main/docs-site/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/mehuljariwala/react-doc-viewer/tree/main/docs-site/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    metadata: [
      {name: 'description', content: 'React document viewer for 20+ file types. PDF, Word, Excel, PowerPoint, images, video, CSV with annotations, drag-and-drop, thumbnails, theming, and i18n.'},
      {name: 'og:title', content: '@iamjariwala/react-doc-viewer — React Document Viewer'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    navbar: {
      title: 'react-doc-viewer',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://mehuljariwala.github.io/react-doc-viewer',
          label: 'Live Demo',
          position: 'left',
        },
        {
          href: 'https://www.npmjs.com/package/@iamjariwala/react-doc-viewer',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/mehuljariwala/react-doc-viewer',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'API Reference', to: '/docs/api-reference'},
            {label: 'Features', to: '/docs/features/annotations'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'npm', href: 'https://www.npmjs.com/package/@iamjariwala/react-doc-viewer'},
            {label: 'Live Demo (Storybook)', href: 'https://mehuljariwala.github.io/react-doc-viewer'},
            {label: 'GitHub', href: 'https://github.com/mehuljariwala/react-doc-viewer'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'Changelog', href: 'https://github.com/mehuljariwala/react-doc-viewer/releases'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mehul Jariwala. Apache-2.0 License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'tsx', 'css'],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
