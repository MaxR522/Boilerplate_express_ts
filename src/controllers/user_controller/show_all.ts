import { Request, Response } from 'express';
import User from '../../models/user';
import Logger from '../../config/winston';

const ShowAllUser = async (req: Request, res: Response) => {
  try {
    const allUser = await User.find({}).select(
      '_id fullname dateOfBirth email role picture createdAt updatedAt',
    );

    return res.status(200).json({
      success: 'true',
      data: allUser,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong !',
      errors: error,
    });
  }
};

export default ShowAllUser;
