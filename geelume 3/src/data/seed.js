// Data awal. Semua produk FIKTIF (bukan brand asli).
export const seedRoutine = () => ({
  morning: [
    { id: 'm1', name: 'Gentle Foam Cleanser', brand: 'Petalé', min: 1 },
    { id: 'm2', name: 'Dew Hydrating Toner', brand: 'Dewlyn', min: 1 },
    { id: 'm3', name: 'Vitamin C Brightening Serum', brand: 'Lumi Botanics', min: 2 },
    { id: 'm4', name: 'Soft Eye Cream', brand: 'Mellow Skin', min: 1 },
    { id: 'm5', name: 'Daily Moisturizer', brand: 'Mellow Skin', min: 2 },
    { id: 'm6', name: 'Sheer Sunscreen SPF 50', brand: 'Soleil Lab', min: 2 },
  ],
  evening: [
    { id: 'e1', name: 'Melting Cleansing Balm', brand: 'Petalé', min: 2 },
    { id: 'e2', name: 'Gentle Foam Cleanser', brand: 'Petalé', min: 1 },
    { id: 'e3', name: 'Calming Essence', brand: 'Dewlyn', min: 1 },
    { id: 'e4', name: 'Niacinamide Clarity Serum', brand: 'Lumi Botanics', min: 2 },
    { id: 'e5', name: 'Barrier Night Cream', brand: 'Mellow Skin', min: 2 },
    { id: 'e6', name: 'Overnight Lip Mask', brand: 'Soleil Lab', min: 1 },
  ],
})

export const seedProducts = () => [
  { id: 'p1', name: 'Gentle Foam Cleanser', brand: 'Petalé', category: 'Cleanser', rating: 5 },
  { id: 'p2', name: 'Dew Hydrating Toner', brand: 'Dewlyn', category: 'Toner', rating: 4.5 },
  { id: 'p3', name: 'Vitamin C Brightening Serum', brand: 'Lumi Botanics', category: 'Serum', rating: 5 },
  { id: 'p4', name: 'Niacinamide Clarity Serum', brand: 'Lumi Botanics', category: 'Serum', rating: 4.5 },
  { id: 'p5', name: 'Daily Moisturizer', brand: 'Mellow Skin', category: 'Moisturizer', rating: 4 },
  { id: 'p6', name: 'Barrier Night Cream', brand: 'Mellow Skin', category: 'Moisturizer', rating: 5 },
  { id: 'p7', name: 'Sheer Sunscreen SPF 50', brand: 'Soleil Lab', category: 'Sunscreen', rating: 4 },
  { id: 'p8', name: 'Overnight Lip Mask', brand: 'Soleil Lab', category: 'Hydrator', rating: 4 },
]

export const CATEGORIES = ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Hydrator']
export const MOODS = ['Rough', 'Dull', 'Okay', 'Good', 'Glowing']

export const seed = () => ({
  accounts: [],
  session: null,
  routine: seedRoutine(),
  done: {},
  products: seedProducts(),
  logs: {},
  concerns: ['Acne', 'Dryness', 'Oiliness'],
  photos: {},
})
