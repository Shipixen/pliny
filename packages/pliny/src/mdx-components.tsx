/* eslint-disable react/display-name */
import React from 'react'
import * as _jsx_runtime from 'react/jsx-runtime'
import ReactDOM from 'react-dom'
import type { MDXComponents } from 'mdx/types'

// Add interface for React internals
interface ReactWithInternals {
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: any
  __SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: any
}

// Extend React module
declare module 'react' {
  interface React extends ReactWithInternals {}
}

export interface MDXLayoutRenderer {
  code: string
  components?: MDXComponents
  [key: string]: unknown
}

const getMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {}
): React.ComponentType<any> => {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals }
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope)).default
}

// TS transpile it to a require which causes ESM error
// Copying the function from contentlayer as a workaround
// Copy of https://github.com/contentlayerdev/contentlayer/blob/main/packages/next-contentlayer/src/hooks/useMDXComponent.ts
export const useMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {}
): React.ComponentType<any> => {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals])
}

const getReactWithInternals = () => React as unknown as ReactWithInternals

export const MDXLayoutRenderer = ({ code, components, ...rest }: MDXLayoutRenderer) => {
  const r = getReactWithInternals()
  const reactInternals =
    r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
    r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE

  r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = reactInternals

  const Mdx = useMDXComponent(code)
  return <Mdx components={components} {...rest} />
}
