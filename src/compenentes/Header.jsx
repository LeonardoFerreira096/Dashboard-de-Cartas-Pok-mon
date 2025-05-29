/**
 * Nome do arquivo: Header.jsx
 * Data de criação: 10/05/2025
 * Autor: Leonardo Costa Ferreira
 * Matrícula: 01738044
 *
 * Descrição:
 * Este componente React implementa um input para pesquisar cartas da API
 * Funcionalidades:
 * - exibir um modal ao clicar na carta e mostra detalhes.
 * - Estilização com Tailwind
 */

import React from "react";

const Header = ({ busca, setBusca }) => {
  return (
    <header className="p-4 bg-gray-100 flex items-center justify-center">
      <div className="flex items-center w-full max-w-4xl gap-4">
        {/* Logo usando o nome correto */}
        <img
          src="/Pokemon-Logo-PNG-Cutout.webp"
          alt="Logo Pokémon"
          className="h-10 w-auto"
        />

        {/* Campo de busca */}
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar cartas Pokémon..."
          className="border rounded px-4 py-2 flex-grow"
        />
      </div>
    </header>
  );
};

export default Header;
