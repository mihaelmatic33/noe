export interface BouquetSize {
  id: 'XS' | 'S' | 'M' | 'L'
  description: string
  price: number | null
}

export interface BouquetColor {
  id: string
  name: string
  hex: string
  bouquetName: string
  image: string
}

export const bouquetSizes: BouquetSize[] = [
  { id: 'XS', description: 'Mali znak pažnje', price: 20 },
  { id: 'S', description: 'Nježan buket za posebne trenutke', price: 25 },
  { id: 'M', description: 'Buket koji privlači poglede', price: 35 },
  { id: 'L', description: 'Veliki buket za nezaboravan poklon', price: 50 },
]

export const bouquetColors: BouquetColor[] = [
  { id: 'peach', name: 'Peach', hex: '#F87262', bouquetName: 'Peach Blossom', image: '/slike/peach.jpg' },
  { id: 'plava', name: 'Plava', hex: '#9EC2DA', bouquetName: 'Blue Dream', image: '/slike/plava.jpg' },
  { id: 'ljubicasta', name: 'Ljubičasta', hex: '#BF82BA', bouquetName: 'Purple Rain', image: '/slike/ljubicasta2.jpg' },
  { id: 'roza', name: 'Roza', hex: '#FBCDD8', bouquetName: 'Pink Touch', image: '/slike/roza3.jpg' },
  { id: 'bordo', name: 'Bordo', hex: '#B16471', bouquetName: 'Velvet Bloom', image: '/slike/crvenic.jpg' },
  { id: 'crvena', name: 'Crvena', hex: '#F53832', bouquetName: 'Sweet Kiss', image: '/slike/crvenic.jpg' },
]