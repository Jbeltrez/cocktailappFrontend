const categoryImages = {
  Wine: "/wine.jpg",
  Stirred: "/OldFashioned_Hero.jpg",
  Shaken: "/Whiskey-Sour-CU-1-1.jpg",
  Martini: "/martini.jpg",
  // Add a default image in case the category doesn't match
  default: "/martini.jpg",
};

export const getCategoryImage = (category) => {
  return categoryImages[category] || categoryImages.default;
};
