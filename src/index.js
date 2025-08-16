import { Amplify } from 'aws-amplify';

Amplify.configure({
  aws_project_region: 'eu-west-3',
  aws_appsync_graphqlEndpoint: 'https://4uzvq26bkjbhlfsv3mfwel7lna.appsync-api.eu-west-3.amazonaws.com/graphqlCOPIEZ_VOTRE_ENDPOINT_API_ICI',
  aws_appsync_region: 'eu-west-3',
  aws_appsync_authenticationType: 'API_KEYda2-jtaxwjx3nbhahgrso5huppyr54',
  aws_appsync_apiKey: 'da2-jtaxwjx3nbhahgrso5huppyr54CI',
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
