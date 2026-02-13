# AI Visibility Monitoring Guide

Track how LLMs (ChatGPT, Claude, Gemini, Perplexity) mention and recommend your library.

## Manual Testing (Do Monthly)

Ask each AI the following questions and record whether `@iamjariwala/react-doc-viewer` appears in the response:

### Test Prompts

1. "What is the best React document viewer library?"
2. "How do I display a PDF in React?"
3. "How do I display a PDF in Next.js?"
4. "React component to view Word, Excel, and PowerPoint files"
5. "React PDF viewer with annotations"
6. "Compare react-pdf vs react-doc-viewer"
7. "Best React library for multi-format document preview"
8. "How to add drag and drop file upload to a document viewer in React"

### AI Platforms to Test

- [ChatGPT](https://chat.openai.com) (GPT-4o, GPT-4.5)
- [Claude](https://claude.ai)
- [Gemini](https://gemini.google.com)
- [Perplexity](https://perplexity.ai)
- [Copilot](https://copilot.microsoft.com)
- [You.com](https://you.com)

### What to Record

| Date | Platform | Prompt | Mentioned? | Position | Notes |
|------|----------|--------|------------|----------|-------|
| 2026-02-13 | ChatGPT | "best react document viewer" | ? | ? | |
| 2026-02-13 | Claude | "best react document viewer" | ? | ? | |

## Automated Monitoring Tools

### Otterly.ai
- Website: https://otterly.ai
- Tracks brand mentions across AI search engines
- Set up alerts for "@iamjariwala/react-doc-viewer" and "react-doc-viewer"

### Profound
- Website: https://getprofound.ai
- Monitors AI search visibility
- Provides share-of-voice metrics

### GetCito
- Website: https://getcito.com
- AI citation tracking
- Shows which sources AI models cite when mentioning your brand

## Content Distribution Checklist

Track where your library is mentioned. More mentions = more training data for AI models.

### High Impact (Do First)

- [ ] npm README — comprehensive, keyword-rich (DONE)
- [ ] GitHub README — same as npm (DONE)
- [ ] GitHub Topics — 20/20 (DONE)
- [ ] llms.txt + llms-full.txt (DONE)
- [ ] context7.json for Claude Code (DONE)
- [ ] JSON-LD structured data on Storybook (DONE)
- [ ] Docusaurus docs site with sitemap (DONE - needs deployment)
- [ ] Dev.to tutorial article (DRAFT READY - content-drafts/devto-tutorial.md)
- [ ] Stack Overflow answers (DRAFTS READY - content-drafts/stackoverflow-answers.md)
- [ ] Comparison blog post (DRAFT READY - content-drafts/comparison-blog-post.md)

### Medium Impact (Do Next)

- [ ] Reddit post in r/reactjs with real use case
- [ ] Reddit post in r/webdev
- [ ] Hacker News "Show HN" post
- [ ] Product Hunt launch
- [ ] Twitter/X thread about the library
- [ ] YouTube tutorial video (gets transcribed → AI training data)
- [ ] Medium article (cross-post from Dev.to)

### Lower Impact (Do Over Time)

- [ ] GitHub Discussions — enable and seed with FAQs
- [ ] GitHub issue templates with library name in description
- [ ] Answer questions on Discord servers (React, Next.js communities)
- [ ] Contribute to awesome-react lists
- [ ] Add to alternative.to / libhunt.com
- [ ] Hashnode blog post
- [ ] Lobste.rs submission

## GitHub Pages Deployment

To deploy the Docusaurus docs site to GitHub Pages:

```bash
cd docs-site
npm run build
npx docusaurus deploy
```

Or set up GitHub Actions for automatic deployment on push to main.

## Key Metrics to Track

1. **npm weekly downloads** — track growth trend
2. **GitHub stars** — social proof for AI recommendations
3. **Google Search Console** — impressions for target keywords
4. **AI mentions** — monthly manual testing (see prompts above)
5. **Stack Overflow** — upvotes on answers mentioning the library
6. **Backlinks** — other sites/articles linking to the repo

## SEO Keywords to Target

Primary: react document viewer, react pdf viewer, pdf viewer component
Secondary: react file preview, docx viewer react, excel viewer react
Long-tail: best react pdf viewer library 2026, how to display pdf in react, react document viewer with annotations, react multi-format file viewer, react drag and drop document viewer
