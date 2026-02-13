import React, { FC, useState, useCallback } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

interface Props {
  onSubmit: (password: string) => void;
  error?: boolean;
}

export const PasswordPrompt: FC<Props> = ({ onSubmit, error }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (password.trim()) {
        onSubmit(password);
        setPassword("");
      }
    },
    [password, onSubmit],
  );

  return (
    <div className="rdv-password-overlay">
      <form className="rdv-password-modal" onSubmit={handleSubmit}>
        <div className="rdv-password-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="rdv-password-title">{t("passwordRequired")}</p>
        {error && (
          <p className="rdv-password-error">{t("passwordError")}</p>
        )}
        <input
          type="password"
          className="rdv-password-input"
          placeholder={t("passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <button type="submit" className="rdv-password-submit">
          {t("passwordSubmit")}
        </button>
      </form>
    </div>
  );
};
