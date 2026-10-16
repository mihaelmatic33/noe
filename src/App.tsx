import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { contactConfig } from './data/contact'
import { products } from './data/products'
import { bouquetColors, bouquetSizes, type BouquetColor, type BouquetSize } from './data/reservation'
import PageLoader from './components/PageLoader'

const LOGO = '/slike/loggo.png'
const navigation = [
  { label: 'Početna', to: '/' },
  { label: 'O nama', to: '/o-nama/' },
  { label: 'Rezerviraj', to: '/rezerviraj/' },
  { label: 'Kontakt', to: '/kontakt/' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function IntroLoader({ onComplete }: { onComplete: () => void }) {
  return <div className="intro" aria-label="NOÉ Candles"><img className="intro__logo" src={LOGO} alt="NOÉ — Handmade with love" onAnimationEnd={onComplete} /></div>
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="announcement-bar"><span>Svaki cvijet, ručno oblikovan s ljubavlju</span><Link to="/rezerviraj/">Osmisli svoj buket <ArrowRight size={13} /></Link></div>
      <div className="nav-shell">
        <Link className="brand-logo" to="/" aria-label="NOÉ Candles, početna stranica" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={LOGO} alt="NOÉ — Handmade with love" />
        </Link>
        <nav className="desktop-nav" aria-label="Glavna navigacija">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}</nav>
        <Link className="nav-cta" to="/rezerviraj/">Rezerviraj <ArrowUpRight size={16} /></Link>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Zatvori izbornik' : 'Otvori izbornik'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobilna navigacija">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}<ArrowRight size={16} /></NavLink>)}</nav>}
      {scrolled && <a className="back-top" href="#top" aria-label="Povratak na vrh" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><ArrowDown size={16} /></a>}
    </header>
  )
}

