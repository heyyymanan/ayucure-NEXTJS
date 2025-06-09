export function getOrCreateGuestSessionId() {
  let sessionId = localStorage.getItem('guest_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID(); // Or use `uuid` package
    localStorage.setItem('guest_session_id', sessionId);
  }
  return sessionId;
}