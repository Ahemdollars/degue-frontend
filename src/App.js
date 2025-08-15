import './App.css';
import { CommandeCreateForm } from './ui-components/CommandeCreateForm'; // chemin mis à jour
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <AmplifyProvider>
      <div className="App">
        <header className="App-header">
          <h1>Passez votre commande de Dégué</h1>
          <CommandeCreateForm />
        </header>
      </div>
    </AmplifyProvider>
  );
}

export default App;