import React from 'react';
import type { Route } from 'next';

/**
 * [Typed Routes](https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links)
 */
export type TypedRoute = Route;

export type PathParams = { [key: string]: string | undefined };

export type SearchParams = { [key: string]: string | string[] | undefined };

/**
 * - https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 */
export type NextPageProps<T = undefined> = {
  params: T extends { [key: string]: string } ? T : PathParams;
  searchParams: SearchParams;
};

/**
 * Layout component can't hold searchParams because it renders sub-pages
 * - https://nextjs.org/docs/app/api-reference/file-conventions/layout#layouts-do-not-receive-searchparams
 */
export type NextLayoutProps = {
  children: React.ReactNode;
  params: PathParams;
};

/**
 * - https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates
 * - https://nextjs.org/docs/app/api-reference/file-conventions/template
 */
export type NextTemplateProps = {
  children: React.ReactNode;
};
