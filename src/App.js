import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  to,
}) => {
  const navigate = useNavigate();
  return (
    <button
      type={type}
      onClick={() => (to ? navigate(to) : onClick?.())}
      className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm 
        ${
          variant === "outline"
            ? "border-2 border-pink-400 text-pink-600 bg-white hover:bg-pink-50"
            : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:brightness-110"
        }`}
    >
      {children}
    </button>
  );
};

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto flex flex-col gap-14 text-gray-800"
    >
      {/* Заголовок */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Умный поиск домашних животных
        </h2>
        <p className="text-gray-600">
          Поможем найти пропавших или найденных питомцев с помощью
          искусственного интеллекта
        </p>
      </div>

      {/* Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <div className="bg-pink-100 w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4">
            🐶
          </div>
          <h3 className="text-xl font-semibold mb-3">
            Мой питомец{" "}
            <span className="font-bold text-pink-600">потерялся</span>
          </h3>
          <Link to="/lost">
            <Button>Создать заявку</Button>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <div className="bg-rose-100 w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4">
            🐱
          </div>
          <h3 className="text-xl font-semibold mb-3">
            Найден{" "}
            <span className="font-bold text-rose-600">чужой питомец</span>
          </h3>
          <Link to="/found">
            <Button>Создать заявку</Button>
          </Link>
        </motion.div>
      </div>

      {/* О нас */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-white p-8 rounded-2xl shadow-md">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="md:w-1/2 w-full rounded-xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1601758174500-0a31b1b5a6a1?auto=format&fit=crop&w=800&q=80"
            alt="О нас"
            className="w-full h-72 object-cover rounded-xl"
          />
        </motion.div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-3 text-gray-800">О нас</h3>
          <p className="text-gray-600 leading-relaxed">
            Наша умная доска объявлений помогает найти пропавших собак и кошек.
            Мы используем искусственный интеллект для быстрого и удобного поиска
            питомцев с помощью фотографии. Если в базе есть объявления о пропаже
            и находке с фото одного и того же животного — публикации будут
            сопоставлены автоматически.
          </p>
        </div>
      </section>

      {/* Контакты */}
      <footer className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 text-center shadow-inner">
        <h4 className="text-lg font-bold mb-2">Контакты</h4>
        <p>
          Почта:{" "}
          <a
            href="mailto:sobaka@mail.ru"
            className="text-pink-600 hover:underline"
          >
            sobaka@mail.ru
          </a>
        </p>
        <p>
          Телефон:{" "}
          <a href="tel:+79997777777" className="text-pink-600 hover:underline">
            +7 999 777-77-77
          </a>
        </p>
      </footer>
    </motion.main>
  );
}

function LostOrFound({ type }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Заявка успешно отправлена! (${type === "lost" ? "Потеря" : "Находка"})`
    );
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === "lost" ? "Заявить о пропаже" : "Заявить о находке"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Кличка"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Порода"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <Button type="submit" className="w-full">
          Опубликовать
        </Button>
      </form>
    </motion.div>
  );
}

function AuthPage({ type }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === "login" ? "Вход" : "Регистрация"}
      </h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Почта"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <Button className="w-full">
          {type === "login" ? "Войти" : "Зарегистрироваться"}
        </Button>
      </form>
    </motion.div>
  );
}

export default function PetFind() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex flex-col items-center p-6 font-sans">
        {/* HEADER */}
        <header className="w-full max-w-5xl flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-pink-400 to-rose-500 w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white shadow-md">
              🐾
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800">Pet Find</h1>
          </div>
          <div className="space-x-3">
            <Link to="/login">
              <Button>Вход</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">Регистрация</Button>
            </Link>
          </div>
        </header>

        {/* Основной контент */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lost" element={<LostOrFound type="lost" />} />
          <Route path="/found" element={<LostOrFound type="found" />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/register" element={<AuthPage type="register" />} />
        </Routes>
      </div>
    </Router>
  );
}
