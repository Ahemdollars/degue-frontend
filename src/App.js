import './App.css';
import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';

// NOTE : La configuration Amplify doit être dans votre fichier src/index.js

const client = generateClient();

const createCommandeMutation = `
  mutation CreateCommande($input: CreateCommandeInput!) {
    createCommande(input: $input) {
      id
      prenom
      nom
    }
  }
`;

function App() {
  // LA CORRECTION EST ICI : il n'y a plus qu'un seul "="
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    quartier: '',
    quantite: 1,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('Envoi de la commande...');
    try {
      const prixUnitaire = 1500;
      const quantiteInt = parseInt(formData.quantite);

      if (isNaN(quantiteInt) || quantiteInt <= 0) {
        alert("La quantité doit être un nombre valide.");
        return;
      }

      const commandeInput = {
        prenom: formData.prenom,
        nom: formData.nom,
        telephone: formData.telephone,
        quartier: formData.quartier,
        quantite: quantiteInt,
        montantTotal: quantiteInt * prixUnitaire,
        statut: 'Payée',
      };

      await client.graphql({
        query: createCommandeMutation,
        variables: { input: commandeInput },
      });

      alert('Commande passée avec succès !');
      setFormData({ prenom: '', nom: '', telephone: '', quartier: '', quantite: 1 });
    } catch (error) {
      console.error('Erreur lors de la création de la commande', error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Passez votre commande de Dégué</h1>
        <form onSubmit={handleSubmit} className="order-form">
          <input name="prenom" type="text" placeholder="Votre Prénom" value={formData.prenom} onChange={handleInputChange} required />
          <input name="nom" type="text" placeholder="Votre Nom" value={formData.nom} onChange={handleInputChange} required />
          <input name="telephone" type="tel" placeholder="Téléphone" value={formData.telephone} onChange={handleInputChange} required />
          <input name="quartier" type="text" placeholder="Votre Quartier (facultatif)" value={formData.quartier} onChange={handleInputChange} />
          <input name="quantite" type="number" placeholder="Quantité" value={formData.quantite} onChange={handleInputChange} min="1" required />
          <button type="submit">Passer la commande</button>
        </form>
      </header>
    </div>
  );
}

export default App;