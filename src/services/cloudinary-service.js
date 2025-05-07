export const cloudinaryService = {
  uploadImg
}

async function uploadImg(file) {
  const CLOUD_NAME = 'deyotfuqw'
  const UPLOAD_PRESET = 'toy_uploads'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const FORM_DATA = new FormData()
  FORM_DATA.append('file', file)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  try {
      const res = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: FORM_DATA
      })
      const { url } = await res.json()
      return url
  } catch (err) {
      console.error('Failed to upload image to Cloudinary', err)
      throw err
  }
}
