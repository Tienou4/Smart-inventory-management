"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();
  const [errorType, setErrorType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Charger les paramètres d'URL uniquement côté client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error") || "Default";

      const errorMessages: Record<string, string> = {
        Configuration: "Erreur de configuration du fournisseur d'authentification.",
        AccessDenied: "Accès refusé. Vérifiez vos identifiants ou contactez l'administrateur.",
        Default: "Une erreur inconnue est survenue.",
        Verification: "Le lien de vérification a expiré ou a déjà été utilisé.",
        OAuthSignin: "Échec de connexion via le fournisseur OAuth.",
      };

      setErrorType(error);
      setErrorMessage(errorMessages[error] || errorMessages["Default"]);
    }
  }, []);

  if (!errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Erreur d’authentification</h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        <button
          onClick={() => router.push("/sign-in")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}