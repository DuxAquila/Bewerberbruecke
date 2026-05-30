import Link from "next/link";

const phases = [
  { num: "01", title: "Klarer Auftritt", text: "Menschen müssen schnell verstehen, wofür ein Unternehmen steht, warum es relevant ist und warum man sich dieses Unternehmen merken sollte. Genau das entscheidet darüber, ob Sichtbarkeit überhaupt Wirkung entfalten kann." },
  { num: "02", title: "Relevante Sichtbarkeit", text: "Social Media, Website, Bildsprache und Inhalte sollen nicht einfach nur da sein – sie sollen dafür sorgen, dass ein Unternehmen klarer wahrgenommen wird, professioneller wirkt und im Kopf bleibt." },
  { num: "03", title: "Planbarere Ergebnisse", text: "Am Ende geht es nicht um schöne Maßnahmen, sondern darum, dass daraus planbarere Anfragen, Bewerbungen und echte nächste Schritte entstehen. Genau daran scheitert es oft, wenn Struktur fehlt." },
  { num: "04", title: "Systemaufbau", text: "Auf dieser Basis entsteht eine klare Struktur, in der die richtigen Bausteine an der richtigen Stelle zusammenspielen. Von Sichtbarkeit und Website bis hin zu Anfragen, Bewerbungen und sauberer Weiterführung." },
];

const steps = [
  { title: "Erstgespräch", text: "Im ersten Schritt schauen wir uns gemeinsam an, wo Sie aktuell stehen, was schon da ist und wo es gerade hakt. So wird schnell klar, ob und wie wir sinnvoll unterstützen können." },
  { title: "Wachstumsanalyse", text: "Danach gehen wir tiefer rein. Wir analysieren Sichtbarkeit, Außenwirkung und Mitarbeitergewinnung, machen Engpässe sichtbar und leiten die sinnvollsten Hebel für die nächsten Schritte ab." },
  { title: "Systemaufbau", text: "Auf dieser Basis entsteht eine klare Struktur, in der die richtigen Bausteine an der richtigen Stelle zusammenspielen – skalierbar und auf Ihr Unternehmen zugeschnitten." },
];

const faqs = [
  { q: "Was genau macht die Bewerberbrücke?", a: "Wir entwickeln digitale Wachstumssysteme für Unternehmen, die Sichtbarkeit, Außenwirkung und Mitarbeitergewinnung planbarer machen. Dabei geht es nicht um einzelne Maßnahmen, sondern um eine klare Struktur, in der die richtigen Bausteine sinnvoll zusammenspielen." },
  { q: "Für welche Unternehmen ist die Zusammenarbeit sinnvoll?", a: "Wir arbeiten vor allem mit wachstumsorientierten Unternehmen, die nach außen klarer auftreten, relevanter sichtbar werden und die Mitarbeitergewinnung nicht länger dem Zufall überlassen wollen. Entscheidend ist weniger die Branche als die Bereitschaft, Wachstum strukturierter anzugehen." },
  { q: "Startet die Zusammenarbeit direkt mit einer Analyse?", a: "Nein. Im ersten Schritt gibt es ein kurzes Erstgespräch, in dem wir die Situation grob einordnen. Danach wird entschieden, inwiefern eine Wachstumsanalyse sinnvoll ist und welche nächsten Schritte wirklich passen." },
  { q: "Läuft die Zusammenarbeit mit jedem Kunden gleich?", a: "Nein. Wir arbeiten nicht mit beliebigen Standardlösungen, sondern mit einem klaren System, das individuell auf die jeweilige Ausgangslage angepasst wird. Entscheidend ist, wo die eigentlichen Engpässe liegen und welche Bausteine dort wirklich Wirkung erzeugen." },
  { q: "Welche Bausteine können Teil der Zusammenarbeit sein?", a: "Je nach Zielbild und Ausgangslage können unter anderem Content, Videografie, Webdesign, Social Recruiting oder weitere operative Verstärker Teil des Systems sein – als Bausteine innerhalb einer klaren Wachstumslogik." },
  { q: "Wie schnell sieht man erste Ergebnisse?", a: "Das hängt immer von der Ausgangslage, dem Ziel und den gewählten Hebeln ab. Entscheidend ist für uns nicht, schnellstmöglich gehaltlose Ergebnisse zu liefern – sondern zuerst die richtige Struktur aufzubauen, damit daraus auch nachhaltig Wirkung entsteht." },
  { q: "Muss ich mich direkt langfristig binden?", a: "Nein. Im ersten Schritt geht es um eine saubere Einordnung Ihrer Situation. So wird klar, welche Form der individuellen Zusammenarbeit für Sie sinnvoll ist." },
];

