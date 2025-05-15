import React, { useEffect, useState } from "react";
import Header from "./compenentes/Header";

const App = () => {
  const [colecaoDeCartas, setColecaoDeCartas] = useState([])

  useEffect(() => {
    fetch("https://api.pokemontcg.io/v2/cards?pageSize=20")
      .then((res) => res.json())
      .then((data) => setColecaoDeCartas(data.data))
      .catch((err) => console.error("Erro ao buscar cartas:", err))
  }, [])

  return (
    <div>
      <Header />
      <main className="px-4">
        <section aria-labelledby="titulo-cartas" className="mt-6">
          <h2 id="titulo-cartas" className="text-2xl font-bold mb-4">Cartas Carregadas:</h2>
           {colecaoDeCartas.length === 0 ? (
            <p className="text-center text-gray-500">Carregando cartas...</p>) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {colecaoDeCartas.map((carta) => (
                <div
                  key={carta.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 p-4">
                  <img src={carta.images.small} alt={carta.name} className="w-full mb-4" />
                  <h3 className="text-lg font-semibold">{carta.name}</h3>
                  <p className="text-sm"><span className="font-semibold">HP:</span> {carta.hp}</p>
                  <p className="text-sm"><span className="font-semibold">Tipo:</span>{" "}{carta.types?.join(", ") || "N/A"} </p>
                  <p className="text-sm"><span className="font-semibold">Raridade:</span>{" "}{carta.rarity || "N/A"}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
