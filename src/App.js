import './App.css';
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api'; // L'IMPORT CORRECT
import '@aws-amplify/ui-react/styles.css';

// La configuration, qui est correcte
Amplify.configure({
  aws_project_region: 'eu-west-3',
  aws_appsync_graphqlEndpoint: 'https://4uzvq26kbjhlfsv3mfwe17lna.appsync-api.eu-west-3.amazonaws.com/graphql',
  aws_appsync_region: 'eu-west-3',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-jtaxwjcbhnhgrso5huppyr54',
});

// Le nouveau client API, qui est la méthode moderne
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

      // LA CORRECTION EST ICI : On utilise le nouveau "client"
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