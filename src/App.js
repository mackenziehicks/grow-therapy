import Header from './app/components/frame/Header.tsx';
import Dashboard from './app/views/dashboard/Dashboard.tsx';
import './assets/tailwind.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
