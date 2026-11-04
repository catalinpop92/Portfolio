import React, {useState} from "react";
import {useTranslation} from "react-i18next";

export default function ShareChallenge() {
  const {t} = useTranslation();
  const [status, setStatus] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");

  async function share() {
    const url = new URL("#/soc", window.location.href).href;
    setStatus("");
    setFallbackUrl("");
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({title: t("challenge.shareTitle"), url});
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(url);
      setStatus(t("challenge.shareCopied"));
    } catch (error) {
      setFallbackUrl(url);
      setStatus(t("challenge.shareFallback"));
    }
  }

  return (
    <div className="challenge-share">
      <button type="button" onClick={share}>
        <span aria-hidden="true">↗</span> {t("challenge.share")}
      </button>
      <span className="challenge-share-status" role="status">{status}</span>
      {fallbackUrl && <input aria-label={t("challenge.shareLinkLabel")} readOnly value={fallbackUrl} onFocus={event => event.target.select()} />}
    </div>
  );
}
