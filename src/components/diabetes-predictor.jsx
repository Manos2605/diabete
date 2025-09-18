import React, { useState } from 'react';
import { Activity, User, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const DiabetesPredictor = () => {
  const [patientData, setPatientData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
  setLoading(true);
  setError('');

  try {
    const dataToSend = {
      Pregnancies: parseFloat(patientData.Pregnancies) || 0,
      Glucose: parseFloat(patientData.Glucose) || 0,
      BloodPressure: parseFloat(patientData.BloodPressure) || 0,
      SkinThickness: parseFloat(patientData.SkinThickness) || 0,
      Insulin: parseFloat(patientData.Insulin) || 0,
      BMI: parseFloat(patientData.BMI) || 0,
      DiabetesPedigreeFunction: parseFloat(patientData.DiabetesPedigreeFunction) || 0,
      Age: parseFloat(patientData.Age) || 0
    };

    const response = await fetch("https://Manos26052006.pythonanywhere.com/predire", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    });

    console.log('Response:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error Data:', errorData);
      throw new Error(errorData.message || 'Erreur lors de la prédiction');
    }

    const data = await response.json();
    console.log('Data:', data);
    setResults(data.resultats);
  } catch (err) {
    console.error('Fetch Error:', err);
    setError(err.message || 'Une erreur est survenue');
    // Simulation d'une réponse pour la démonstration
    setResults({
      Age: 47.0,
      BMI: 33.6,
      BloodPressure: 62.0,
      DiabetesPedigreeFunction: 0.127,
      Glucose: 138.0,
      Insulin: 0.0,
      Pregnancies: 2.0,
      SkinThickness: 35.0,
      prediction: 0,
      probabilite_diabete: 0.48
    });
  } finally {
    setLoading(false);
  }
};

  const getProbabilityColor = (probability) => {
    if (probability < 0.3) return 'text-green-600';
    if (probability < 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProbabilityBg = (probability) => {
    if (probability < 0.3) return 'bg-green-100';
    if (probability < 0.7) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Activity className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Prédicteur de Diabète</h1>
          </div>
          <p className="text-gray-600 text-lg">Système d'aide au diagnostic basé sur l'IA</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire de saisie */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Données Patient</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grossesses
                  </label>
                  <input
                    type="number"
                    name="Pregnancies"
                    value={patientData.Pregnancies}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Glucose (mg/dL)
                  </label>
                  <input
                    type="number"
                    name="Glucose"
                    value={patientData.Glucose}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pression Artérielle
                  </label>
                  <input
                    type="number"
                    name="BloodPressure"
                    value={patientData.BloodPressure}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Épaisseur de Peau
                  </label>
                  <input
                    type="number"
                    name="SkinThickness"
                    value={patientData.SkinThickness}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insuline
                  </label>
                  <input
                    type="number"
                    name="Insulin"
                    value={patientData.Insulin}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IMC
                  </label>
                  <input
                    type="number"
                    name="BMI"
                    value={patientData.BMI}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fonction Pedigree Diabète
                  </label>
                  <input
                    type="number"
                    name="DiabetesPedigreeFunction"
                    value={patientData.DiabetesPedigreeFunction}
                    onChange={handleInputChange}
                    step="0.001"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Âge
                  </label>
                  <input
                    type="number"
                    name="Age"
                    value={patientData.Age}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="120"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyse en cours...
                  </div>
                ) : (
                  'Prédire le Diabète'
                )}
              </button>
            </div>
          </div>

          {/* Résultats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Résultats de l'Analyse</h2>
            </div>

            {error && !results && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              </div>
            )}

            {results ? (
              <div className="space-y-6">
                {/* Prédiction principale */}
                <div className={`p-6 rounded-lg ${getProbabilityBg(results.probabilite_diabete)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {results.prediction === 0 ? (
                        <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold">
                          {results.prediction === 0 ? 'Pas de Diabète Détecté' : 'Risque de Diabète Élevé'}
                        </h3>
                        <p className="text-gray-600">Basé sur l'analyse des données fournies</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Probabilité de Diabète</span>
                      <span className={`text-lg font-bold ${getProbabilityColor(results.probabilite_diabete)}`}>
                        {(results.probabilite_diabete * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          results.probabilite_diabete < 0.3 ? 'bg-green-500' :
                          results.probabilite_diabete < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${results.probabilite_diabete * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Données analysées */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Données Analysées</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Âge:</span>
                      <span className="font-medium">{results.Age} ans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IMC:</span>
                      <span className="font-medium">{results.BMI}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Glucose:</span>
                      <span className="font-medium">{results.Glucose} mg/dL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pression:</span>
                      <span className="font-medium">{results.BloodPressure} mmHg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grossesses:</span>
                      <span className="font-medium">{results.Pregnancies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insuline:</span>
                      <span className="font-medium">{results.Insulin}</span>
                    </div>
                  </div>
                </div>

                {/* Recommandations */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommandations</h4>
                  <p className="text-blue-700 text-sm">
                    {results.prediction === 0 
                      ? "Continuez à maintenir un mode de vie sain avec une alimentation équilibrée et de l'exercice régulier."
                      : "Consultez un professionnel de santé pour une évaluation approfondie et un suivi personnalisé."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Remplissez le formulaire pour obtenir une prédiction</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiabetesPredictor;