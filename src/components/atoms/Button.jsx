const Button = ({ icon, text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-4 items-center px-4 py-1 bg-green-default text-xl text-white dm-serif-display-regular  ${className}`}
    >
      <span>{text}</span>
      <span className="mr-2">{icon}</span>
    </button>
  );
};

export default Button;
