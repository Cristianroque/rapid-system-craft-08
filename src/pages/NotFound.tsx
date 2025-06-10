import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#7B5FFF] mb-2">
          Página não encontrada
        </h2>
        <p className="text-gray-400 mb-6">
          A rota <span className="font-semibold">{location.pathname}</span> não existe ou foi removida.
        </p>
        <a
          href="/"
          className="inline-block bg-[#7B5FFF] hover:bg-[#604ad6] text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
