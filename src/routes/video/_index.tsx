import fs from 'node:fs/promises'
import { createAsync, cache } from '@solidjs/router'
import matter from 'gray-matter'

const getFileContent = cache(async () => {
  'use server'
  const dirPath = 'src/routes/video/'

  // READ SINGLE FILE SYNC // WORKS
  // const fileContent = fs.readFileSync(filePath, 'utf8') // WORKS

  // READ SINGLE FILE ASYNC // WORKS
  // return await fs
  //   .readFile(filePath, {
  //     encoding: 'utf8',
  //   })
  //   .then((data) => {
  //     return data
  //   })
  //   .catch((error) => {
  //     console.error(`Error reading files: ${error}`)
  //   })

  // Read MDX frontmatter
  return await fs
    .readdir(dirPath)
    .then(async (data: string[]) => {
      const mdxFiles = data
        .filter((item) => /\.(mdx)$/.test(item))
        .map((item: string) => {
          const itemFilePath = `src/routes/video/${item}`
          const frontmatter = matter.read(itemFilePath).data
          return frontmatter
        })

      console.log(mdxFiles)
      return mdxFiles
    })
    .catch((error) => console.error('Error: ' + error))
}, 'fileContent')

export const route = {
  load: () => getFileContent(),
}

export default function Page() {
  const fileContent = createAsync(getFileContent)

  return (
    <>
      <h1>Video Archive</h1>

      <ul>
        {fileContent()
          ? fileContent()!.map((item) => <li>{item.titleFull}</li>)
          : ''}
      </ul>
    </>
  )
}
