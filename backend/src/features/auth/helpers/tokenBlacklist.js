const tokenBlacklist = new Set();

export function blacklistToken(token) {
  tokenBlacklist.add(token);
}

export function isTokenBlacklisted(token) {
  return tokenBlacklist.has(token);
}
