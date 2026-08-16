import Notice from '../models/Notice.js';

export const createNotice = async (req, res, next) => {
  try {
    const { title, content, targetRoles, isImportant } = req.body;

    if (!title || !content) {
      res.status(400);
      return next(new Error('Please provide title and content for the notice'));
    }

    const notice = await Notice.create({
      title,
      content,
      targetRoles: targetRoles || ['all'],
      publishedBy: req.user._id,
      isImportant: !!isImportant,
    });

    res.status(201).json({
      success: true,
      message: 'Notice published successfully',
      data: notice,
    });
  } catch (error) {
    next(error);
  }
};

export const getNotices = async (req, res, next) => {
  try {
    const userRole = req.user?.role || 'all';

    const query = {
      $or: [{ targetRoles: 'all' }, { targetRoles: userRole }],
    };

    const notices = await Notice.find(query)
      .populate('publishedBy', 'name role avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    next(error);
  }
};
