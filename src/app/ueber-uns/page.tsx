import Link from "next/link";

export default function UeberUns() {
  return (
    <>
      <style>{`
        .btn-dark { background: var(--primary); color: var(--white); padding: 0.9rem 2.25rem; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.92rem; display: inline-block; transition: opacity 0.2s; }
        .btn-dark:hover { opacity: 0.85; }
        @media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>

      <section style={{background:'var(--primary)',padding:'5rem 0 4rem',color:'var(--white)'}}>
        <div className="container">
          <div style={{fontSize:'0.75rem',letterSpacing:'0.14em',color:'var(--accent)',textTransform:'uppercase',fontWeight:600,marginBottom:'1rem'}}>Über uns</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',color:'var(--white)',maxWidth:600}}>Wer hinter der Bewerberbrücke steht</h1>
        </div>
      </section>

      <section style={{padding:'5rem 0'}}>
        <div className="container two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'start',maxWidth:1000}}>
          <div>
            <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',marginBottom:'1.5rem'}}>Wir lösen ein strukturelles Problem.</h2>
            <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:'1.25rem'}}>
              Viele Unternehmen im Bereich Pflege und Soziales kämpfen nicht mit einem Bewerber-Problem – sie kämpfen mit einem Sichtbarkeitsproblem. Sie werden schlicht nicht gefunden. Oder sie werden gefunden, wirken aber nicht überzeugend genug, um ins Gespräch zu kommen.
            </p>
            <p style={{color:'var(--muted)',lineHeight:1.85,marginBottom:'1.25rem'}}>
              Genau hier setzen wir an. Wir entwickeln keine losen Maßnahmen, sondern ein digitales Wachstumssystem, das Sichtbarkeit, Außenwirkung und Mitarbeitergewinnung planbarer macht.
            </p>
            <p style={{color:'var(--muted)',lineHeight:1.85}}>
              Unser Ansatz ist systemisch, nicht aktionistisch. Wir starten nicht mit einer Kampagne – wir starten mit einer klaren Einordnung.
            </p>
          </div>
          <div>
            <div style={{background:'var(--section-bg)',border:'1px solid var(--border)',borderRadius:'6px',padding:'2.5rem'}}>
              <div style={{fontSize:'0.75rem',letterSpacing:'0.12em',color:'var(--accent)',textTransform:'uppercase',fontWeight:600,marginBottom:'1.5rem'}}>Unsere Werte</div>
              {[
                ['Klarheit vor Aktionismus', 'Wir analysieren zuerst – und handeln dann zielgerichtet.'],
                ['Struktur vor Einzelmaßnahmen', 'Nachhaltigkeit entsteht durch Systeme, nicht durch Einzelaktionen.'],
                ['Ehrlichkeit vor Versprechen', 'Wir sagen, was realistisch ist – keine leeren Versprechungen.'],
                ['Wirkung vor Optik', 'Schöne Maßnahmen, die nichts bringen, nützen niemandem.'],
              ].map(([title, text])=>(
                <div key={title as string} style={{marginBottom:'1.5rem'}}>
                  <div style={{fontWeight:600,fontSize:'0.95rem',color:'var(--primary)',marginBottom:'0.25rem'}}>{title}</div>
                  <div style={{color:'var(--muted)',fontSize:'0.88rem',lineHeight:1.7}}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{background:'var(--accent)',padding:'4rem 0',textAlign:'center'}}>
        <div className="container" style={{maxWidth:560}}>
          <h2 style={{fontSize:'clamp(1.4rem,3vw,2rem)',color:'var(--primary)',marginBottom:'0.75rem'}}>Lernen Sie uns kennen.</h2>
          <p style={{color:'rgba(26,23,20,0.7)',marginBottom:'2rem'}}>Im Erstgespräch erfahren Sie schnell, ob und wie wir sinnvoll unterstützen können.</p>
          <Link href="/kontakt" className="btn-dark">Erstgespräch anfragen</Link>
        </div>
      </section>
    </>
  );
}
