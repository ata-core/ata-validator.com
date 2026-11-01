import { lazy } from 'react'

// The playground and the race carry the validators they run (ata with its
// code generator, ajv, zod); each loads with its own route so the docs pages
// do not download them.
export const Playground = lazy(() => import('./playground/Playground'))
export const Race = lazy(() => import('./race/Race'))
