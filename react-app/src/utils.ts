export function formatDate(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getUTCFullYear();
    const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getUTCDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const profilePictures = [
    'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_x96.jpg',
    'https://pbs.twimg.com/profile_images/1086020588051857408/TyFdPl03_x96.jpg',
    'https://pbs.twimg.com/profile_images/1638827572938022914/eqB5CGBN_x96.jpg',
    'https://pbs.twimg.com/profile_images/1636443983990669326/xm-YehdR_x96.jpg',
    'https://pbs.twimg.com/profile_images/1568417445211152388/YsUHG-Ea_x96.jpg',
    'https://pbs.twimg.com/profile_images/1086020588051857408/TyFdPl03_x96.jpg',
  ];

  export function getRandomProfilePicture() {
    const randomIndex = Math.floor(Math.random() * profilePictures.length);
    return profilePictures[randomIndex];
  }