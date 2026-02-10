import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const focusableSelectors = `
  a[href], area[href],
  button:not([disabled]),
  input:not([disabled]):not([type="hidden"]),
  select:not([disabled]),
  textarea:not([disabled]),
  iframe,
  [tabindex]:not([tabindex="-1"]),
  [contenteditable="true"]
`;

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  closeOnBackdrop = true,
  appRootSelector = "#root",
}) {
  const dialogRef = useRef(null);
  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  useEffect(() => {
    if (!isOpen) return;

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // hide/inactivate main app
    const appRoot = document.querySelector(appRootSelector);
    const prevAriaHidden = appRoot?.getAttribute("aria-hidden");
    appRoot?.setAttribute("aria-hidden", "true");
    if (appRoot) appRoot.style.pointerEvents = "none"; // interaction lock

    const onKeydown = (e) => {
      if (!dialogRef.current) return;

      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      } else if (e.key === "Tab") {
        const focusables =
          dialogRef.current.querySelectorAll(focusableSelectors);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeydown, true);

    // focus inside the dialog
    const id = setTimeout(() => {
      if (!dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll(focusableSelectors);
      (focusables[0] || dialogRef.current).focus?.();
    }, 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      if (appRoot) {
        if (prevAriaHidden == null) appRoot.removeAttribute("aria-hidden");
        else appRoot.setAttribute("aria-hidden", prevAriaHidden);
        appRoot.style.pointerEvents = "";
      }
      document.removeEventListener("keydown", onKeydown, true);
      clearTimeout(id);
    };
  }, [isOpen, onClose, appRootSelector]);

  if (!isOpen || !modalRoot) return null;

  const overlay = (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <header className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
          <button
            className="modal__close btn"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );

  return createPortal(overlay, modalRoot);
}
