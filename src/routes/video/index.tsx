import { createAsync, cache } from '@solidjs/router'
import type { MDXComponents } from 'mdx/types'
import matter from 'gray-matter'

const getMdxFilesFrontmatter = cache(async () => {
  const mdxFiles = import.meta.glob(`./*.mdx`, { eager: true }) as Record<
    string,
    () => Promise<MDXComponents>
  >
  const mdxFilesFrontmatter = Object.entries(mdxFiles).map(([path]) => {
    const absoluteFilePath = new URL(path, import.meta.url)
    const srcIndex = absoluteFilePath.pathname.indexOf('/src')
    const projectFilePath =
      srcIndex !== -1 ? absoluteFilePath.pathname.substring(srcIndex) : ''
    const frontmatter = matter.read(`./${projectFilePath}`).data
    return frontmatter
  })
  return mdxFilesFrontmatter
}, 'mdxFiles')

export const route = {
  load: () => getMdxFilesFrontmatter(),
}

export default function Page() {
  const mdxFilesFrontmatter = createAsync(getMdxFilesFrontmatter)

  return (
    <>
      <h1>Video</h1>
      <ul>
        {mdxFilesFrontmatter() &&
          mdxFilesFrontmatter()!.map((item) => <li>{item.titleFull}</li>)}
      </ul>
    </>
  )
}
