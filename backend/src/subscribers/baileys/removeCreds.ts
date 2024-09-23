import fs from 'node:fs/promises'
import path from 'node:path'

export async function removeCreds(socketId: string) {
  console.log('socketId', socketId)
  try {
    const dir = path.join(__dirname + '../' + '../' + `../creds`)

    for (const file of await fs.readdir(dir)) {
      await fs.unlink(path.join(dir, file))
    }
  } catch (err) {}
}
