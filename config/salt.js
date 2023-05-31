import fs from 'fs-extra'

const salt = async () => {
  try {
    const obj = await fs.readJSON('./salt.json')
    if (obj?.salt) return obj.salt
  } catch { }
  return null
}

export default salt
