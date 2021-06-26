import { Request, Response } from 'express';
import User from '../../models/user';
import Logger from '../../config/winston';
import genericError from '../../utils/generic_error';

const ShowAllUser = async (req: Request, res: Response) => {
  try {
    const allUser = await User.find({}).select(
      '_id fullname dateOfBirth email role picture createdAt updatedAt',
    );

    return res.status(200).json({
      success: true,
      data: allUser,
    });
  } catch (error) {
    genericError(res, error);
  }
};

export default ShowAllUser;
