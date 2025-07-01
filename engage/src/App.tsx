import { Routes, Route } from 'react-router-dom'
import AppRoutes from './routes/Routes'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </div>
  )
}

export default App
