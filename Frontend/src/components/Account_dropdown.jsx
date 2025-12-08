import { Link } from "react-router-dom";

const AccountDropdown = ({ clicked, clickFunction }) => {
  return (
    <div
      className={`w-40 bg-gray-200 text-black rounded-md absolute right-0 mt-2 shadow-lg  ${
        !clicked ? "hidden" : ""
      }`}
    >
      <ul className="flex flex-col gap-2 py-2">
        <Link to={"/dashboard/account-details"}>
          <li
            className=" hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md cursor-pointer text-center sm:text-left"
            onClick={clickFunction}
          >
            Account Details
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AccountDropdown;
