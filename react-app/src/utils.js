export function formatDate(dateString) {
  const originalDate = new Date(dateString);
  const year = originalDate.getUTCFullYear();
  const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getUTCDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getRandomProfilePicture() {
  return 'https://cataas.com/cat?width=96&height=96&s=' + Math.random();
}
