import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginMutation, useRegisterMutation } from "../app/api/authApi"

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const [register] = useRegisterMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            if (isLogin) {
                await login({ email, password }).unwrap()
            } else {
                await register({ email, password, name }).unwrap()
            }
            navigate("/")
        } catch (err: any) {
            setError(err.data?.message || "An error occurred")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                <h1 className="text-3xl font-semibold text-center text-gray-700">{isLogin ? "Вход" : "Регистрация"}</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-semibold"
                    >
                        {isLogin ? "Войти" : "Зарегистрироваться"}
                    </button>
                </form>

                <button
                    onClick={() => {
                        setIsLogin(!isLogin)
                        setError("")
                    }}
                    className="w-full text-teal-600 hover:text-teal-700 transition font-semibold"
                >
                    {isLogin ? "Ещё нет профиля?" : "Уже есть аккаунт?"}
                </button>
            </div>
        </div>
    )
}
