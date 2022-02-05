import Region from "../models/Region";
import { Request, Response, NextFunction } from "express";

enum ErrorCodes {
  AlreadyExist = "23505",
}

export type ApiError = Error & {
  statusCode?: number;
};

export type RegionsResponseObject = {
  path: string;
  name: string;
  id: number;
};

const basicCallback =
  (
    targetFunction: (
      region: Region,
      id: string
    ) => Promise<RegionsResponseObject[] | RegionsResponseObject>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, path } = req.body;

    try {
      const region = new Region(path, name);
      const result = await targetFunction(region, id);

      if (!Array.isArray(result) && !result) {
        throw new Error(
          "Something is wrong, db is not updated, id may not exist"
        );
      }
      res.send(result);
    } catch (err) {
      const errorToThrow: ApiError = new Error(err.message);
      switch (err.code) {
        case ErrorCodes.AlreadyExist:
          errorToThrow.message = "Region already exists";
          errorToThrow.statusCode = 409;
          break;
        default:
          errorToThrow.message = "Internal server error";
          errorToThrow.statusCode = 500;
      }

      next(errorToThrow);
    }
  };

export default {
  getRegion: basicCallback((_, id) => Region.getRegion(id)),
  getRegions: basicCallback(() => Region.getRegions()),
  postRegion: basicCallback((region) => region.createRegion()),
  putRegion: basicCallback((region, id) => region.updateRegion(id)),
  deleteRegion: basicCallback((_, id) => Region.deleteRegion(id)),
};
