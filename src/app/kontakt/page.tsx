import ContactForm from "@/components/ContactForm";

export default function Kontakt() {
  return (
    <>
      <section style={{background:'var(--primary)',padding:'5rem 0 4rem',color:'var(--white)'}}>
        <div className="container">
          <div style={{fontSize:'0.75rem',letterSpacing:'0.14em',color:'var(--accent)',textTransform:'uppercase',fontWeight:600,marginBottom:'1rem'}}>Kontakt</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',color:'var(--white)',maxWidth:600}}>Erstgespräch anfragen</h1>
          <p style={{color:'rgba(255,255,255,0.6)',marginTop:'1rem',maxWidth:520,lineHeight:1.75}}>
            Wenn Sie herausfinden möchten, wo das Potential von Sichtbarkeit, Außenwirkung oder Mitarbeitergewinnung in Ihrem Unternehmen noch ausbaufähig ist – starten wir mit einem kurzen, kostenfreien Erstgespräch.
          </p>
        </div>
      </section>

      <section style={{padding:'4rem 0 6rem'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'5rem',alignItems:'start',maxWidth:960}}>
          {/* Sidebar */}
          <div>
            <h2 style={{fontSize:'1.3rem',marginBottom:'1.5rem'}}>So erreichen Sie uns</h2>
            {[
              { label: 'E-Mail', value: 'info@bewerberbruecke.com', href: 'mailto:info@bewerberbruecke.com' },
              { label: 'Telefon', value: '06403 / 9179483', href: 'tel:064039179483' },
              { label: 'WhatsApp', value: '+49 157 56039148', href: 'https://wa.me/+4915756039148' },
            ].map(item=>(
              <div key={item.label} style={{marginBottom:'1.5rem'}}>
                <div style={{fontSize:'0.72rem',letterSpacing:'0.12em',color:'var(--accent)',textTransform:'uppercase',fontWeight:600,marginBottom:'0.3rem'}}>{item.label}</div>
                <a href={item.href} style={{color:'var(--primary)',textDecoration:'none',fontSize:'0.95rem',fontWeight:500}}>{item.value}</a>
              </div>
            ))}
            <div style={{marginTop:'2.5rem',padding:'1.5rem',background:'var(--section-bg)',border:'1px solid var(--border)',borderRadius:'6px'}}>
              <div style={{fontSize:'0.85rem',fontWeight:600,marginBottom:'0.5rem'}}>Was passiert danach?</div>
              <ol style={{paddingLeft:'1.2rem',color:'var(--muted)',fontSize:'0.87rem',lineHeight:1.9}}>
                <li>Wir melden uns innerhalb von 24h</li>
                <li>Kurzes Erstgespräch (~20 Min.)</li>
                <li>Einordnung Ihrer Ausgangslage</li>
                <li>Entscheidung über sinnvolle nächste Schritte</li>
              </ol>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
