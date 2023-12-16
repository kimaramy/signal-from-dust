import React from 'react';
import type { Route } from 'next';

/**
 * [Typed Routes](https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links)
 */
export type TypedRoute = Route;

export type PathParams<T extends string> = { [key: string]: T };

export type SearchParams = { [key: string]: string | string[] | undefined };

/**
 * - https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 */
export type NextPageProps<TPath extends string = string> = {
  params?: PathParams<TPath>;
  searchParams?: SearchParams;
};

/**
 * Wrap static pages using searchParams with Suspense + useSearchParam comb
 * - https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering
 */
export type NextStaticPageProps<TPath extends string = string> = {
  params: PathParams<TPath>;
};

/**
 * Layout component can't hold searchParams because it renders sub-pages
 * - https://nextjs.org/docs/app/api-reference/file-conventions/layout#layouts-do-not-receive-searchparams
 */
export type NextLayoutProps<TPath extends string = string> = {
  params?: PathParams<TPath>;
};

/**
 * - https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates
 * - https://nextjs.org/docs/app/api-reference/file-conventions/template
 */
export type NextTemplateProps = {
  children: React.ReactNode;
};
