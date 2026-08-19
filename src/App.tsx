import './App.css'
import Navbar  from './components/Navbar/Navbar'

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
