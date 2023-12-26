import { createAsync, cache } from '@solidjs/router'

type Student = { name: string; house: string }

const getStudents = cache(async () => {
  const response = await fetch('https://hogwarts.deno.dev/students')
  return (await response.json()) as Student[]
}, 'students')

export const route = {
  load: () => getStudents(),
}

export default function Page() {
  const students = createAsync(getStudents)

  return (
    <ul>
      {students() && students()?.map((student) => <li>{student.name}</li>)}
    </ul>
  )
}
