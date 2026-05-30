import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{background:'var(--primary)',color:'var(--accent-light)',marginTop:'6rem'}}>
      <div className="container" style={{padding:'4rem 2rem 2rem',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'3rem'}}>
        <div>
          <div style={{fontFamily:'Playfair Display, serif',fontSize:'1.5rem',fontWeight:700,color:'var(--white)',marginBottom:'0.5rem'}}>Bewerberbrücke</div>
          <div style={{fontSize:'0.7rem',letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'1.25rem'}}>bewerben · begeistern · binden</div>
          <p style={{fontSize:'0.88rem',lineHeight:1.7,color:'rgba(232,217,188,0.75)'}}>
            Digitale Wachstumssysteme für planbare Sichtbarkeit und Mitarbeitergewinnung.
          </p>
        </div>
        <div>
          <div style={{fontSize:'0.75rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'1.25rem',fontWeight:600}}>Navigation</div>
          {[['/',['Home']],['/galerie',['Referenzen']],['/ueber-uns',['Über uns']],['/kontakt',['Kontakt']],['/impressum',['Impressum']]].map(([href,[label]])=>(
            <Link key={String(href)} href={String(href)} style={{display:'block',color:'rgba(232,217,188,0.75)',textDecoration:'none',marginBottom:'0.6rem',fontSize:'0.9rem'}}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <div style={{fontSize:'0.75rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'1.25rem',fontWeight:600}}>Kontakt</div>
          <p style={{fontSize:'0.9rem',color:'rgba(232,217,188,0.75)',marginBottom:'0.6rem'}}>info@bewerberbruecke.com</p>
          <p style={{fontSize:'0.9rem',color:'rgba(232,217,188,0.75)',marginBottom:'0.6rem'}}>06403 / 9179483</p>
          <p style={{fontSize:'0.85rem',color:'rgba(232,217,188,0.5)',marginTop:'1rem'}}>Fronhofstraße 18<br/>35440 Linden</p>
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(232,217,188,0.12)',padding:'1.25rem 2rem',textAlign:'center',fontSize:'0.8rem',color:'rgba(232,217,188,0.4)'}}>
        © {new Date().getFullYear()} Bewerberbrücke e.K. · Alle Rechte vorbehalten
      </div>
    </footer>
  );
}
