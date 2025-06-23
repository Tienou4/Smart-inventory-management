import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextRequest } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

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
  if (!session?.user || session.user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 })
  }

  const formData = await req.formData()

  const name = formData.get("name")?.toString() || ""
  const sku = formData.get("sku")?.toString() || ""

  // Créer le produit
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

  // Gérer les images
  const imageFiles = formData.getAll("images") as File[]

  for (const file of imageFiles) {
    if (file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Sauvegarder le fichier
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
      const filePath = path.join(process.cwd(), "public", "uploads", filename)

      await writeFile(filePath, buffer)

      // Enregistrer dans la base
      await db.productImage.create({
        data: {
          url: `/uploads/${filename}`,
          productId: product.id,
          isMain: false,
        },
      })
    }
  }

  return new Response(JSON.stringify(product), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
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
    const formData = await req.formData()

    const name = formData.get("name")?.toString() || ""
    const sku = formData.get("sku")?.toString() || ""

    // Optionnel : Supprime les anciennes images
    await db.productImage.deleteMany({
      where: { productId: id }
    })

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

    // Gérer les nouvelles images
    const imageFiles = formData.getAll("images") as File[]
    for (const file of imageFiles) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
        const filePath = path.join(process.cwd(), "public", "uploads", filename)

        await writeFile(filePath, buffer)

        await db.productImage.create({
          data: {
            url: `/uploads/${filename}`,
            productId: updatedProduct.id,
            isMain: false,
          },
        })
      }
    }

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })

  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error)
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