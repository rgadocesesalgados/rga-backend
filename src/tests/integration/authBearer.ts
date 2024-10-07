export async function authBearer() {
  const auth = await fetch('http://localhost:3333/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      tel: process.env.ADMIN_TEL,
      password: process.env.ADMIN_PASSWORD,
    }),
  })

  const authBody = await auth.json()

  return {
    headers: { Authorization: `Bearer ${authBody.token}` },
  }
}
