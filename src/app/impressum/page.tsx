export default function Impressum() {
  return (
    <section style={{padding:'5rem 0 6rem'}}>
      <div className="container" style={{maxWidth:700}}>
        <h1 style={{fontSize:'2rem',marginBottom:'0.5rem'}}>Impressum</h1>
        <div style={{color:'var(--muted)',marginBottom:'3rem',fontSize:'0.9rem'}}>Angaben gemäß § 5 TMG</div>

        <div style={{display:'flex',flexDirection:'column',gap:'2.5rem'}}>
          {[
            ['Anbieter', ['Bewerberbrücke e.K.', 'Fronhofstraße 18', '35440 Linden', 'Deutschland']],
            ['Kontakt', ['Telefon: 06403 / 9179483', 'E-Mail: info@bewerberbruecke.com']],
            ['Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)', ['Bewerberbrücke e.K.', 'Fronhofstraße 18', '35440 Linden']],
          ].map(([title, lines])=>(
            <div key={title as string}>
              <h2 style={{fontSize:'1rem',fontFamily:'DM Sans, sans-serif',fontWeight:600,color:'var(--primary)',marginBottom:'0.75rem',paddingBottom:'0.5rem',borderBottom:'1px solid var(--border)'}}>{title}</h2>
              {(lines as string[]).map((l,i)=><p key={i} style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.8}}>{l}</p>)}
            </div>
          ))}

          <div>
            <h2 style={{fontSize:'1rem',fontFamily:'DM Sans, sans-serif',fontWeight:600,color:'var(--primary)',marginBottom:'0.75rem',paddingBottom:'0.5rem',borderBottom:'1px solid var(--border)'}}>Haftungsausschluss</h2>
            <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.8}}>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </div>

          <div>
            <h2 style={{fontSize:'1rem',fontFamily:'DM Sans, sans-serif',fontWeight:600,color:'var(--primary)',marginBottom:'0.75rem',paddingBottom:'0.5rem',borderBottom:'1px solid var(--border)'}}>Datenschutz</h2>
            <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.8}}>
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