function Footer() {
  const { instagram, facebook, brandPhone, whatsappPhone, brandEmail } = contactConfig
  return (
    <footer className="site-footer">
      <div className="footer-main wrap">
        <div className="footer-brand"><Link to="/" aria-label="NOÉ Candles, početna stranica"><img src={LOGO} alt="NOÉ Candles" /></Link><p>Za mirisan dom.</p></div>
        <div className="footer-nav"><span className="eyebrow">Istraži</span>{navigation.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div>
        <div className="footer-nav"><span className="eyebrow">Javi nam se</span><Link to="/kontakt/">Kontakt</Link>{brandEmail && <a href={`mailto:${brandEmail}`}><FontAwesomeIcon icon={faEnvelope} /> Pošalji e-mail</a>}{brandPhone && <a href={`tel:${brandPhone}`}><FontAwesomeIcon icon={faPhone} /> Nazovi nas</a>}</div>
        <div className="footer-social"><span className="eyebrow">Prati i javi se</span><div className="social-links">{instagram && <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram NOÉ Candles"><FontAwesomeIcon icon={faInstagram} /></a>}{facebook ? <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook NOÉ Candles"><FontAwesomeIcon icon={faFacebookF} /></a> : <span className="social-link--pending" title="Facebook poveznica uskoro" aria-label="Facebook poveznica uskoro"><FontAwesomeIcon icon={faFacebookF} /></span>}{whatsappPhone && <a href={`https://wa.me/${whatsappPhone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label="Pošalji WhatsApp poruku"><FontAwesomeIcon icon={faWhatsapp} /></a>}{brandPhone && <a href={`tel:${brandPhone}`} aria-label={`Nazovi NOÉ na broj ${brandPhone}`}><FontAwesomeIcon icon={faPhone} /></a>}</div></div>
      </div>
      <div className="footer-bottom wrap"><span>© NOÉ 2026. Sva prava pridržana.</span><span>Handmade with love</span></div>
    </footer>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return <><Header /><div id="top" />{children}<Footer /></>
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setVisible(true); return }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12 })
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={elementRef} className={`${className} reveal-pending${visible ? ' is-visible' : ''}`}>{children}</div>
}

function CandleLoader() {
  return <span className="candle-loader" role="status" aria-label="Učitavanje prikaza buketa"><i className="candle-loader__flame" /><i className="candle-loader__wick" /><i className="candle-loader__body" /></span>
}

function ReservationSummary({ size, color, price, imageLoading, compact = false, onImageLoad }: { size: BouquetSize; color: BouquetColor; price: string; imageLoading: boolean; compact?: boolean; onImageLoad: () => void }) {
  return <aside className={`reservation-summary${compact ? ' reservation-summary--inline' : ''}`}><span className="eyebrow">Tvoj odabir</span><div className={`summary-image${imageLoading ? ' summary-image--loading' : ''}`} style={{ '--summary-color': color.hex } as CSSProperties}><img src={color.image} alt={`Primjer buketa u boji ${color.name}`} onLoad={onImageLoad} onError={onImageLoad} />{imageLoading && <CandleLoader />}</div><div className="summary-info"><span className="summary-label">NOÉ / ručni rad</span><h2>{color.bouquetName}</h2><div className="summary-line"><span>Veličina</span><b>{size.id} <small>· {size.description}</small></b></div><div className="summary-line"><span>Boja</span><b>{color.name}</b></div><div className="summary-line summary-line--price"><span>Cijena</span><b>{price}</b></div><p>Svaki buket izrađujemo ručno. Konačni dogovor slijedi nakon tvog upita.</p></div></aside>
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return <div className={`section-heading section-heading--${align}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function ProductCard({ product, index }: { product: typeof products[number]; index: number }) {
  const reservationPath = product.reservationColorId ? `/rezerviraj/?boja=${product.reservationColorId}` : '/rezerviraj/'
  return (
    <article className={`product-card product-card--${product.accent}`}>
      <Link className="product-card__image" to={reservationPath} aria-label={`Rezerviraj buket ${product.name}`}>
        <img src={product.image} alt={`Ručno izrađeni buket ${product.name.toLowerCase()} od sojinog voska`} loading="lazy" />
        <span className="product-card__index">0{index + 1}</span><span className="product-card__arrow"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="product-card__body"><span>{product.color}</span><h3>{product.name}</h3><p>{product.description}</p><Link to={reservationPath} className="text-link">Rezerviraj buket <ArrowRight size={16} /></Link></div>
    </article>
  )
}

function HomePage() {
  const occasions = [
    ['Vjenčanja', 'Nježan detalj za dan koji ćete pamtiti.'], ['Krštenja', 'Mali znak pažnje za veliku obiteljsku radost.'], ['Rođendani', 'Poklon koji govori više od čestitke.'],
    ['Valentinovo', 'Cvijeće za priče koje su samo vaše.'], ['Godišnjice', 'Obilježite sve što ste zajedno stvorili.'], ['Zahvale', 'Pažljiv način da kažete hvala.'],
  ]
  return (
    <PageShell><main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy"><span className="eyebrow"><span className="eyebrow-mark" /> Ručno rađeni buketi od sojinog voska</span><h1 id="hero-title"><span className="hero__title-line">Cvijeće koje traje.</span><span className="hero__title-line hero__title-line--accent"><em>Poklon koji se pamti.</em></span></h1><p>Svaki buket izrađujemo ručno, s posebnom pažnjom prema detaljima. Otkrij nježne boje, unikatne kombinacije i poklone stvorene za posebne trenutke.</p><div className="hero__actions"><Link className="button button--dark" to="/rezerviraj/">Rezerviraj svoj buket <ArrowRight size={17} /></Link><Link className="text-link" to="/o-nama/">Upoznaj NOÉ <ArrowUpRight size={16} /></Link></div><div className="hero__note"><span>100%</span><span>sojin vosak</span><i /></div></div>
        <div className="hero__visual"><img src="/slike/bez.jpg" alt="Bijeli buket cvjetova od sojinog voska u elegantnoj kutiji" fetchPriority="high" /><span className="hero__image-label">Ručno oblikovano, s ljubavlju</span><a href="#kolekcija" className="hero__scroll" aria-label="Istraži kolekciju"><ArrowDown size={17} /></a></div>
      </section>
      <section className="collection section-pad wrap" id="kolekcija"><div className="collection__top"><SectionHeading eyebrow="Mala kolekcija, velika osjećanja" title="Pronađi svoj NOÉ" copy="Od nježnih pastelnih tonova do razigranih kombinacija — svaki buket ima svoju priču." /><Link className="text-link collection__all" to="/rezerviraj/">Otkrij sve bukete <ArrowRight size={17} /></Link></div><div className="product-grid">{products.slice(0, 6).map((product, index) => <Reveal key={product.id} className="product-reveal"><ProductCard product={product} index={index} /></Reveal>)}</div></section>
      <section className="story-band"><div className="story-band__image"><img src="/slike/plavirozi.jpg" alt="Buket od plavih i ružičastih cvjetova" loading="lazy" /></div><Reveal className="story-band__copy"><span className="eyebrow">Priča iza svakog cvijeta</span><h2>Mali detalji.<br /><em>Velike emocije.</em></h2><p>NOÉ nastaje iz ljubavi prema ručnom radu, cvijeću i poklonima koji nose osobno značenje. Naši buketi od 100% sojinog voska pažljivo su izrađeni kako bi uljepšali trenutke koje želiš zauvijek pamtiti.</p><Link to="/o-nama/" className="text-link">Saznaj više o nama <ArrowRight size={16} /></Link></Reveal></section>
      <section className="occasions section-pad wrap"><SectionHeading eyebrow="Za svaki razlog, i bez razloga" title="Za trenutke koji su važni" copy="Neke uspomene zaslužuju cvijeće koje ostaje dio priče." align="center" /><div className="occasion-grid">{occasions.map(([title, copy], index) => <Reveal key={title} className={`occasion occasion--${index % 4}`}><span className="occasion__number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight className="occasion__arrow" size={19} /></Reveal>)}</div></section>
      <section className="custom-band"><div className="custom-band__inner wrap"><div><span className="eyebrow">Posebno za tebe</span><h2>Tvoja ideja.<br /><em>Naš ručni rad.</em></h2></div><div className="custom-band__aside"><p>Imaš posebnu ideju, omiljenu boju ili želiš buket za određenu prigodu? Zajedno možemo osmisliti kombinaciju koja odgovara tvojoj želji.</p><Link className="button button--dark" to="/rezerviraj/">Dogovori personalizirani buket <ArrowRight size={17} /></Link></div></div></section>
      <section className="closing-cta wrap"><img src="/slike/roza2.jpg" alt="Ružičasti buket NOÉ izrađen od sojinog voska" loading="lazy" /><div className="closing-cta__copy"><span className="eyebrow">Poklon s osobnim potpisom</span><h2>Pokloni nešto<br /><em>drugačije.</em></h2><p>Odaberi boju, pronađi svoju veličinu i rezerviraj buket izrađen s ljubavlju.</p><Link to="/rezerviraj/" className="button button--dark">Rezerviraj svoj buket <ArrowRight size={17} /></Link></div></section>
    </main></PageShell>
  )
}

function AboutPage() {
  const story = [
    ['Ručno izrađeno, s posebnom pažnjom', 'Svaki buket izrađujemo ručno, korak po korak, posvećujući pažnju obliku, bojama i svakom detalju. Vjerujemo da upravo sitnice čine razliku i da poklon može biti puno više od samog predmeta.', '/slike/roza.jpg', 'Ružičasti buket izbliza, s ručno oblikovanim cvjetovima'],
    ['100% sojin vosak', 'Za naše cvjetne bukete koristimo 100% sojin vosak. Odabiremo ga zbog njegove prikladnosti za izradu dekorativnih proizvoda i mogućnosti oblikovanja prekrasnih cvjetnih detalja.', '/slike/peach.jpg', 'Buket cvjetova boje breskve od sojinog voska'],
    ['Za posebne trenutke', 'Naši buketi zamišljeni su kao poseban poklon za vjenčanja, krštenja, rođendane, Valentinovo, godišnjice i sve one trenutke kada želiš nekome pokazati koliko ti znači.', '/slike/velicine.jpg', 'Različite veličine buketa NOÉ složene jedna uz drugu'],
  ]
  return <PageShell><main className="about-page"><section className="page-intro wrap"><span className="eyebrow">Naša priča</span><h1>Iza svakog NOÉ buketa stoji <em>ljubav prema detaljima.</em></h1><p>NOÉ Candles nastao je iz ljubavi prema kreativnosti, ručnom radu i malim stvarima koje posebnim trenucima daju još veću vrijednost.</p></section><div className="about-stories">{story.map(([title, copy, image, alt], index) => <section key={title} className={`about-story ${index % 2 ? 'about-story--reverse' : ''}`}><div className="about-story__image"><img src={image} alt={alt} loading="lazy" /></div><Reveal className="about-story__copy"><span className="eyebrow">0{index + 1} / NOÉ Candles</span><h2>{title}</h2><p>{copy}</p>{index === 2 && <p>Iza NOÉ-a stoji mladi tim koji kreativnost pretvara u ručno izrađene bukete s osobnim karakterom. Volimo osmišljavati nove kombinacije boja, prilagođavati bukete različitim prigodama i zajedno s tobom pronaći detalje koji će poklon učiniti posebnim.</p>}{index === 2 && <Link className="text-link" to="/rezerviraj/">Osmisli svoj buket <ArrowRight size={16} /></Link>}</Reveal></section>)}</div><section className="about-end wrap"><p>Svaki buket počinje tvojom pričom.</p><Link className="button button--dark" to="/rezerviraj/">Ispričaj nam svoju <ArrowRight size={17} /></Link></section></main></PageShell>
}

function makeRequestMessage(values: { name: string; email: string; phone: string; occasion: string; date: string; note: string }, size: string, color: string, bouquet: string, price: string) {
  return ['Bok NOÉ! Željela bih poslati upit za buket.', `Ime: ${values.name}`, `E-mail: ${values.email}`, values.phone && `Telefon: ${values.phone}`, `Veličina: ${size}`, `Buket: ${bouquet}`, `Boja: ${color}`, `Cijena: ${price}`, values.occasion && `Prigoda: ${values.occasion}`, values.date && `Željeni datum: ${values.date}`, values.note && `Posebne želje: ${values.note}`, '', 'Razumijem da je rezervacija potvrđena tek nakon dogovora s NOÉ timom.'].filter(Boolean).join('\n')
}

function ReservationPage() {
  const [searchParams] = useSearchParams()
  const initialColor = bouquetColors.find((color) => color.id === searchParams.get('boja'))?.id ?? 'peach'
  const [sizeId, setSizeId] = useState<(typeof bouquetSizes)[number]['id']>('S')
  const [colorId, setColorId] = useState(initialColor)
  const [draft, setDraft] = useState('')
  const [imageLoading, setImageLoading] = useState(true)
  const [copyStatus, setCopyStatus] = useState('')
  const chosenSize = bouquetSizes.find((size) => size.id === sizeId)!
  const chosenColor = bouquetColors.find((color) => color.id === colorId)!
  const price = chosenSize.price === null ? 'Cijena na upit' : `${chosenSize.price.toFixed(2).replace('.', ',')} €`
  useEffect(() => setImageLoading(true), [chosenColor.image])

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const values = { name: String(form.get('name') ?? ''), email: String(form.get('email') ?? ''), phone: String(form.get('phone') ?? ''), occasion: String(form.get('occasion') ?? ''), date: String(form.get('date') ?? ''), note: String(form.get('note') ?? '') }
    const message = makeRequestMessage(values, `${chosenSize.id} — ${chosenSize.description}`, chosenColor.name, chosenColor.bouquetName, price)
    const phone = (contactConfig.whatsappPhone || contactConfig.brandPhone).replace(/\D/g, '')
    if (phone) window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    else if (contactConfig.brandEmail) window.location.href = `mailto:${contactConfig.brandEmail}?subject=${encodeURIComponent('Upit za rezervaciju NOÉ buketa')}&body=${encodeURIComponent(message)}`
    else setDraft(message)
  }

  return <PageShell><main className="reservation-page"><section className="page-intro page-intro--reservation wrap"><span className="eyebrow">Tvoj buket, tvoj odabir</span><h1>Odaberi svoj <em>buket.</em></h1><p>Odaberi veličinu, pronađi boju koja ti se sviđa i pošalji nam svoj upit. Svaki buket izrađujemo ručno, prema dogovoru.</p></section><div className="reservation-layout wrap"><form className="configurator" onSubmit={submitRequest}>
    <fieldset className="config-step"><legend><span>01</span><b>Odaberi veličinu</b></legend><div className="size-options">{bouquetSizes.map((size) => <button type="button" key={size.id} className={`size-option${size.id === sizeId ? ' is-selected' : ''}`} aria-pressed={size.id === sizeId} onClick={() => setSizeId(size.id)}><span className="size-option__name">{size.id}</span><span className="size-option__description">{size.description}</span><span className="size-option__price">{size.price === null ? 'Cijena na upit' : `${size.price.toFixed(2).replace('.', ',')} €`}</span>{size.id === sizeId && <Check className="size-option__check" size={16} />}</button>)}</div><img className="size-reference" src="/slike/velicine.jpg" alt="Primjer različitih veličina buketa NOÉ" loading="lazy" /></fieldset>
    <ReservationSummary size={chosenSize} color={chosenColor} price={price} imageLoading={imageLoading} compact onImageLoad={() => setImageLoading(false)} />
    <fieldset className="config-step"><legend><span>02</span><b>Odaberi boju</b></legend><div className="color-options">{bouquetColors.map((color) => <button type="button" key={color.id} className={`color-option${color.id === colorId ? ' is-selected' : ''}`} aria-pressed={color.id === colorId} onClick={() => setColorId(color.id)}><span className="color-option__swatch" style={{ '--swatch': color.hex } as CSSProperties}>{color.id === colorId && <Check size={15} />}</span><span>{color.name}</span></button>)}</div></fieldset>
    <fieldset className="config-step config-step--details"><legend><span>03</span><b>Detalji upita</b></legend><div className="form-grid"><label>Ime i prezime <span>*</span><input name="name" autoComplete="name" required placeholder="Tvoje ime" /></label><label>E-mail adresa <span>*</span><input type="email" name="email" autoComplete="email" required placeholder="ime@primjer.hr" /></label><label>Telefon <small>(neobavezno)</small><input type="tel" name="phone" autoComplete="tel" placeholder="Broj telefona" /></label><label>Prigoda <small>(neobavezno)</small><input name="occasion" placeholder="Npr. rođendan, vjenčanje..." /></label><label>Željeni datum <small>(neobavezno)</small><input type="date" name="date" /></label><label className="form-grid__full">Imaš posebnu želju? <small>(neobavezno)</small><textarea name="note" rows={4} placeholder="Opiši željenu kombinaciju boja, prigodu ili detalje buketa..." /></label></div></fieldset>
    <button className="button button--dark reservation-submit" type="submit">Pošalji upit za rezervaciju <ArrowRight size={17} /></button><p className="form-footnote">Upit nije potvrđena rezervacija. Dogovor i potvrdu primit ćeš od NOÉ tima.</p>
    {draft && <div className="request-draft" role="status"><h3>Upit je spreman</h3><p>Kontaktni podaci još nisu postavljeni. Kopiraj pripremljenu poruku i pošalji je NOÉ timu kada podaci budu dostupni.</p><textarea readOnly value={draft} aria-label="Pripremljeni tekst upita" /><button className="text-link" type="button" onClick={async () => { try { await navigator.clipboard.writeText(draft); setCopyStatus('Poruka je kopirana.') } catch { const field = document.querySelector<HTMLTextAreaElement>('.request-draft textarea'); field?.select(); setCopyStatus('Tekst je označen. Kopiraj ga tipkovničkim prečacem.') } }}>{copyStatus || 'Kopiraj poruku'} <ArrowRight size={16} /></button></div>}
    </form><ReservationSummary size={chosenSize} color={chosenColor} price={price} imageLoading={imageLoading} onImageLoad={() => setImageLoading(false)} /></div></main></PageShell>
}

function ContactPage() {
  return <PageShell><main className="contact-page"><section className="page-intro wrap"><span className="eyebrow">Pišemo rado natrag</span><h1>Javi nam <em>se.</em></h1><p>Imaš pitanje, posebnu ideju ili želiš rezervirati svoj buket? Veselimo se tvojoj poruci.</p></section><section className="contact-people wrap">{contactConfig.people.map((person, index) => <article className={`contact-card contact-card--${index}`} key={person.name}><div className="contact-card__top"><span className="eyebrow">NOÉ / {String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={18} /></div><h2>{person.name}</h2><p>Tu smo za tvoja pitanja i ideje.</p><div className="contact-actions">{person.email ? <a href={`mailto:${person.email}`}><FontAwesomeIcon icon={faEnvelope} /> {person.email}</a> : <span><FontAwesomeIcon icon={faEnvelope} /> E-mail uskoro</span>}{person.phone ? <a href={`tel:${person.phone}`}><FontAwesomeIcon icon={faPhone} /> {person.phone}</a> : <span><FontAwesomeIcon icon={faPhone} /> Telefon uskoro</span>}{person.phone && <a href={`https://wa.me/${person.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Bok! Željela bih se raspitati o NOÉ buketima.')}`} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} /> Pošalji WhatsApp poruku</a>}</div></article>)}</section><section className="contact-social wrap"><div><span className="eyebrow">Budimo u kontaktu</span><h2>NOÉ svakodnevno,<br /><em>na Instagramu.</em></h2><p>Zavirimo zajedno iza kulisa ručnog rada i novih buketa.</p></div><div className="contact-social__links">{contactConfig.instagram && <a href={contactConfig.instagram} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /> @noecandles_ <ArrowUpRight size={17} /></a>}{contactConfig.facebook && <a href={contactConfig.facebook} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebookF} /> Facebook <ArrowUpRight size={17} /></a>}{contactConfig.brandEmail && <a href={`mailto:${contactConfig.brandEmail}`}><FontAwesomeIcon icon={faEnvelope} /> {contactConfig.brandEmail} <ArrowUpRight size={17} /></a>}</div></section></main></PageShell>
}

function AppRoutes() {
  return <><ScrollToTop /><Routes><Route path="/" element={<HomePage />} /><Route path="/o-nama/" element={<AboutPage />} /><Route path="/rezerviraj/" element={<ReservationPage />} /><Route path="/kontakt/" element={<ContactPage />} /><Route path="*" element={<HomePage />} /></Routes></>
}

export default function App() {
  const [introVisible, setIntroVisible] = useState(() => !sessionStorage.getItem('noe-intro-seen'))
  const [landingIntro, setLandingIntro] = useState(() => !sessionStorage.getItem('noe-intro-seen'))
  const [routeLoading, setRouteLoading] = useState(false)
  const location = useLocation()
  const previousPath = useRef(location.pathname)
  const routeTimer = useRef<number | undefined>(undefined)
  useLayoutEffect(() => {
    if (previousPath.current === location.pathname) return
    previousPath.current = location.pathname
    setRouteLoading(true)
    window.clearTimeout(routeTimer.current)
    routeTimer.current = window.setTimeout(() => setRouteLoading(false), 500)
    return () => window.clearTimeout(routeTimer.current)
  }, [location.pathname])
  useEffect(() => {
    const metadata: Record<string, { title: string; description: string }> = {
      '/': { title: 'NOÉ Candles | Ručno rađeni buketi od sojinog voska', description: 'Otkrij ručno izrađene cvjetne bukete od 100% sojinog voska. Odaberi svoju boju, veličinu i personalizirani poklon za posebne trenutke.' },
      '/o-nama/': { title: 'O nama | NOÉ Candles', description: 'Upoznaj NOÉ Candles, mali tim koji s ljubavlju izrađuje cvjetne bukete od 100% sojinog voska.' },
      '/rezerviraj/': { title: 'Rezerviraj buket | NOÉ Candles', description: 'Odaberi veličinu i boju svog ručno izrađenog NOÉ buketa te pošalji nam upit za rezervaciju.' },
      '/kontakt/': { title: 'Kontakt | NOÉ Candles', description: 'Javi se NOÉ timu s pitanjem, posebnom idejom ili upitom za personalizirani buket.' },
    }
    const page = metadata[location.pathname] ?? metadata['/']
    document.title = page.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description)
  }, [location.pathname])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && introVisible) {
      sessionStorage.setItem('noe-intro-seen', '1')
      setIntroVisible(false)
      setLandingIntro(false)
    }
  }, [introVisible])
  function finishIntro() { sessionStorage.setItem('noe-intro-seen', '1'); setIntroVisible(false) }
  useEffect(() => { if (introVisible) { const timer = window.setTimeout(finishIntro, 2100); return () => window.clearTimeout(timer) } }, [introVisible])
  useEffect(() => { if (landingIntro) { const timer = window.setTimeout(() => setLandingIntro(false), 4700); return () => window.clearTimeout(timer) } }, [landingIntro])
  return <>{introVisible && <IntroLoader onComplete={finishIntro} />}<div className={`app-content${landingIntro ? ' app-content--landing-intro' : ''}`}><AppRoutes /></div>{routeLoading && <PageLoader />}</>
}

export function RoutedApp() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></BrowserRouter>
}