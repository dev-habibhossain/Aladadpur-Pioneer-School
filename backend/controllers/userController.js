import User from '../models/User.js';

/**
 * @desc    [CREATE] Create a new user profile
 * @route   POST /api/v1/users
 * @access  Public / Admin
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, avatar } = req.body;

    if (!name || !email) {
      res.status(400);
      return next(new Error('Name and email are required fields'));
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400);
      return next(new Error('User with this email already exists'));
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'student',
      phone: phone || '',
      avatar: avatar || { url: '', publicId: '' },
      status: 'active',
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    [READ ALL] Fetch list of users with search, role filter, and pagination
 * @route   GET /api/v1/users
 * @access  Public / Protected
 */
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { role, status, search } = req.query;

    const query = {};

    if (role) {
      query.role = role;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const totalRecords = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      count: users.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalRecords / limit) || 1,
        totalRecords,
      },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    [READ SINGLE] Get single user profile by ID
 * @route   GET /api/v1/users/:id
 * @access  Public / Protected
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404);
      return next(new Error(`User not found with ID: ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    [UPDATE] Update user profile
 * @route   PUT /api/v1/users/:id
 * @access  Public / Protected
 */
export const updateUser = async (req, res, next) => {
  try {
    const { name, phone, role, status, avatar } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      return next(new Error(`User not found with ID: ${req.params.id}`));
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (role) user.role = role;
    if (status) user.status = status;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    [DELETE] Soft-delete or remove user profile
 * @route   DELETE /api/v1/users/:id
 * @access  Public / Admin
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      return next(new Error(`User not found with ID: ${req.params.id}`));
    }

    // Soft delete by updating status to inactive
    user.status = 'inactive';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User deactivated (soft deleted) successfully',
      data: {
        _id: user._id,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
