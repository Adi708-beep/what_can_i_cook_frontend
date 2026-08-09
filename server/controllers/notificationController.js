let MOCK_NOTIFICATIONS = [
  { _id: 'notif_1', type: 'expiry', title: 'Milk Expires Tomorrow', message: 'Your Whole Milk in the fridge expires tomorrow. Try making Creamy Spinach Pasta!', isRead: false, createdAt: new Date() },
  { _id: 'notif_2', type: 'expiry', title: 'Spinach Needs Attention', message: 'Fresh Spinach has 2 days left. You have 3 recommended recipes to use it.', isRead: false, createdAt: new Date(Date.now() - 3600000) },
  { _id: 'notif_3', type: 'recipe', title: 'New Recipe AI Recommendation', message: 'Spinach & Cheese Golden Omelette is a 100% ingredient match today!', isRead: true, createdAt: new Date(Date.now() - 86400000) },
];

exports.getNotifications = async (req, res) => {
  try {
    res.json({
      success: true,
      data: { notifications: MOCK_NOTIFICATIONS },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'GET_NOTIFICATIONS_ERROR', message: error.message },
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = MOCK_NOTIFICATIONS.find(n => n._id === id);
    if (notif) notif.isRead = true;
    res.json({
      success: true,
      data: { notification: notif },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'MARK_READ_ERROR', message: error.message },
    });
  }
};
