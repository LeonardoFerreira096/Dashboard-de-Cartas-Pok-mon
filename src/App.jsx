/**
 * Nome do arquivo: App.jsx
 * Data de criação: 10/05/2025
 * Autor: Leonardo Costa Ferreira
 * Matrícula: 01738044
 *
 * Descrição:
 * Este componente React implementa um dashboard de cartas do Pokémon TCG.
 * Funcionalidades:
 * - Campo de busca por nome do Pokémon
 * - Persistência e exibição de cartas salvas no localStorage e botão para excluir do "Cartas salvas"
 * - Estilização com Tailwind
 */



import React, { useEffect, useState } from "react";
import Header from "./compenentes/Header";
import CartaModal from "./compenentes/CartaModal";
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

const App = () => {
  const [cartasFiltradas, setCartasFiltradas] = useState([]);
  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
  const [busca, setBusca] = useState('');
  const [cartaAtiva, setCartaAtiva] = useState(null);

  // Carregar cartas salvas do localStorage
  useEffect(() => {
    const salvas = localStorage.getItem("cartasSelecionadas");
    if (salvas) {
      setCartasSelecionadas(JSON.parse(salvas));
    }
  }, []);

  // Buscar cartas na API pelo nome
  useEffect(() => {
    if (busca.trim() === "") {
      setCartasFiltradas([]);
      return;
    }

    const fetchCartas = async () => {
      try {
        const resposta = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:*${encodeURIComponent(busca)}*`
        );
        const dados = await resposta.json();
        setCartasFiltradas(dados.data);
      } catch (erro) {
        console.error("Erro ao buscar cartas por nome:", erro);
      }
    };

    fetchCartas();
  }, [busca]);

  // Adicionar ou remover carta dos favoritos
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

  // Verificar se uma carta já foi salva
  const cartaEstaSelecionada = (id) => {
    return cartasSelecionadas.some((c) => c.id === id);
  };

  // Limpar favoritos
  const limparCartas = () => {
    setCartasSelecionadas([]);
    localStorage.removeItem("cartasSelecionadas");
  };

  return (
    <div>
      <Header busca={busca} setBusca={setBusca} />

      <main className="px-4">
        {/* Seção de Cartas Salvas */}
        {cartasSelecionadas.length > 0 && (
          <section className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Cartas Salvas</h2>
              <button
                onClick={limparCartas}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Limpar todas
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cartasSelecionadas.map((carta) => (
                <div
                  key={carta.id}
                  onClick={() => setCartaAtiva(carta)}
                  className="cursor-pointer bg-gray-100 border border-gray-300 rounded p-2 flex flex-col items-center hover:shadow"
                >
                  <img src={carta.images.small} alt={carta.name} className="w-20 mb-2" />
                  <h3 className="text-sm text-center font-semibold">{carta.name}</h3>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lista de Cartas Filtradas */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Cartas Pokémon</h2>
          {busca.trim() === "" && (
            <p className="text-gray-500 mb-4"></p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartasFiltradas.map((carta) => {
              const selecionada = cartaEstaSelecionada(carta.id);
              return (
                <div
                  key={carta.id}
                  className={`relative bg-white shadow-md rounded-lg overflow-hidden border p-4 hover:shadow-lg transition 
                    ${selecionada ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"}`}
                >
                  <img
                    src={carta.images.small}
                    alt={carta.name}
                    className="w-full mb-4 cursor-pointer"
                    onClick={() => setCartaAtiva(carta)}
                  />
                  <h3 className="text-lg font-semibold">{carta.name}</h3>
                  <p className="text-sm"><strong>HP:</strong> {carta.hp}</p>
                  <p className="text-sm"><strong>Tipo:</strong> {carta.types?.join(", ") || "N/A"}</p>
                  <p className="text-sm"><strong>Raridade:</strong> {carta.rarity || "N/A"}</p>

                  {/* Botão de favoritar/desfavoritar */}
                  <button
                    onClick={() => alternarSelecao(carta)}
                    className="absolute top-2 right-2 text-red-500 hover:scale-110 transition-transform"
                    title={selecionada ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    {selecionada ? (
                      <HeartSolid className="h-6 w-6" />
                    ) : (
                      <HeartOutline className="h-6 w-6" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Modal */}
      {cartaAtiva && (
        <CartaModal
          carta={cartaAtiva}
          aoFechar={() => setCartaAtiva(null)}
          aoAlternarFavorito={alternarSelecao}
          estaSelecionada={cartaEstaSelecionada(cartaAtiva.id)}
        />
      )}
    </div>
  );
};

export default App;
