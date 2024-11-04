import { UserProvider } from 'context/UserContext';
import { InventoryProvider } from '../context/InventoryContext';

function App({ children }) {
  return (
    <UserProvider>
      <InventoryProvider>{children}</InventoryProvider>;
    </UserProvider>
  );
}

export default App;
