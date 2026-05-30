"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-link { color: var(--muted); text-decoration: none; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.02em; transition: color 0.2s; }
        .nav-link:hover { color: var(--primary); }
        .nav-cta { background: var(--primary); color: var(--white) !important; padding: 0.55rem 1.4rem; border-radius: 4px; text-decoration: none; font-size: 0.88rem; font-weight: 500; letter-spacing: 0.04em; transition: background 0.2s; }
        .nav-cta:hover { background: var(--accent) !important; }
        .footer-link { display: block; color: rgba(232,217,188,0.75); text-decoration: none; margin-bottom: 0.6rem; font-size: 0.9rem; transition: color 0.2s; }
        .footer-link:hover { color: var(--accent); }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger { display: block !important; }
        }
      `}</style>

      <div style={{background:'var(--primary)',color:'var(--accent-light)',fontSize:'0.8rem',textAlign:'center',padding:'0.5rem 1rem',letterSpacing:'0.05em'}}>
        Kurzes Erstgespräch vereinbaren: <a href="tel:064039179483" style={{color:'var(--accent)',fontWeight:600}}>06403 / 9179483</a>
      </div>
      <nav style={{background:'var(--white)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 12px rgba(0,0,0,0.06)'}}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'70px'}}>
          <Link href="/" style={{textDecoration:'none',display:'flex',flexDirection:'column',lineHeight:1.1}}>
            <span style={{fontFamily:'Playfair Display, serif',fontSize:'1.4rem',fontWeight:700,color:'var(--primary)',letterSpacing:'-0.01em'}}>Bewerberbrücke</span>
            <span style={{fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'0.12em',textTransform:'uppercase',fontWeight:500}}>Social Recruiting</span>
          </Link>

          <div style={{display:'flex',gap:'2.5rem',alignItems:'center'}} className="desktop-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/galerie" className="nav-link">Referenzen</Link>
            <Link href="/ueber-uns" className="nav-link">Über uns</Link>
            <Link href="/kontakt" className="nav-cta">Kontakt</Link>
          </div>

          <button onClick={()=>setOpen(!open)} style={{display:'none',background:'none',border:'none',cursor:'pointer',padding:'0.5rem'}} className="burger" aria-label="Menu">
            <div style={{width:24,height:2,background:'var(--primary)',marginBottom:5}} />
            <div style={{width:24,height:2,background:'var(--primary)',marginBottom:5}} />
            <div style={{width:24,height:2,background:'var(--primary)'}} />
          </button>
        </div>

        {open && (
          <div style={{background:'var(--white)',borderTop:'1px solid var(--border)',padding:'1rem 1.5rem 1.5rem'}}>
            {[['/','Home'],['/galerie','Referenzen'],['/ueber-uns','Über uns'],['/kontakt','Kontakt']].map(([href,label])=>(
              <Link key={href} href={href} onClick={()=>setOpen(false)}
                style={{display:'block',padding:'0.75rem 0',color:'var(--primary)',textDecoration:'none',fontSize:'1rem',borderBottom:'1px solid var(--border)'}}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
