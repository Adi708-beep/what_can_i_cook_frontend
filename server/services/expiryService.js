/**
 * Expiry Intelligence Engine
 * Categorizes ingredients by urgency and calculates waste priority.
 */

function calculateFreshnessStatus(expiryDate) {
  if (!expiryDate) return { status: 'Fresh', urgencyScore: 0, daysLeft: 999 };

  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - now;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { status: 'Expired', urgencyScore: 100, daysLeft };
  } else if (daysLeft === 0) {
    return { status: 'Expires today', urgencyScore: 90, daysLeft };
  } else if (daysLeft === 1) {
    return { status: 'Expires tomorrow', urgencyScore: 80, daysLeft };
  } else if (daysLeft <= 3) {
    return { status: 'Within 3 days', urgencyScore: 60, daysLeft };
  } else if (daysLeft <= 7) {
    return { status: 'Within 7 days', urgencyScore: 40, daysLeft };
  } else {
    return { status: 'Fresh', urgencyScore: 10, daysLeft };
  }
}

function prioritizeInventoryByUrgency(items = []) {
  return items
    .map(item => {
      const freshnessInfo = calculateFreshnessStatus(item.expiryDate);
      return {
        ...item._doc ? item._doc : item,
        freshness: freshnessInfo.status,
        urgencyScore: freshnessInfo.urgencyScore,
        daysLeft: freshnessInfo.daysLeft,
      };
    })
    .sort((a, b) => b.urgencyScore - a.urgencyScore);
}

module.exports = {
  calculateFreshnessStatus,
  prioritizeInventoryByUrgency,
};
