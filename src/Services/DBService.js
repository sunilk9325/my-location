import { openDB } from 'idb';

const dbPromise = openDB('location-store', 1, {
  upgrade(db) {
    db.createObjectStore('location');
  },
});

const idbKeyval = {
  async get(key) {
    return (await dbPromise).get('location', key);
  },
  async set(key, val) {
    return (await dbPromise).put('location', val, key);
  },
  async delete(key) {
    return (await dbPromise).delete('location', key);
  },
  async clear() {
    return (await dbPromise).clear('location');
  },
  async keys() {
    return (await dbPromise).getAllKeys('location');
  }
};

export default idbKeyval;