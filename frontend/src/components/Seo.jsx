// src/components/Seo.jsx
import { useEffect } from "react";

const SITE_NAME = "Trouve ton artisan";

export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]');

      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}