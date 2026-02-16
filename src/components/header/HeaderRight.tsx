import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux"; 
import type { RootState } from "../../app/store"; 

export default function HeaderRight() {
  const navigate = useNavigate(); 
  const isAuthenticated = useSelector((state: RootState) => state.auth.accessToken !== null);

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate("/login"); 
    }
  };

  return (
    <div className="w-full flex justify-around">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
        <MapPinIcon className="w-8 h-8 text-gray-600" />
      </div>
      <div className="flex justify-end items-center gap-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
          <HeartIcon className="w-8 h-8 text-gray-600" />
        </div>

        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
          <ShoppingCartIcon className="w-8 h-8 text-gray-600" />
        </div>

        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded" onClick={handleUserIconClick}>
          <UserIcon className="w-8 h-8 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
