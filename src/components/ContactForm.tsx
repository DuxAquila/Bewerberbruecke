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
        <div className="form-success-icon">✓</div>
        <h3 className="form-success-title">{t("successTitle")}</h3>
        <p className="text-muted form-success-text">{t("successText")}</p>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <h2 className="form-card-title">Ihre Anfrage</h2>

      {status === "error" && (
        <div className="form-error">{t("errorText")}</div>
      )}

      <div className="form-stack">

        {/* Name + Unternehmen */}
        <div className="form-name-grid">
          <div>
            <label className="form-label">{t("nameLabel")}</label>
            <input
              value={form.name}
              onChange={set("name")}
              placeholder={t("namePlaceholder")}
              className="form-input"
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
            className="form-input form-textarea"
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
        <p className="text-muted form-privacy">
          {t("privacy")}{" "}
          <a href={`/${locale}/impressum`} className="form-privacy-link">
            Datenschutzerklärung
          </a>.
        </p>
      </div>
    </div>
  );
}
