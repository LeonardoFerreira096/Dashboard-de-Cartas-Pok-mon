import React, { useEffect, useState } from "react";
import Header from "./compenentes/Header";

const App = () => {
  const [colecaoDeCartas, setColecaoDeCartas] = useState([]);
  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);

  // Buscar cartas da API
  useEffect(() => {
    fetch("https://api.pokemontcg.io/v2/cards?pageSize=10")
      .then((res) => res.json())
      .then((data) => setColecaoDeCartas(data.data))
      .catch((err) => console.error("Erro ao buscar cartas:", err));
  }, []);

  // Carregar cartas salvas do localStorage
  useEffect(() => {
    const salvas = localStorage.getItem("cartasSelecionadas");
    if (salvas) {
      setCartasSelecionadas(JSON.parse(salvas));
    }
  }, []);

  // Função para adicionar/remover carta da seleção
  const alternarSelecao = (carta) => {
    const jaSelecionada = cartasSelecionadas.some((c) => c.id === carta.id);

    let novasCartas;
    if (jaSelecionada) {
      novasCartas = cartasSelecionadas.filter((c) => c.id !== carta.id);
    } else {
      novasCartas = [...cartasSelecionadas, carta];
    }

    setCartasSelecionadas(novasCartas);
    localStorage.setItem("cartasSelecionadas", JSON.stringify(novasCartas));
  };

  // Verifica se carta está selecionada
  const cartaEstaSelecionada = (id) => {
    return cartasSelecionadas.some((c) => c.id === id);
  };

  // Limpa todas as cartas salvas
  const limparCartas = () => {
    setCartasSelecionadas([]);
    localStorage.removeItem("cartasSelecionadas");
  };

  return (
    <div>
      <Header />
      <main className="px-4">
        <section aria-labelledby="titulo-cartas" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="titulo-cartas" className="text-2xl font-bold">Cartas de Pokémon Salvas</h2>
            {cartasSelecionadas.length > 0 && (
              <button onClick={limparCartas} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
                Limpar todas
              </button>
            )}
          </div>

          {cartasSelecionadas.length === 0 ? (
            <p className="text-gray-500 mb-4">Nenhuma carta salva ainda.</p>
          ) : (
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cartasSelecionadas.map((carta) => (
                <div
                  key={carta.id}
                  className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex gap-3 items-center"
                >
                  <img src={carta.images.small} alt={carta.name} className="w-16" />
                  <div>
                    <h3 className="text-md font-semibold">{carta.name}</h3>
                    <p className="text-sm"><strong>HP:</strong> {carta.hp}</p>
                    <p className="text-sm"><strong>Tipo:</strong> {carta.types?.join(", ") || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {colecaoDeCartas.length === 0 ? (
            <p className="text-center text-gray-500">Carregando cartas...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {colecaoDeCartas.map((carta) => (
                <div
                  key={carta.id}
                  onClick={() => alternarSelecao(carta)}
                  className={`cursor-pointer bg-white shadow-md rounded-lg overflow-hidden border p-4 hover:shadow-lg transition 
                    ${cartaEstaSelecionada(carta.id) ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"}`}
                >
                  <img src={carta.images.small} alt={carta.name} className="w-full mb-4" />
                  <h3 className="text-lg font-semibold">{carta.name}</h3>
                  <p className="text-sm"><span className="font-semibold">HP:</span> {carta.hp}</p>
                  <p className="text-sm"><span className="font-semibold">Tipo:</span> {carta.types?.join(", ") || "N/A"}</p>
                  <p className="text-sm"><span className="font-semibold">Raridade:</span> {carta.rarity || "N/A"}</p>
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
