import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-start h-full">
      <span
        className="text-2xl font-semibold cursor-pointer select-none"
        onClick={handleClick}
      >
        ModaLab
      </span>
    </div>
  );
}
