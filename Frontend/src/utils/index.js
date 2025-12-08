const getInitials = (username) => {
  const nameParts = username.trim().split(" ");
  let initials = "";

  if (nameParts.length > 0) {
    initials += nameParts[0].charAt(0);
  }

  if (nameParts.length > 1) {
    initials += nameParts[nameParts.length - 1].charAt(0);
  }

  return initials.toUpperCase();
};

//  handle input change function

export { getInitials };
