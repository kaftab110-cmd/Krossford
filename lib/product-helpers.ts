// lib/product-helpers.ts - 1 JAGAH FIX, SAARE PRODUCTS KE LIYE
export function fixProduct(row: any) {
  let img = row.image || row.image_url || row.photo || "/images/wallet.jpg";
  if (typeof img !== "string") img = "/images/wallet.jpg";
  if (!img.startsWith("/") && !img.startsWith("http")) img = "/images/" + img;
  if (!img || img === "/images/") img = "/images/wallet.jpg";

  const name = String(row.name || "");
  // Category auto-fix - Naam se hi category banegi, galat category nahi aayegi
  let category = row.category || "Wallets";
  if (name.toLowerCase().includes("wallet")) category = "Wallets";
  else if (name.toLowerCase().includes("bag")) category = "Bags";
  else if (name.toLowerCase().includes("jacket")) category = "Jackets";

  return {
    id: row.id,
    name: name || "Product",
    price: Number(row.price || 0),
    category,
    image: img,
    gallery: Array.isArray(row.gallery) && row.gallery.length > 0 ? row.gallery : [img],
    description: row.description || "",
    slug: row.slug || `admin-${row.id}`,
    badge: row.badge || "NEW",
    stock: row.stock ?? 100,
    is_active: true,
    forHer: !!row.forHer,
    colors: [
      { name: "Jet Black", code: "#111111", image: img },
      { name: "Dark Brown", code: "#3E2723", image: img },
      { name: "Cognac Tan", code: "#B87333", image: img },
    ],
  };
}