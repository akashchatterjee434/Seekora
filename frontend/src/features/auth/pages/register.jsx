import { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Registration submitted:', formData)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090d] px-6 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(239,68,68,0.25),_transparent_36%),linear-gradient(135deg,_#08090d_20%,_#2b0d16_55%,_#10090d)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-red-200/15 bg-black/35 p-8 shadow-2xl shadow-red-950/40 backdrop-blur-xl sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-red-300">Seekora</p>
          <h1 className="text-3xl font-bold tracking-tight">Start exploring</h1>
          <p className="mt-2 text-sm text-zinc-400">Create your account and find your next direction.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="register-username">Username</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
              id="register-username"
              name="username"
              onChange={handleChange}
              placeholder="Choose a username"
              required
              type="text"
              value={formData.username}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="register-email">Email</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
              id="register-email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              required
              type="email"
              value={formData.email}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="register-password">Password</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
              id="register-password"
              name="password"
              onChange={handleChange}
              placeholder="Create a password"
              required
              type="password"
              value={formData.password}
            />
          </div>

          <button className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-700 px-4 py-3 font-semibold shadow-lg shadow-red-950/50 transition hover:from-red-400 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-[#170b10]" type="submit">
            Create account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account? <Link className="font-semibold text-red-300 hover:text-red-200" to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  )
}

export default Register
