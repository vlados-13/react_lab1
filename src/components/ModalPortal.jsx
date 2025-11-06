import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
  const container = document.getElementById("modal-root");
  if (!container) return null;
  return createPortal(children, container);
}


