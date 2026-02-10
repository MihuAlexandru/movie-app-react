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
  const previouslyFocusedRef = useRef(null);
  const appliedInertRef = useRef(false);

  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  useEffect(() => {
    if (!isOpen || !modalRoot) return;

    // 1) Save the previously focused element so we can restore it on close
    previouslyFocusedRef.current = document.activeElement;

    // 2) Lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 3) Find app root to inactivate it
    const appRoot = document.querySelector(appRootSelector);

    // 4) Move focus into the modal ASAP (before inactivating appRoot)
    const focusIntoDialog = () => {
      if (!dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll(focusableSelectors);
      (focusables[0] || dialogRef.current).focus?.();
    };

    // Ensure the modal content is in the DOM and then focus
    const focusId = setTimeout(focusIntoDialog, 0);

    // 6) Key handling: Escape closes, Tab traps focus
    const onKeydown = (e) => {
      if (!dialogRef.current) return;

      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      } else if (e.key === "Tab") {
        const focusables =
          dialogRef.current.querySelectorAll(focusableSelectors);
        if (!focusables.length) {
          // Keep focus on dialog if there are no focusables
          e.preventDefault();
          dialogRef.current.focus?.();
          return;
        }
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

    return () => {
      // Restore scroll
      document.body.style.overflow = prevOverflow;

      // Reactivate app
      if (appRoot) {
        if (appliedInertRef.current) {
          appRoot.inert = false;
          appliedInertRef.current = false;
        }
      }

      // Restore focus to the element that had it before the modal opened
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === "function") {
        // Only restore if it’s still in the document
        try {
          if (document.contains(prev)) prev.focus();
        } catch {
          // ignore if stale
        }
      }

      document.removeEventListener("keydown", onKeydown, true);
      clearTimeout(focusId);
    };
  }, [isOpen, onClose, appRootSelector, modalRoot]);

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
