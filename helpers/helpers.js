function formatTimestamp(timestamp) {
  const now = new Date();
  const diff = now - timestamp;

  const minutes = Math.round(diff / 1000 / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}

module.exports = {
  formatTimestamp,
};
