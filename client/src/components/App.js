import { InventoryProvider } from '../context/InventoryContext';

function App({ children }) {
  return <InventoryProvider>{children}</InventoryProvider>;
}

export default App;
