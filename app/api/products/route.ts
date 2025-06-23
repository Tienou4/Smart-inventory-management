import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextRequest } from "next/server"

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
    const body = await req.json()

    const product = await db.product.create({
        data: {
            name: body.name,
            sku: body.sku,
            barcode: body.barcode || null,
            category: body.category,
            description: body.description || null,
            price: parseFloat(body.price),
            cost: parseFloat(body.cost),
            stock: parseInt(body.stock),
            minStock: parseInt(body.minStock),
            maxStock: body.maxStock ? parseInt(body.maxStock) : null,
            location: body.location || null,
            supplier: body.supplier || null,
            status: body.active ? "ACTIVE" : "INACTIVE",
            featured: body.featured || false,
        },
    })

    return new Response(JSON.stringify(product), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
    },
    })
} catch (error) {
        console.error("Erreur lors de la création du produit:", error)
        return new Response("Internal Server Error", { status: 500 })
    }
}

// PUT /api/products?id=...
export async function PUT(req: NextRequest) {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        return new Response("Forbidden", { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
        return new Response("Missing product ID", { status: 400 })
    }

try {
    const body = await req.json()

    const updatedProduct = await db.product.update({
        where: {
            id,
        },
        data: {
            name: body.name,
            sku: body.sku,
            barcode: body.barcode || null,
            category: body.category,
            description: body.description || null,
            price: parseFloat(body.price),
            cost: parseFloat(body.cost),
            stock: parseInt(body.stock),
            minStock: parseInt(body.minStock),
            maxStock: body.maxStock ? parseInt(body.maxStock) : null,
            location: body.location || null,
            supplier: body.supplier || null,
            status: body.active ? "ACTIVE" : "INACTIVE",
            featured: body.featured || false,
        },
        })

    return new Response(JSON.stringify(updatedProduct), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
} catch (error) {    console.error("Erreur lors de la mise à jour du produit:", error)
        return new Response("Internal Server Error", { status: 500 })
    }
}

// DELETE 
export async function DELETE(req: NextRequest) {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        return new Response("Forbidden", { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
        return new Response("Missing product ID", { status: 400 })
    }

    try {
        await db.product.delete({
        where: {
            id,
        },
        })

        return new Response(JSON.stringify({ message: "Produit supprimé" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        })
    } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error)
        return new Response("Internal Server Error", { status: 500 })
    }
}