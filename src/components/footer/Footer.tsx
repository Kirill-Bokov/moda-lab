import { useNavigate } from "react-router-dom"

export function Footer() {
    const navigate = useNavigate()

    return (
        <footer className="bg-gray-100 mt-12">
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                <div>
                    <h3 className="font-semibold mb-3">О магазине</h3>
                    <p className="text-sm text-gray-600">
                        Современный интернет-магазин одежды, обуви и аксессуаров.
                        Качественные товары и актуальные коллекции.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Навигация</h3>
                    <ul className="flex flex-col gap-2 text-sm text-gray-600">
                        <li
                            className="cursor-pointer hover:text-black transition"
                            onClick={() => navigate("/")}
                        >
                            Главная
                        </li>
                        <li
                            className="cursor-pointer hover:text-black transition"
                            onClick={() => navigate("/catalog")}
                        >
                            Каталог
                        </li>
                        <li
                            className="cursor-pointer hover:text-black transition"
                            onClick={() => navigate("/favorites")}
                        >
                            Избранное
                        </li>
                        <li
                            className="cursor-pointer hover:text-black transition"
                            onClick={() => navigate("/cart")}
                        >
                            Корзина
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Контакты</h3>
                    <ul className="flex flex-col gap-2 text-sm text-gray-600">
                        <li>Email: support@example.com</li>
                        <li>Телефон: +7 (123) 456-478-90</li>
                        <li>Город: Беринг</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Разработка</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Проект разработан в рамках работы над портфолио.
                    </p>
                    <a
                        href="https://github.com/Kirill-Bokov"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-black transition"
                    >
                        GitHub: Kirill-Bokov
                    </a>
                </div>

            </div>

            <div className="border-t border-gray-200 text-center text-sm text-gray-500 py-4">
                © {new Date().getFullYear()} Все права защищены.
            </div>
        </footer>
    )
}
