import fs from 'node:fs/promises'
import path from 'node:path'

export async function removeCreds(userId: string) {
  try {
    const dir = path.join(__dirname + '../' + '../' + `../creds/${userId}`)

    for (const file of await fs.readdir(dir)) {
      await fs.unlink(path.join(dir, file))
    }
  } catch (err) {}
}
