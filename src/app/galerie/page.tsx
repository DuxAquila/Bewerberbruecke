import Link from "next/link";

const cases = [
  { client: "Pflegeeinrichtung Rhein-Main", sector: "Altenpflege", result: "+14 Bewerbungen in 6 Wochen", detail: "Vorher: Keine digitale Präsenz, kaum Bewerbungen. Nachher: Klarere Positionierung, Social-Media-Aufbau und gezielte Kampagnenstrategie brachten planbare Bewerbereingänge.", tag: "Social Recruiting" },
  { client: "Sozialstation Mittelhessen", sector: "Ambulante Pflege", result: "Sichtbarkeit in der Region aufgebaut", detail: "Lokale Arbeitgebermarke gestärkt, professionelle Außenwirkung etabliert und Recruiting-Prozess strukturiert. Ergebnis: Bessere Qualität der Bewerbungen.", tag: "Employer Branding" },
  { client: "Betreuungseinrichtung Nord", sector: "Behindertenhilfe", result: "Mitarbeitergewinnung planbarer gemacht", detail: "Durch klares Messaging und konsistente Content-Strategie konnten offene Stellen schneller besetzt werden. Aufbau eines eigenständigen Recruiting-Systems.", tag: "Wachstumssystem" },
];

export default function Galerie() {
  return (
    <>
      <style>{`
        .case-card { background: var(--white); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; transition: box-shadow 0.2s; }
        .case-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.09); }
        .btn-dark { background: var(--primary); color: var(--white); padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.92rem; display: inline-block; transition: opacity 0.2s; }
        .btn-dark:hover { opacity: 0.85; }
      `}</style>

      <section style={{background:'var(--primary)',padding:'5rem 0 4rem',color:'var(--white)'}}>
        <div className="container">
          <div style={{fontSize:'0.75rem',letterSpacing:'0.14em',color:'var(--accent)',textTransform:'uppercase',fontWeight:600,marginBottom:'1rem'}}>Referenzen</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',color:'var(--white)',maxWidth:600}}>Fallstudien & Ergebnisse</h1>
          <p style={{color:'rgba(255,255,255,0.6)',marginTop:'1rem',maxWidth:500,lineHeight:1.75}}>Einblicke in abgeschlossene Projekte und die Ergebnisse, die daraus entstanden sind.</p>
        </div>
      </section>

      <section style={{padding:'4rem 0 6rem'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'2rem'}}>
            {cases.map((c,i)=>(
              <div key={i} className="case-card">
                <div style={{background:'var(--primary)',padding:'2rem',position:'relative'}}>
                  <div style={{position:'absolute',top:'1rem',right:'1rem',background:'rgba(200,169,110,0.2)',color:'var(--accent)',fontSize:'0.7rem',letterSpacing:'0.1em',padding:'0.25rem 0.7rem',borderRadius:'2px',fontWeight:600}}>{c.tag}</div>
                  <div style={{fontSize:'0.8rem',color:'rgba(232,217,188,0.6)',marginBottom:'0.5rem'}}>{c.sector}</div>
                  <div style={{fontFamily:'Playfair Display, serif',fontSize:'1.2rem',color:'var(--white)',fontWeight:600}}>{c.client}</div>
                </div>
                <div style={{padding:'1.75rem'}}>
                  <div style={{fontSize:'1rem',fontWeight:600,color:'var(--accent)',marginBottom:'1rem',fontFamily:'Playfair Display, serif'}}>{c.result}</div>
                  <p style={{color:'var(--muted)',fontSize:'0.9rem',lineHeight:1.75}}>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{textAlign:'center',marginTop:'4rem',padding:'3rem',background:'var(--section-bg)',borderRadius:'6px',border:'1px solid var(--border)'}}>
            <h2 style={{fontSize:'1.6rem',marginBottom:'1rem'}}>Ähnliche Ergebnisse für Ihr Unternehmen?</h2>
            <p style={{color:'var(--muted)',marginBottom:'2rem'}}>Lassen Sie uns in einem kurzen Erstgespräch prüfen, welche Hebel bei Ihnen wirklich wirken.</p>
            <Link href="/kontakt" className="btn-dark">Wachstumsanalyse anfragen</Link>
          </div>
        </div>
      </section>
    </>
  );
}
