import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Angebot from './pages/Angebot'
import Inspirationen from './pages/Inspirationen'
import Unternehmen from './pages/Unternehmen'
import Jobs from './pages/Jobs'
import Kontakt from './pages/Kontakt'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="angebot" element={<Angebot />} />
          <Route path="inspirationen" element={<Inspirationen />} />
          <Route path="unternehmen" element={<Unternehmen />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="kontakt" element={<Kontakt />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
