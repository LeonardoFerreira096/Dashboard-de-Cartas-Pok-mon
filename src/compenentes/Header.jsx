
const Header = ({ busca, setBusca, aoBuscar }) => {
  return (
    <header className="bg-white py-4 px-6 shadow flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <input type="text"value={busca}onChange={(e) => setBusca(e.target.value)}placeholder="Digite o nome da carta"className="border border-gray-300 px-3 py-1 rounded"/>
        <button onClick={aoBuscar} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Buscar</button>
      </div>
    </header>
  )
}

export default Header;
