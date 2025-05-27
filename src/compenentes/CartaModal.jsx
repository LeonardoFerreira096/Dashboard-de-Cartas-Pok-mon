import React, { useEffect } from "react";

const CartaModal = ({ carta, onClose, onToggleFavorito, estaSelecionada }) => {
  useEffect(() => {
    const escFunction = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escFunction);
    return () => document.removeEventListener("keydown", escFunction);
  }, [onClose]);

  const fecharAoClicarFora = (e) => {
    if (e.target.id === "bg") {
      onClose();
    }
  };

  return (
    <div
      id="bg"
      onClick={fecharAoClicarFora}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-4 relative w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <img
          src={carta.images.small}
          alt={carta.name}
          className="w-full h-auto mb-4 rounded"
        />
        <h2 className="text-xl font-bold mb-2">{carta.name}</h2>
        <p className="text-sm"><strong>HP:</strong> {carta.hp}</p>
        <p className="text-sm"><strong>Tipo:</strong> {carta.types?.join(", ") || "N/A"}</p>
        <p className="text-sm"><strong>Raridade:</strong> {carta.rarity || "N/A"}</p>
        <p className="text-sm"><strong>Artista:</strong> {carta.artist || "Desconhecido"}</p>
        <p className="text-sm"><strong>Set:</strong> {carta.set?.name || "N/A"}</p>

        <button
          onClick={() => {
            onToggleFavorito(carta);
            onClose();
          }}
          className={`mt-4 px-4 py-2 rounded text-white font-semibold w-full 
            ${estaSelecionada ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {estaSelecionada ? "Remover dos Favoritos" : "Salvar Carta"}
        </button>
      </div>
    </div>
  );
};

export default CartaModal;
