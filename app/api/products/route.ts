import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextRequest } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { existsSync } from "fs"

// Récupérer tous les produits
export async function GET(req: NextRequest) {
    const session = await auth()

    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 })
    }

    try {
        const products = await db.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                images: true,
            },
        })

        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error)
        return new Response("Internal Server Error", { status: 500 })
    }
}

// Créer un nouveau produit
export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session?.user || session.user.role !== "USER") {
        return new Response("Forbidden", { status: 403 })
    }

    try {
        const formData = await req.formData()

        const name = formData.get("name")?.toString() || ""
        const sku = formData.get("sku")?.toString() || ""

        // Créer le produit d'abord
        const product = await db.product.create({
            data: {
                name,
                sku,
                barcode: formData.get("barcode")?.toString() || null,
                category: formData.get("category")?.toString() || "",
                description: formData.get("description")?.toString() || "",
                price: parseFloat(formData.get("price")?.toString() || "0"),
                cost: parseFloat(formData.get("cost")?.toString() || "0"),
                stock: parseInt(formData.get("stock")?.toString() || "0"),
                minStock: parseInt(formData.get("minStock")?.toString() || "0"),
                maxStock: formData.get("maxStock")?.toString()
                    ? parseInt(formData.get("maxStock")?.toString() || "0")
                    : null,
                location: formData.get("location")?.toString() || null,
                supplier: formData.get("supplier")?.toString() || null,
                status: formData.get("active") === "true" ? "ACTIVE" : "INACTIVE",
                featured: false,
            },
        })

        // Vérifier et créer le dossier uploads s'il n'existe pas
        const uploadsDir = path.join(process.cwd(), "public", "uploads")
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true })
        }

        // Gérer les images
        const imageFiles = formData.getAll("images") as File[]
        console.log(`📸 Nombre d'images reçues: ${imageFiles.length}`)

        let isFirstImage = true
        for (const file of imageFiles) {
            if (file && file.size > 0) {
                try {
                    console.log(`📸 Traitement de l'image: ${file.name}, taille: ${file.size}`)
                    
                    const bytes = await file.arrayBuffer()
                    const buffer = Buffer.from(bytes)

                    // Générer un nom de fichier unique
                    const fileExtension = path.extname(file.name)
                    const filename = `product-${product.id}-${Date.now()}${fileExtension}`
                    const filePath = path.join(uploadsDir, filename)

                    console.log(`📸 Sauvegarde vers: ${filePath}`)
                    await writeFile(filePath, buffer)

                    // Enregistrer dans la base de données
                    const imageRecord = await db.productImage.create({
                        data: {
                            url: `/uploads/${filename}`,
                            productId: product.id,
                            isMain: isFirstImage, // La première image devient l'image principale
                        },
                    })

                    console.log(`✅ Image sauvegardée: ${imageRecord.url}`)
                    isFirstImage = false
                } catch (imageError) {
                    console.error(`❌ Erreur lors du traitement de l'image ${file.name}:`, imageError)
                }
            }
        }

        // Récupérer le produit avec ses images pour la réponse
        const productWithImages = await db.product.findUnique({
            where: { id: product.id },
            include: { images: true }
        })

        return new Response(JSON.stringify(productWithImages), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        })

    } catch (error) {
        console.error("❌ Erreur lors de la création du produit:", error)
        return new Response(JSON.stringify({ 
            error: "Erreur lors de la création du produit",
            details: error instanceof Error ? error.message : "Erreur inconnue"
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}

// PUT /api/products?id=...
export async function PUT(req: NextRequest) {
    const session = await auth()
    if (!session?.user || session.user.role !== "USER") {
        return new Response("Forbidden", { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
        return new Response("Missing product ID", { status: 400 })
    }

    try {
        const formData = await req.formData()

        const name = formData.get("name")?.toString() || ""
        const sku = formData.get("sku")?.toString() || ""

        // Mettre à jour le produit
        const updatedProduct = await db.product.update({
            where: { id },
            data: {
                name,
                sku,
                barcode: formData.get("barcode")?.toString() || null,
                category: formData.get("category")?.toString() || "",
                description: formData.get("description")?.toString() || "",
                price: parseFloat(formData.get("price")?.toString() || "0"),
                cost: parseFloat(formData.get("cost")?.toString() || "0"),
                stock: parseInt(formData.get("stock")?.toString() || "0"),
                minStock: parseInt(formData.get("minStock")?.toString() || "0"),
                maxStock: formData.get("maxStock")?.toString()
                    ? parseInt(formData.get("maxStock")?.toString() || "0")
                    : null,
                location: formData.get("location")?.toString() || null,
                supplier: formData.get("supplier")?.toString() || null,
                status: formData.get("active") === "true" ? "ACTIVE" : "INACTIVE",
                featured: formData.get("featured") === "true",
            },
        })

        // Gérer les nouvelles images (seulement si il y en a)
        const imageFiles = formData.getAll("images") as File[]
        
        if (imageFiles.length > 0 && imageFiles[0].size > 0) {
            console.log(`📸 Ajout de ${imageFiles.length} nouvelles images`)
            
            // Vérifier et créer le dossier uploads s'il n'existe pas
            const uploadsDir = path.join(process.cwd(), "public", "uploads")
            if (!existsSync(uploadsDir)) {
                await mkdir(uploadsDir, { recursive: true })
            }

            // Ajouter les nouvelles images (sans supprimer les anciennes)
            for (const file of imageFiles) {
                if (file && file.size > 0) {
                    try {
                        const bytes = await file.arrayBuffer()
                        const buffer = Buffer.from(bytes)

                        const fileExtension = path.extname(file.name)
                        const filename = `product-${updatedProduct.id}-${Date.now()}${fileExtension}`
                        const filePath = path.join(uploadsDir, filename)

                        await writeFile(filePath, buffer)

                        await db.productImage.create({
                            data: {
                                url: `/uploads/${filename}`,
                                productId: updatedProduct.id,
                                isMain: false,
                            },
                        })

                        console.log(`✅ Nouvelle image ajoutée: /uploads/${filename}`)
                    } catch (imageError) {
                        console.error(`❌ Erreur lors du traitement de l'image ${file.name}:`, imageError)
                    }
                }
            }
        }

        // Récupérer le produit avec ses images pour la réponse
        const productWithImages = await db.product.findUnique({
            where: { id: updatedProduct.id },
            include: { images: true }
        })

        return new Response(JSON.stringify(productWithImages), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })

    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour du produit:", error)
        return new Response(JSON.stringify({ 
            error: "Erreur lors de la mise à jour du produit",
            details: error instanceof Error ? error.message : "Erreur inconnue"
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}

// DELETE 
export async function DELETE(req: NextRequest) {
    const session = await auth()

    if (!session?.user || session.user.role !== "USER") {
        return new Response("Forbidden", { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
        return new Response("Missing product ID", { status: 400 })
    }

    try {
        // Supprimer d'abord les images associées
        await db.productImage.deleteMany({
            where: { productId: id }
        })

        // Puis supprimer le produit
        await db.product.delete({
            where: { id },
        })

        return new Response(JSON.stringify({ message: "Produit supprimé" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error("❌ Erreur lors de la suppression du produit:", error)
        return new Response("Internal Server Error", { status: 500 })
    }
}