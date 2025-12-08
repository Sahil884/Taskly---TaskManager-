const UserAvatar = ({ initials }) => {
  return (
    <div className="w-9 h-9 rounded-full border-2 border-white bg-indigo-600  text-white text-bold text-center grid place-items-center">
      <span className="">{initials} </span>
    </div>
  );
};

export default UserAvatar;
