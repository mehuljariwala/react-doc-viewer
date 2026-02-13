import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'getting-started',
    'supported-file-types',
    {
      type: 'category',
      label: 'Framework Guides',
      items: ['frameworks/nextjs', 'frameworks/vite', 'frameworks/cra', 'frameworks/remix'],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/annotations',
        'features/drag-and-drop',
        'features/thumbnails',
        'features/page-navigation',
      ],
    },
    'custom-renderers',
    'theming',
    'i18n',
    'api-reference',
    'security',
    'performance',
    'migration',
    'faq',
  ],
};

export default sidebars;
