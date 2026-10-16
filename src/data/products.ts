export interface Product {
  id: string
  name: string
  description: string
  image: string
  color: string
  accent: 'peach' | 'blue' | 'purple' | 'pink'
  reservationColorId: string | null
}

export const products: Product[] = [
  { id: 'bijela', name: 'Bijela nježnost', description: 'Nježni, svijetli tonovi za svaki poseban trenutak.', image: '/slike/bez.jpg', color: 'Bijela', accent: 'peach', reservationColorId: null },
  { id: 'peach', name: 'Peach Blossom', description: 'Topla nijansa breskve i ručno oblikovani cvjetovi.', image: '/slike/peach.jpg', color: 'Peach', accent: 'peach', reservationColorId: 'peach' },
  { id: 'lavanda', name: 'Purple Rain', description: 'Romantičan spoj ljubičastih i bijelih cvjetova.', image: '/slike/ljubicasta.jpg', color: 'Ljubičasta', accent: 'purple', reservationColorId: 'ljubicasta' },
  { id: 'plavi-san', name: 'Blue Dream', description: 'Mirni plavi tonovi u nježnoj cvjetnoj kompoziciji.', image: '/slike/plava.jpg', color: 'Plava', accent: 'blue', reservationColorId: 'plava' },
  { id: 'ruzicasti-dodir', name: 'Pink Touch', description: 'Mekani ružičasti tonovi, pažljivo složeni ručno.', image: '/slike/roza.jpg', color: 'Roza', accent: 'pink', reservationColorId: 'roza' },
  { id: 'pastel-harmony', name: 'Pastel Harmony', description: 'Sklad plavih i ružičastih cvjetnih detalja.', image: '/slike/plavirozi.jpg', color: 'Plava i roza', accent: 'blue', reservationColorId: 'plava' },
  { id: 'pink-romance', name: 'Pink Romance', description: 'Razigran buket za trenutke vrijedne pamćenja.', image: '/slike/roza2.jpg', color: 'Roza', accent: 'pink', reservationColorId: 'roza' },
]