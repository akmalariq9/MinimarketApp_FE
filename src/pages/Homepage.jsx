import { React } from "react";
import { useDispatch } from "react-redux";
import { logoutPegawai } from "../redux/reducers/pegawaiSlice";

const Homepage = () => {
  const dispatch = useDispatch();

const handleLogout = async (e) => {
  e.preventDefault();
  dispatch(logoutPegawai(null));
};
  return (
    <div>
    <button
      type="submit"
      className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      onClick={handleLogout}
    >
      Submit
    </button>
  </div>
  )
}

export default Homepage