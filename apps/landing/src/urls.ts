const docsOrigin   = import.meta.env.DEV ? 'http://localhost:5173' : ''
const editorOrigin = import.meta.env.DEV ? 'http://localhost:5174' : ''

export const docsUrl   = (path: string) => `${docsOrigin}/wiremd${path}`
export const editorUrl = () => `${editorOrigin}/wiremd/editor/`
