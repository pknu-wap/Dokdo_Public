import { UserProvider } from 'context/UserContext';
import { InventoryProvider2 } from 'context/InventoryContext2';

function App({ children }) {
  return (
    <UserProvider>
      <InventoryProvider2>{children}</InventoryProvider2>
    </UserProvider>
  );
}

export default App;
