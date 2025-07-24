export function getUserFromToken(token: string): { userId: string } | null {
  try {
    const base64 = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
}