export default function Home() {
  return (
    <>
      <style>{`
        .phase-card { background: var(--white); border: 1px solid var(--border); border-radius: 6px; padding: 2.25rem; transition: box-shadow 0.2s; }
        .phase-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .hero-btn-primary { background: var(--accent); color: var(--primary); padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.92rem; letter-spacing: 0.04em; transition: opacity 0.2s; }
        .hero-btn-primary:hover { opacity: 0.88; }
        .hero-btn-secondary { border: 1px solid rgba(255,255,255,0.25); color: var(--white); padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none; font-weight: 500; font-size: 0.92rem; letter-spacing: 0.04em; transition: border-color 0.2s; }
        .hero-btn-secondary:hover { border-color: rgba(200,169,110,0.6); }
        .btn-dark { background: var(--primary); color: var(--white); padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.92rem; display: inline-block; letter-spacing: 0.04em; transition: opacity 0.2s; }
        .btn-dark:hover { opacity: 0.85; }
      `}</style>

      {/* Hero */}
      <section style={{background:'var(--primary)',color:'var(--white)',padding:'7rem 0 6rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,right:0,width:'50%',height:'100%',background:'linear-gradient(135deg, transparent 40%, rgba(200,169,110,0.08) 100%)',pointerEvents:'none'}} />
        <div style={{position:'absolute',bottom:-80,left:-80,width:400,height:400,borderRadius:'50%',border:'1px solid rgba(200,169,110,0.1)',pointerEvents:'none'}} />
        <div className="container" style={{position:'relative'}}>
          <div style={{maxWidth:740}}>
            <div style={{display:'inline-block',background:'rgba(200,169,110,0.15)',border:'1px solid rgba(200,169,110,0.3)',color:'var(--accent)',padding:'0.35rem 1rem',borderRadius:'2px',fontSize:'0.75rem',letterSpacing:'0.14em',textTransform:'uppercase',fontWeight:600,marginBottom:'1.75rem'}}>
              Social Recruiting · Pflege & Soziales
            </div>
            <h1 style={{fontSize:'clamp(2.2rem,5vw,3.8rem)',fontWeight:700,lineHeight:1.1,marginBottom:'1.5rem',color:'var(--white)'}}>
              Planbare Sichtbarkeit<br />
              <span style={{color:'var(--accent)'}}>und Mitarbeitergewinnung.</span>
            </h1>
            <p style={{fontSize:'1.15rem',color:'rgba(255,255,255,0.7)',marginBottom:'1rem',lineHeight:1.7,maxWidth:580}}>
              Wir helfen Unternehmen dabei, nach außen klarer aufzutreten, sichtbar zu werden und die Mitarbeitergewinnung endlich planbarer zu machen.
            </p>
            <p style={{fontSize:'1rem',color:'var(--accent-light)',marginBottom:'2.5rem',fontStyle:'italic',fontFamily:'Playfair Display, serif'}}>
              Wir vermitteln keine Bewerber. Wir bauen Ihnen die Maschine, die Bewerber für Sie generiert.
            </p>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
              <Link href="/galerie" className="hero-btn-primary">Fallstudie ansehen</Link>
              <Link href="/kontakt" className="hero-btn-secondary">Wachstumsanalyse anfragen</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{padding:'5rem 0',background:'var(--section-bg)'}}>
        <div className="container" style={{maxWidth:760,textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(1.6rem,3.5vw,2.4rem)',marginBottom:'1.5rem'}}>
            Unsere 4 Phasen für planbare Sichtbarkeit und Mitarbeitergewinnung
          </h2>
          <p style={{color:'var(--muted)',fontSize:'1rem',lineHeight:1.8}}>
            Viele Unternehmen machen schon etwas für ihre Sichtbarkeit, ihre Website oder ihre Mitarbeitergewinnung. Das Problem ist nur, dass oft nichts davon wirklich effizient ineinander greift. Genau deshalb arbeiten wir nicht mit losen Einzelleistungen, sondern mit einem klaren System.
          </p>
        </div>
      </section>

      {/* Phases */}
      <section style={{padding:'1rem 0 5rem',background:'var(--section-bg)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'1.5rem'}}>
            {phases.map(p=>(
              <div key={p.num} className="phase-card">
                <div style={{fontSize:'0.7rem',letterSpacing:'0.18em',color:'var(--accent)',fontWeight:700,marginBottom:'0.75rem'}}>PHASE {p.num}</div>
                <h3 style={{fontSize:'1.25rem',marginBottom:'1rem',color:'var(--primary)'}}>{p.title}</h3>
                <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.75}}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{padding:'5rem 0',background:'var(--primary)',color:'var(--white)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
            <div style={{fontSize:'0.75rem',letterSpacing:'0.14em',color:'var(--accent)',textTransform:'uppercase',fontWeight:600,marginBottom:'1rem'}}>Ablauf</div>
            <h2 style={{fontSize:'clamp(1.6rem,3.5vw,2.4rem)',color:'var(--white)'}}>So läuft die Zusammenarbeit ab</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'2rem',maxWidth:900,margin:'0 auto'}}>
            {steps.map((s,i)=>(
              <div key={s.title} style={{position:'relative',paddingLeft:'1rem'}}>
                <div style={{position:'absolute',left:0,top:0,width:3,height:'100%',background:`linear-gradient(to bottom, var(--accent) ${i*33}%, rgba(200,169,110,0.2) 100%)`}} />
                <div style={{fontSize:'2.5rem',fontFamily:'Playfair Display, serif',fontWeight:700,color:'rgba(200,169,110,0.2)',lineHeight:1,marginBottom:'0.5rem'}}>{String(i+1).padStart(2,'0')}</div>
                <h3 style={{fontSize:'1.15rem',color:'var(--white)',marginBottom:'0.75rem'}}>{s.title}</h3>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:'0.92rem',lineHeight:1.75}}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{background:'var(--accent)',padding:'4rem 0'}}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'2rem'}}>
          <div>
            <h2 style={{fontSize:'clamp(1.4rem,3vw,2rem)',color:'var(--primary)',marginBottom:'0.5rem'}}>Der nächste Schritt ist einfach.</h2>
            <p style={{color:'rgba(26,23,20,0.7)',fontSize:'0.95rem'}}>Kurzes Erstgespräch – unverbindlich, kostenlos.</p>
          </div>
          <Link href="/kontakt" className="btn-dark" style={{whiteSpace:'nowrap',flexShrink:0}}>Erstgespräch anfragen</Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'5rem 0'}}>
        <div className="container" style={{maxWidth:800}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <div style={{fontSize:'0.75rem',letterSpacing:'0.14em',color:'var(--accent)',textTransform:'uppercase',fontWeight:600,marginBottom:'1rem'}}>FAQ</div>
            <h2 style={{fontSize:'clamp(1.6rem,3.5vw,2.2rem)'}}>Häufige Fragen</h2>
          </div>
          <div>
            {faqs.map((f,i)=>(
              <details key={i} style={{borderTop:'1px solid var(--border)',padding:'1.4rem 0'}}>
                <summary style={{cursor:'pointer',fontWeight:600,fontSize:'0.97rem',color:'var(--primary)',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  {f.q}
                  <span style={{color:'var(--accent)',fontSize:'1.2rem',fontWeight:300,marginLeft:'1rem',flexShrink:0}}>+</span>
                </summary>
                <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.8,marginTop:'0.85rem'}}>{f.a}</p>
              </details>
            ))}
            <div style={{borderTop:'1px solid var(--border)'}} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{padding:'5rem 0',background:'var(--section-bg)',textAlign:'center'}}>
        <div className="container" style={{maxWidth:600}}>
          <h2 style={{fontSize:'clamp(1.6rem,3.5vw,2.2rem)',marginBottom:'1rem'}}>Klarheit, Sichtbarkeit und Mitarbeitergewinnung brauchen Struktur.</h2>
          <p style={{color:'var(--muted)',marginBottom:'2rem',lineHeight:1.8}}>Genau dafür entwickeln wir digitale Wachstumssysteme, die Unternehmen helfen, nach außen klarer aufzutreten und Wachstum planbarer zu machen.</p>
          <Link href="/kontakt" className="btn-dark">Erstgespräch anfragen</Link>
        </div>
      </section>
    </>
  );
}
