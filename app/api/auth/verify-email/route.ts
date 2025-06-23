
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: "Token manquant" }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.AUTH_ORIGIN}/api/auth/callback/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
        return new Response(
            JSON.stringify({ success: true, message: "Email vérifié" }),
            { status: 200 }
    );
    } else {
        return new Response(
            JSON.stringify({ success: false, message: "Token invalide ou expiré" }),
            { status: 400 }
        );
    }
} catch (error) {
    console.error(error);
    return new Response(
        JSON.stringify({ success: false, message: "Erreur serveur" }),
        { status: 500 }
    );
}
}