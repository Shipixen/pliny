<div align="center">

<h1>
<a href="https://shipixen.com" target="_blank">
  <img height="120px" src="https://user-images.githubusercontent.com/1515742/281076422-8c4a9926-2885-4786-a69a-d79ab0c8dc5c.png" alt="Shipixen Logo" />
</a>
</h1>

</div>

Shipixen an app to generate customized boilerplates for your product. Or any website. We generate it & deploy it - then you get the code.

[shipixen.com](https://shipixen.com)

# Pliny

Pliny provides out of the box components to enhance your static site:

- Analytics
  - Google Analytics
  - Plausible Analytics
  - Simple Analytics
  - Umami Analytics
  - Posthog
- Comments
  - Disqus
  - Giscus
  - Utterances
- Newsletter (uses Next 13 API Routes)
  - Buttondown
  - Convertkit
  - Email Octopus
  - Klaviyo
  - Mailchimp
  - Revue
- Command palette search with tailwind style sheet
  - Algolia
  - Kbar (local search)
- UI utility components
  - Bleed
  - Newsletter / Blog Newsletter
  - Pre / Code block
  - Table of Contents

as well as a bunch of MDX and contentlayer utility functions which I use to build [Tailwind Nextjs Starter Blog][tnsb] and my own sites.

It is based on [Next.js][nextjs], [Tailwind CSS][tailwindcss] and [Contentlayer][contentlayer]. For an example of how all the components can be used together, check out the [Tailwind Nextjs Starter Blog][tnsb].

Note: The previous cli and starter template have been deprecated. Please use the new components directly in your favourite Next 13 websites.

Note 2: The components are intended to be use within Next 13 app directory setup with [Contentlayer][contentlayer]. You might still be able to use the components in older websites but there's no official support for it, especially since many components are now using `next/navigation` instead of `next/router`.

This project is still in beta. Please report any issues or feedbacks.

## Installation

```bash
npm i pliny
```

As many of the components are styled with tailwindcss, you will need to include the path to the library within the `content` section of your tailwind config file:

```js
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  // ...
}
```

## Components

### Analytics

The `Analytics` component provides an easy interface to switch between different analytics providers. It might not be as feature rich as the official analytics providers but it should be sufficient for simple use cases.

All components default to the hosted service, but can be configured to use a self-hosted or proxied version of the script by providing the `src` / `apiHost` props to the respective analytics component.

Note: As an external script will be loaded, do ensure that `script-src` in the content security policy of `next.config.js` has been configured to whitelist the domain.

```tsx
import { Analytics, AnalyticsConfig } from 'pliny/analytics'

const analytics: AnalyticsConfig = {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    plausibleAnalytics: {
      plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    },
    simpleAnalytics: {},
    umamiAnalytics: {
      umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
    posthogAnalytics: {
      posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
    googleAnalytics: {
      googleAnalyticsId: '', // e.g. G-XXXXXXX
    },
  }

export default function Layout() {
  return (
    ...
    <Analytics analyticsConfig={analyticsConfig} />
  )
}
```

You can also use the individual analytics components directly.

#### Google Analytics

```tsx
import { GA } from 'pliny/analytics/GoogleAnalytics'

const googleAnalyticsId = '' // e.g. UA-000000-2 or G-XXXXXXX

export default function Layout() {
  return (
    ...
    <GA googleAnalyticsId={googleAnalyticsId} />
  )
}
```

#### Plausible Analytics

```tsx
import { Plausible } from 'pliny/analytics/Plausible'

const plausibleDataDomain = '' // e.g. tailwind-nextjs-starter-blog.vercel.app

export default function Layout() {
  return (
    ...
    <Plausible plausibleDataDomain={plausibleDataDomain} />
  )
}
```

#### Simple Analytics

```tsx
import { SimpleAnalytics } from 'pliny/analytics/SimpleAnalytics'

export default function Layout() {
  return (
    ...
    <SimpleAnalytics />
  )
}
```

#### Umami Analytics

```tsx
import { Umami } from 'pliny/analytics/Umami'

const umamiWebsiteId = '' // e.g. 123e4567-e89b-12d3-a456-426614174000

export default function Layout() {
  return (
    ...
    <Umami umamiWebsiteId={umamiWebsiteId} />
  )
}
```

#### Posthog

```tsx
import { Posthog } from 'pliny/analytics/Posthog'

const posthogProjectApiKey: '', // e.g. AhnJK8392ndPOav87as450xd

export default function Layout() {
  return (
    ...
    <Posthog posthogProjectApiKey={posthogProjectApiKey} />
  )
}
```

### Comments

The `Comments` component provides an easy interface to switch between different comments providers.

```tsx
import { Comments, CommentsConfig } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'

export default function BlogComments({ slug }: { slug: string }) {
  return <Comments commentsConfig={commentsConfig as CommentsConfig} slug={slug} />
}
```

You can also use the individual comments components directly.

#### Giscus

```tsx
import { Giscus, GiscusProps } from 'pliny/comments/Giscus'

export default function BlogComments(props: GiscusProps) {
  return <Giscus {...props} />
}
```

#### Disqus

```tsx
import { Disqus, DisqusProps } from 'pliny/comments/Disqus'

export default function BlogComments(props: DisqusProps) {
  return <Disqus {...props} />
}
```

#### Utterances

```tsx
import { Utterances, UtterancesProps } from 'pliny/comments/Utterances'

export default function BlogComments(props: UtterancesProps) {
  return <Utterances {...props} />
}
```

### Newsletter

The `Newsletter` component provides a Next 13 API route to integrate a newsletter subscription API with various providers. E.g. in `app/api/newsletter/route.ts`

```tsx
import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

const handler = NewsletterAPI({
  provider: '', // Use one of mailchimp, buttondown, convertkit, klaviyo, revue, emailOctopus
})

export { handler as GET, handler as POST }
```

You can then send a `POST` request to the API route with a body with the email - `{ email: 'new_email@gmail.com' }`. See the `NewsletterForm` component in `pliny/ui/NewsletterForm` for an example.

### Search

The `Search` component provides an easy interface to switch between different search providers. If you are using algolia, you will need to import the css file as well - `import 'pliny/search/algolia.css'`.

```tsx
import { SearchProvider, SearchConfig } from 'pliny/search'

export default function Layout() {
  return <SearchProvider searchConfig={searchConfig as SearchConfig}>...</SearchProvider>
}
```

You can also use the individual search components directly.

#### Kbar

You can pass in an optional `defaultActions` to `kbarConfig` to customize the default actions. See [Kbar documentation](https://kbar.vercel.app/docs/concepts/actions) for more details.

```tsx
import { KBarSearchProvider } from 'pliny/search/KBar'

export default function Layout() {
  return <KBarSearchProvider kbarConfig={{ searchDocumentsPath: 'abc' }}>...</KBarSearchProvider>
}
```

Use `KBarButton` to add a button which toggles the command palette on click event.

```tsx
import { KBarButton } from 'pliny/search/KBarButton'

export default function SearchButton() {
  return (
    <KBarButton aria-label="Search Content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </KBarButton>
  )
}
```

#### Algolia

```tsx
import 'pliny/search/algolia.css'
import { AlgoliaSearchProvider } from 'pliny/search/Algolia'

export default function Layout() {
  return (
    <AlgoliaSearchProvider
      algoliaConfig={{
        appId: 'R2IYF7ETH7',
        apiKey: '599cec31baffa4868cae4e79f180729b',
        indexName: 'docsearch',
      }}
    >
      ...
    </AlgoliaSearchProvider>
  )
}
```

Use `AlgoliaButton` to add a button which toggles the command palette on click event.

```tsx
import { AlgoliaButton } from 'pliny/search/AlgoliaButton'

export default function SearchButton() {
  return (
    <AlgoliaButton aria-label="Search Content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </AlgoliaButton>
  )
}
```

### MDX plugins

Add the plugins to `remarkPlugins` in contentlayer or other MDX processors.

#### Remark Extract Frontmatter

Extracts frontmatter from markdown file and adds it to the file's data object. Used to pass frontmatter fields to subsequent remark / rehype plugins.

#### Remark code title

Parses title from code block and inserts it as a sibling title node.

#### Remark Img To Jsx

Converts markdown image nodes to next/image jsx.

#### Remark TOC Headings

Extracts TOC headings from markdown file and adds it to the file's data object. Alternatively, it also exports a `extractTocHeadings` function which can be used within contentlayer to create a `computedField` with the TOC headings.

### MDX components

While these can be used in any React code, they can also be passed down as MDXComponents and used within MDX files.

#### Bleed

Useful component to break out of a constrained-width layout and fill the entire width.

#### Pre / Code block

Simple code block component with copy to clipboard button.

#### TOCInline

Table of contents component which can be used within a markdown file.

#### NewsletterForm / BlogNewsletterForm

Newsletter form component to add a subscriber to your mailing list.

[nextjs]: https://nextjs.org/
[tailwindcss]: https://tailwindcss.com/
[contentlayer]: https://github.com/contentlayerdev/contentlayer
[rehype-prism-plus]: https://github.com/timlrx/rehype-prism-plus
[katex]: https://katex.org/
[rehype-citation]: https://github.com/timlrx/rehype-citation
[tnsb]: https://github.com/timlrx/tailwind-nextjs-starter-blog

## Release

```bash
nvm use
yarn
npm run release
```

-----------------

<a href="https://apihustle.com" target="_blank">
  <img height="60px" src="https://user-images.githubusercontent.com/1515742/215217833-c07183d2-f688-4d1c-86ea-329f3b28f81c.svg" alt="Apihustle Logo" />
</a>

-----------------

Save 10s of hours of work by using Shipixen to generate a customized codebases with your branding, pages and blog <br/>
― then deploy it to Vercel with 1 click.

| | |
| :- | :- |
| <a href="https://shipixen.com" target="_blank"><img height="60px" src="https://user-images.githubusercontent.com/1515742/281071510-d5c0095d-d336-4857-ad80-d18cf65f4acb.png" alt="Shipixen Logo" /></a> <br/> <b>Shipixen</b> <br/> Create a blog & landing page in minutes with <b>Shipixen</b>. <br/> Try the app on <a href="https://shipixen.com">shipixen.com</a>. | <a href="https://shipixen.com" target="_blank"><img width="300px" src="https://user-images.githubusercontent.com/1515742/281077548-57b24773-3c2a-4e89-b088-cc3945d7037b.png" alt="Shipixen Logo" /></a> |

-----------------

Apihustle is a collection of tools to test, improve and get to know your API inside and out. <br/>
[apihustle.com](https://apihustle.com) <br/>

|    |    |    |    |
| :- | :- | :- | :- |
| <a href="https://shipixen.com" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/3af97560-d774-4149-96c5-65d3cc530a5a" alt="Shipixen Logo" /></a> | **Shipixen** | Create a personalized blog & landing page in minutes | [shipixen.com](https://shipixen.com) | 
| <a href="https://pageui.dev" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/953cc5ab-bbf4-4a19-9b16-c74d218b63b4" alt="Page UI Logo" /></a> | **Page UI** | Landing page UI components for React & Next.js | [pageui.dev](https://pageui.dev) | 
| <a href="https://clobbr.app" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/50c11d46-a025-40fd-b154-0a5984556f6e" alt="Clobbr Logo" /></a> | **Clobbr** | Debug multiple cron expressions on a calendar. | [clobbr.app](https://clobbr.app) | 
| <a href="https://crontap.com" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/fe1aac71-b663-4f8e-a225-0c47b2eee14d" alt="Crontap Logo" /></a> | **Crontap** | Schedule API calls using cron syntax. | [crontap.com](https://crontap.com) | 
| <a href="https://tool.crontap.com" target="_blank"><img height="70px" src="https://github.com/apihustle/apihustle/assets/1515742/713ff923-b03c-43ec-9cfd-75e542d0f5c4" alt="CronTool Logo" /></a> | **CronTool** | Debug multiple cron expressions on a calendar. | [tool.crontap.com](https://tool.crontap.com)  |

-----------------
