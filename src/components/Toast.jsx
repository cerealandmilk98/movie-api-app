import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#e50914",
        padding: "10px 16px",
        borderRadius: "8px",
        color: "white",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
