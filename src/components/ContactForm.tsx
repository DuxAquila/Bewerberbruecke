"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("kontakt.form");
  const locale = useLocale();

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
      <div className="info-box text-center">
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "0.75rem" }}>{t("successTitle")}</h3>
        <p className="text-muted" style={{ lineHeight: 1.75 }}>{t("successText")}</p>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <h2 style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Ihre Anfrage</h2>

      {status === "error" && (
        <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", marginBottom: "1.5rem", color: "#b91c1c", fontSize: "0.88rem" }}>
          {t("errorText")}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* Name + Unternehmen */}
        <div className="form-name-grid">
          <div>
            <label className="form-label">{t("nameLabel")}</label>
            <input
              value={form.name}
              onChange={set("name")}
              placeholder={t("namePlaceholder")}
              className="form-input"
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
              required
            />
          </div>
          <div>
            <label className="form-label">{t("companyLabel")}</label>
            <input
              value={form.company}
              onChange={set("company")}
              placeholder={t("companyPlaceholder")}
              className="form-input"
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>
        </div>

        {/* E-Mail */}
        <div>
          <label className="form-label">{t("emailLabel")}</label>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder={t("emailPlaceholder")}
            className="form-input"
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
            required
          />
        </div>

        {/* Nachricht */}
        <div>
          <label className="form-label">{t("messageLabel")}</label>
          <textarea
            value={form.message}
            onChange={set("message")}
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="form-input"
            style={{ resize: "vertical", lineHeight: 1.7 }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "sending" || !form.name || !form.email}
          className="btn btn-dark"
          style={{ opacity: (status === "sending" || !form.name || !form.email) ? 0.6 : 1 }}
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>

        {/* Datenschutz */}
        <p className="text-muted" style={{ fontSize: "0.78rem", lineHeight: 1.7 }}>
          {t("privacy")}{" "}
          <a href={`/${locale}/impressum`} style={{ color: "var(--accent)" }}>
            Datenschutzerklärung
          </a>.
        </p>
      </div>
    </div>
  );
}
