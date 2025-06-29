"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, RefreshCw, ArrowLeft, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/loader";
import SuccessIcon from "./SuccessIcon";
import ErrorIcon from "./ErrorIcon";

export default function VerifyRequestPage() {
  const [status, setStatus] = useState<"waiting" | "success" | "error">("waiting");
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 heures en secondes
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Timer pour l'expiration du lien
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Vérifier les paramètres URL pour déterminer le contexte
    const provider = searchParams.get("provider");
    const type = searchParams.get("type");
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    // Si il y a une erreur dans l'URL
    if (error) {
      console.error("Erreur de vérification:", error);
      setStatus("error");
      return () => clearInterval(timer);
    }

    // Si l'utilisateur vient de cliquer sur un lien de vérification Resend
    if (token) {
      console.log("Token de vérification détecté, redirection vers NextAuth...");
      setStatus("success");
      
      // Laisser NextAuth gérer la vérification automatiquement
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
      
      return () => clearInterval(timer);
    }

    // Cas normal : afficher le message d'attente pour vérification email
    if (provider === "resend" && type === "email") {
      setStatus("waiting");
    } else {
      setStatus("waiting");
    }

    return () => clearInterval(timer);
  }, [searchParams, router]);

  // Formatage du temps restant
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Suspense fallback= {<Loader/>}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="w-full max-w-md space-y-6">
          {status === "waiting" && (
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">Vérifiez votre email</CardTitle>
                  <CardDescription className="text-base">
                    Un lien de connexion sécurisé a été envoyé à votre adresse email
                  </CardDescription>
                </div>
                
                <Badge variant="secondary" className="mx-auto">
                  <Clock className="w-3 h-3 mr-1" />
                  Expire dans {formatTime(timeLeft)}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                  <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-700 dark:text-blue-300">
                    <strong className="block mb-2">Instructions :</strong>
                    <ul className="space-y-1 text-sm">
                      <li>• Cliquez sur le lien dans votre email</li>
                      <li>• Vérifiez votre dossier spam si nécessaire</li>
                      <li>• Le lien vous connectera automatiquement</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="default"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Actualiser la page
                  </Button>
                  
                  <Button
                    onClick={() => router.push("/sign-in")}
                    variant="outline"
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à la connexion
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {status === "success" && (
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-300">
                    Email vérifié !
                  </CardTitle>
                  <CardDescription>
                    Connexion réussie, redirection en cours...
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Loader />
                  <span className="text-sm text-muted-foreground">
                    Redirection vers votre tableau de bord
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {status === "error" && (
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-red-700 dark:text-red-300">
                    Erreur de vérification
                  </CardTitle>
                  <CardDescription>
                    Le lien de vérification est invalide ou a expiré
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    Veuillez demander un nouveau lien de connexion pour continuer.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={() => router.push("/sign-in")}
                  className="w-full"
                  variant="default"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Demander un nouveau lien
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>Connexion sécurisée • Lien à usage unique</p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}