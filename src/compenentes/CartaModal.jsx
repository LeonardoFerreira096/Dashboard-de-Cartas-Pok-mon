/**
 * Nome do arquivo: CartaModal.jsx
 * Data de criação: 26/05/2025
 * Autor: Leonardo Costa Ferreira
 * Matrícula: 01738044
 *
 * Descrição:
 * Este componente React implementa um modal para mostrar na tela detalhes 
 * da carta e um botão para salvar no componente Header.
 * Funcionalidades:
 * - exibir um modal ao clicar na carta e mostra detalhes.
 * - Estilização com Tailwind.
 */


import React, { useEffect } from "react";

// Componente para mostrar uma linha de informação (rótulo + valor)
const LinhaInfo = ({ rotulo, valor }) => (
  <p className="text-sm">
    <strong>{rotulo}:</strong> {valor || "N/A"}
  </p>
);

const CartaModal = ({ carta, aoFechar, aoAlternarFavorito, estaSelecionada }) => {
  useEffect(() => {
    const funcaoEsc = (e) => {
      if (e.key === "Escape") aoFechar();
    };
    document.addEventListener("keydown", funcaoEsc);
    return () => document.removeEventListener("keydown", funcaoEsc);
  }, [aoFechar]);

  const fecharAoClicarFora = (e) => {
    if (e.target.id === "fundoModal") aoFechar();
  };

  return (
    <div
      id="fundoModal"
      onClick={fecharAoClicarFora}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 relative max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <button
          onClick={aoFechar}
          aria-label="Fechar modal"
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl"
        >
          ×
        </button>

        <img
          src={carta.images.large || carta.images.small}
          alt={carta.name}
          className="w-full mb-4 rounded"
        />

        <h2 className="text-2xl font-bold mb-2">{carta.name}</h2>
        {carta.flavorText && (
          <p className="italic text-sm mb-4 text-gray-600">{carta.flavorText}</p>
        )}

        <div className="space-y-1">
          <LinhaInfo rotulo="HP" valor={carta.hp} />
          <LinhaInfo rotulo="Tipo" valor={carta.types?.join(", ")} />
          <LinhaInfo rotulo="Raridade" valor={carta.rarity} />
          <LinhaInfo rotulo="Estágio" valor={carta.stage || "N/A"} />
          <LinhaInfo rotulo="Número" valor={carta.number} />
          <LinhaInfo rotulo="Evolui de" valor={carta.evolvesFrom} />
          <LinhaInfo rotulo="Custo de Recuo" valor={carta.retreatCost?.join(", ")} />
          <LinhaInfo rotulo="Artista" valor={carta.artist} />
          <LinhaInfo rotulo="Conjunto" valor={carta.set?.name} />
        </div>

        {/* Habilidades */}
        {carta.abilities?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Habilidades</h3>
            {carta.abilities.map((hab, i) => (
              <p key={i} className="text-sm mb-1">
                <strong>{hab.name}:</strong> {hab.text}
              </p>
            ))}
          </div>
        )}

        {/* Ataques */}
        {carta.attacks?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Ataques</h3>
            {carta.attacks.map((atk, i) => (
              <p key={i} className="text-sm mb-1">
                <strong>{atk.name}</strong> ({atk.damage || 0}): {atk.text || "Sem descrição."}
              </p>
            ))}
          </div>
        )}

        {/* Fraquezas e Resistências */}
        {(carta.weaknesses || carta.resistances) && (
          <div className="mt-4 text-sm">
            {carta.weaknesses && (
              <p>
                <strong>Fraquezas:</strong>{" "}
                {carta.weaknesses.map(w => `${w.type} (${w.value})`).join(", ")}
              </p>
            )}
            {carta.resistances && (
              <p>
                <strong>Resistências:</strong>{" "}
                {carta.resistances.map(r => `${r.type} (${r.value})`).join(", ")}
              </p>
            )}
          </div>
        )}

        {/* Botão Favorito */}
        <button
          onClick={() => {
            aoAlternarFavorito(carta);
            aoFechar();
          }}
          className={`mt-6 w-full py-2 rounded text-white font-semibold transition-colors
            ${estaSelecionada ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {estaSelecionada ? "Remover dos Favoritos" : "Salvar Carta"}
        </button>
      </div>
    </div>
  );
};

export default CartaModal;
