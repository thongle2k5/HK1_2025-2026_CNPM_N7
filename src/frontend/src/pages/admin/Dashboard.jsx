function App() {
  return (
   <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Bus Admin</h1>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-blue-400">Dashboard</a>
          <a href="#" className="block hover:text-blue-400">Routes</a>
          <a href="#" className="block hover:text-blue-400">Drivers</a>
          <a href="#" className="block hover:text-blue-400">Buses</a>
          <a href="#" className="block hover:text-blue-400">Reports</a>
        </nav>
      </aside>

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border rounded px-3 py-1 w-64"
          />
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">🔔</button>
            <img
              src="https://via.placeholder.com/32"
              alt="avatar"
              className="rounded-full w-8 h-8"
            />
          </div>
        </header>

        {/* Nội dung dashboard */}
        <main className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Tổng quan hệ thống</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">📊 Thống kê</div>
            <div className="bg-white p-6 rounded-lg shadow">🚌 Số xe</div>
            <div className="bg-white p-6 rounded-lg shadow">👨‍✈️ Tài xế</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
