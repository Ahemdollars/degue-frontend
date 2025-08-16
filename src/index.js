// 1. D'abord, TOUS les imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';

// 2. Ensuite, la configuration
Amplify.configure({
  aws_project_region: 'eu-west-3',
  aws_appsync_graphqlEndpoint: 'https://4uzvq26kbjhlfsv3mfwe17lna.appsync-api.eu-west-3.amazonaws.com/graphql',
  aws_appsync_region: 'eu-west-3',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-jtaxwjcbhnhgrso5huppyr54',
});

// 3. Enfin, le reste du code de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();