import Region from "../models/Region";
import { Request, Response, NextFunction } from "express";

enum ErrorCodes {
  NotFound = "404",
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
    ) => Promise<RegionsResponseObject[]>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, path } = req.body;

    try {
      const region = new Region(path, name);
      const result = await targetFunction(region, id);
      if (!result.length) {
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
          errorToThrow.statusCode = 403;
          break;

        case ErrorCodes.NotFound:
          errorToThrow.message = "";
          break;
        default:
          errorToThrow.statusCode = 500;
      }

      next(errorToThrow);
    }
  };

export default {
  getRegion: basicCallback((region, id) => region.getRegion(id)),
  getRegions: basicCallback((region) => region.getRegions()),
  postRegion: basicCallback((region) => region.createRegion()),
  putRegion: basicCallback((region, id) => region.updateRegion(id)),
  deleteRegion: basicCallback((region, id) => region.deleteRegion(id)),
};
