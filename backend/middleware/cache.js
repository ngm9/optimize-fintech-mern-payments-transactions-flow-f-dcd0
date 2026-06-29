const cacheStore = new Map();

// Very simple in-memory cache structure, currently unused in routes.
// You may choose to leverage a pattern like this for short-lived caching where appropriate.

function getCache(key) {
  const entry = cacheStore.get(key);
  if (!entry) return null;
  const now = Date.now();
  if (entry.expiresAt && entry.expiresAt < now) {
    cacheStore.delete(key);
    return null;
  }
  return entry.value;
}

function setCache(key, value, ttlMs) {
  const expiresAt = ttlMs ? Date.now() + ttlMs : null;
  cacheStore.set(key, { value, expiresAt });
}

module.exports = {
  cacheStore,
  getCache,
  setCache
};
