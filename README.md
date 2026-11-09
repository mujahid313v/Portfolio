# Mujahid Vhora — The Vault

An original developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion. The “Magic happens behind the doors” section replaces the former combination dial and separate project grid with a pinned, scroll-driven category wall and cross-fading project rooms.

## Local setup

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Verify a production build with `npm run build`, and serve it with `npm start`. `npm run lint` runs TypeScript checking.

## Deploy on Vercel

Import this repository into Vercel and use the Next.js framework preset. No environment variables are required. Contact links use `mailto:`.

## Structure

```text
src/app/
  page.tsx             Hero, security, experience and contact sections
  DoorsSection.tsx     Pinned doors, mobile swipe rail, room transitions
  layout.tsx           SEO metadata, Open Graph image, root layout
  globals.css          Tailwind import and base styles
  vault.css            Existing portfolio visual system
  doors.css            Door wall, rooms, responsive and reduced-motion styles
  opengraph-image.tsx  Generated social sharing image
src/data/
  doors.ts             Door categories, taglines and checklists
  projects.ts          Project cards and category assignments
  security.ts          Verified findings, severity and before/after details
public/projects/       Local screenshot images/placeholders
public/resume.pdf      Downloadable resume
public/certs/          Certificate artwork
```

## Add or edit projects

Edit `src/data/projects.ts`. Each entry uses:

```ts
{
  name: "Project name",
  category: "Web Development", // must match a door title
  description: "One or two lines about the project.",
  tech: ["Next.js", "TypeScript"],
  liveUrl: "https://example.com", // use "" if not available
  githubUrl: "https://github.com/account/repo", // use "" if not available
  image: "/projects/project-screenshot.svg",
}
```

Put the screenshot in `public/projects/` and reference it with a path beginning `/projects/`. The room UI displays local screenshots and will not render unavailable links as active buttons. Current image files are original SVG mock screenshots marked as placeholders; replace them with real captures when ready.

The Microsoft documentation typo fix is listed as **Merged** in the Open Source room. The repository name and pull-request URL were not supplied, so both links remain unavailable in the data. Add the real URL to `githubUrl` once known.

## Add a door/category

Add a category object to `doorCategories` in `src/data/doors.ts` with a unique `id`, a `title`, a one-line `tagline`, and four or five checklist strings. Then add at least one project in `src/data/projects.ts` whose `category` exactly matches that title. Because `PortfolioProject["category"]` uses the door category type, TypeScript will flag mismatched category names.

The pinned desktop track position and scroll distance are based on five doors. If you change the number of doors, update `-976` in the `wallX` transform and the `height` in `doors.css` so the last door can reach the center. The mobile rail uses scroll snapping and reads the category list automatically.

## Other content

Edit the hero, career commits, and contact links in `src/app/page.tsx`. Security cards and totals come from `src/data/security.ts`; the displayed counts update automatically from that list. The portrait is still a CSS placeholder. Replace `public/resume.pdf` or certificate files in `public/certs/` to update those assets. Change the canonical domain and SEO descriptions in `src/app/layout.tsx` for another deployment hostname.

## Background and theme

`src/app/theme.css` defines the light and dark design tokens. The default follows the browser’s color-scheme preference; the navbar toggle saves an explicit choice as `portfolio-theme` in local storage. A small synchronous script in the document head applies the saved or system theme before the first paint to avoid a theme flash. Storage access is protected with `try/catch`.

The fixed aurora layer is rendered from `layout.tsx`. Four low-opacity, blurred blobs drift with transform-only 22–29 second CSS animations; a tiled SVG turbulence overlay adds subtle grain. An `IntersectionObserver` updates the aurora color mapping for the hero, doors, security, experience, and contact sections. The contact scene removes blob glow. The timeline year selects the experience-era palette. The faint grid is applied only to the hero. Reduced-motion settings freeze the blobs and remove theme transitions.

## Accessibility and motion

The desktop doors respond to scroll and arrow keys; mobile doors use a horizontal snap rail. The project room content and SVG assets are warmed before entry, then shown in a dark cross-fade after the door swings open. Rooms support Escape, focus the back action, and keep keyboard focus within the dialog. Reduced-motion preferences shorten or skip transitions. The page includes a skip link, semantic landmarks, visible focus styles, and no loading screen.
