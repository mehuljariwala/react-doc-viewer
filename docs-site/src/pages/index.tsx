import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            style={{marginLeft: '1rem', color: '#fff', borderColor: '#fff'}}
            href="https://mehuljariwala.github.io/react-doc-viewer">
            Live Demo
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: '20+ File Types',
    description: 'PDF, Word, Excel, PowerPoint, images (PNG, JPG, GIF, TIFF, WebP, BMP), video, CSV, TXT, HTML — all in a single component.',
  },
  {
    title: 'Annotations & Markup',
    description: 'Highlight text, freehand draw, add comments, and export annotations as JSON. Built-in color picker and eraser.',
  },
  {
    title: 'Drag & Drop',
    description: 'Drop files directly onto the viewer. File type filtering, size limits, append/replace behavior, and callbacks.',
  },
  {
    title: 'Thumbnail Sidebar',
    description: 'Visual page navigation with click-to-jump for PDFs. Configurable thumbnail width and sidebar toggle.',
  },
  {
    title: '14 Languages',
    description: 'Built-in i18n with community translations. English, Arabic, German, Spanish, French, Japanese, and more.',
  },
  {
    title: 'No External Services',
    description: 'All rendering is client-side. No data leaves the browser. HTML sanitized with DOMPurify. Apache-2.0 license.',
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="React Document Viewer for 20+ File Types"
      description="The most feature-complete open-source document viewer for React. Render PDF, Word, Excel, PowerPoint, images, video, CSV, HTML with annotations, drag-and-drop, thumbnails, theming, and i18n.">
      <HomepageHeader />
      <main>
        <section style={{padding: '2rem 0'}}>
          <div className="container">
            <div className="row">
              {features.map((f, i) => (
                <div key={i} className="col col--4" style={{marginBottom: '2rem'}}>
                  <Heading as="h3">{f.title}</Heading>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{padding: '2rem 0', background: 'var(--ifm-color-emphasis-100)'}}>
          <div className="container" style={{textAlign: 'center'}}>
            <Heading as="h2">Quick Start</Heading>
            <pre style={{textAlign: 'left', display: 'inline-block', padding: '1.5rem', borderRadius: '8px'}}>
{`npm install @iamjariwala/react-doc-viewer

import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

<DocViewer
  documents={[{ uri: "https://example.com/sample.pdf" }]}
  pluginRenderers={DocViewerRenderers}
/>`}
            </pre>
          </div>
        </section>
      </main>
    </Layout>
  );
}
