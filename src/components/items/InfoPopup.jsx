import { TbAlertTriangle, TbCheck } from "react-icons/tb";

export default function InfoPopup({
  text,
  type,
  className,
  iconName,
  onClose,
}) {
  // console.log(iconName);
  return (
    <div
      className={`info-popup ${
        type === "error"
          ? "info-popup-error"
          : type === "success"
          ? "info-popup-success"
          : "info-popup-loading"
      }`}
    >
      {type === "error" && <TbAlertTriangle className="w-7 h-7 text-white" />}
      {type === "success" && <TbCheck className="w-7 h-7 text-white" />}

      {text && <p className="info-popup-text">{text}</p>}
      <div className="info-popup-close-box">
        <button
          onClick={() => {
            onClose();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
