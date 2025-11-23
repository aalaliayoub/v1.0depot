import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// GET: Récupérer la liste des utilisateurs
export async function GET(req: NextRequest) {
  try {


    return NextResponse.json("users");
  } catch (error) {
    return NextResponse.json({ message: "Erreur lors de la lecture des utilisateurs" }, { status: 500 });
  }

 
}







// POST: Ajouter un nouvel utilisateur
export async function POST(req: NextRequest) {
  try {
    const data = await req.json() as {
      email: string;
      password: string;
      role: string;
    };

    const { email, password, role } = data;

    const filePath = path.join(process.cwd(), "app/seed", "users.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(jsonData);

    // Vérifier si email existe
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: "Adresse e-mail ou mot de passe invalide" },
        { status: 404 }
      );
    }

    // Vérifier le mot de passe
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Adresse e-mail ou mot de passe invalide" },
        { status: 401 }
      );
    }

    // Vérifier le rôle si nécessaire
    if (role && user.role !== role) {
      return NextResponse.json(
        { message: "Rôle non autorisé" },
        { status: 403 }
      );
    }

    // Succès
    return NextResponse.json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Erreur interne" },
      { status: 500 }
    );
  }
}