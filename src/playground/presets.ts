export interface Preset {
  name: string
  schema: string
  data: string
}

const s = (o: unknown) => JSON.stringify(o, null, 2)
const d = (o: unknown) => JSON.stringify(o)

export const presets: Preset[] = [
  {
    name: 'Format violation (email)',
    schema: s({ type: 'object', properties: { email: { type: 'string', format: 'email' }, age: { type: 'integer' } }, required: ['email'] }),
    data: d({ email: 'not-an-email', age: -3 }),
  },
  {
    name: 'Missing required (did-you-mean)',
    schema: s({ type: 'object', properties: { name: { type: 'string' }, age: { type: 'integer' } }, required: ['name'] }),
    data: d({ nme: 'Mert', age: 26 }),
  },
  {
    name: 'Type mismatch',
    schema: s({ type: 'object', properties: { count: { type: 'integer' } }, required: ['count'] }),
    data: d({ count: 'twelve' }),
  },
  {
    name: 'oneOf branch collapse',
    schema: s({ type: 'object', properties: { pet: { oneOf: [{ type: 'object', properties: { bark: { type: 'boolean' } }, required: ['bark'] }, { type: 'object', properties: { meow: { type: 'boolean' } }, required: ['meow'] }] } } }),
    data: d({ pet: { chirp: true } }),
  },
  {
    name: 'Nested object',
    schema: s({ type: 'object', properties: { user: { type: 'object', properties: { email: { type: 'string', format: 'email' } }, required: ['email'] } }, required: ['user'] }),
    data: d({ user: { email: 5 } }),
  },
]
