import { openDB } from 'idb'

export const imageDB = await openDB('ImageGallery', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('images')) {
      db.createObjectStore('images', { keyPath: 'id' })
    }
  }
})
