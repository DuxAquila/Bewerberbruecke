"use client";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid var(--border)",
  borderRadius: "4px",
  fontSize: "0.93rem",
  fontFamily: "DM Sans, sans-serif",
  background: "var(--white)",
  color: "var(--primary)",
  outline: "none",
  transition: "border-color 0.2s",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", company: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{background:"var(--section-bg)",border:"1px solid var(--border)",borderRadius:"6px",padding:"2.5rem",textAlign:"center"}}>
        <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>✓</div>
        <h3 style={{fontSize:"1.3rem",marginBottom:"0.75rem"}}>Vielen Dank für Ihre Anfrage!</h3>
        <p style={{color:"var(--muted)",lineHeight:1.75}}>Wir melden uns zeitnah bei Ihnen und klären im ersten Schritt gemeinsam, ob und wie wir sinnvoll unterstützen können.</p>
      </div>
    );
  }

  return (
    <div style={{background:"var(--white)",border:"1px solid var(--border)",borderRadius:"6px",padding:"2.5rem"}}>
      <h2 style={{fontSize:"1.2rem",marginBottom:"2rem"}}>Ihre Anfrage</h2>

      {status === "error" && (
        <div style={{background:"#fff5f5",border:"1px solid #fecaca",borderRadius:"4px",padding:"0.85rem 1rem",marginBottom:"1.5rem",color:"#b91c1c",fontSize:"0.88rem"}}>
          Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder melden Sie sich direkt per E-Mail.
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
          <div>
            <label style={{display:"block",fontSize:"0.8rem",fontWeight:600,marginBottom:"0.4rem",color:"var(--primary)",letterSpacing:"0.04em"}}>Name *</label>
            <input value={form.name} onChange={set("name")} placeholder="Max Mustermann" style={inputStyle}
              onFocus={e=>e.target.style.borderColor="var(--accent)"}
              onBlur={e=>e.target.style.borderColor="var(--border)"} required />
          </div>
          <div>
            <label style={{display:"block",fontSize:"0.8rem",fontWeight:600,marginBottom:"0.4rem",color:"var(--primary)",letterSpacing:"0.04em"}}>Unternehmen</label>
            <input value={form.company} onChange={set("company")} placeholder="Muster GmbH" style={inputStyle}
              onFocus={e=>e.target.style.borderColor="var(--accent)"}
              onBlur={e=>e.target.style.borderColor="var(--border)"} />
          </div>
        </div>

        <div>
          <label style={{display:"block",fontSize:"0.8rem",fontWeight:600,marginBottom:"0.4rem",color:"var(--primary)",letterSpacing:"0.04em"}}>E-Mail-Adresse *</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="max@muster.de" style={inputStyle}
            onFocus={e=>e.target.style.borderColor="var(--accent)"}
            onBlur={e=>e.target.style.borderColor="var(--border)"} required />
        </div>

        <div>
          <label style={{display:"block",fontSize:"0.8rem",fontWeight:600,marginBottom:"0.4rem",color:"var(--primary)",letterSpacing:"0.04em"}}>Kurze Beschreibung des Wunschziels</label>
          <textarea value={form.message} onChange={set("message")} rows={5} placeholder="Was ist Ihr aktuelles Ziel? Wo liegen die größten Herausforderungen?"
            style={{...inputStyle, resize:"vertical", lineHeight:1.7}}
            onFocus={e=>e.target.style.borderColor="var(--accent)"}
            onBlur={e=>e.target.style.borderColor="var(--border)"} />
        </div>

        <button onClick={handleSubmit} disabled={status==="sending" || !form.name || !form.email}
          style={{background:"var(--primary)",color:"var(--white)",padding:"0.9rem 2rem",border:"none",borderRadius:"4px",fontSize:"0.93rem",fontFamily:"DM Sans, sans-serif",fontWeight:600,cursor:"pointer",letterSpacing:"0.04em",opacity:(status==="sending" || !form.name || !form.email) ? 0.6 : 1,transition:"opacity 0.2s"}}>
          {status === "sending" ? "Wird gesendet…" : "Anfrage absenden"}
        </button>

        <p style={{color:"var(--muted)",fontSize:"0.78rem",lineHeight:1.7}}>
          Mit dem Absenden stimmen Sie zu, dass wir Ihre Angaben zur Bearbeitung Ihrer Anfrage verarbeiten. Weitere Informationen finden Sie in unserer <a href="/impressum" style={{color:"var(--accent)"}}>Datenschutzerklärung</a>.
        </p>
      </div>
    </div>
  );
}
