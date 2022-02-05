import db from "../db";
import { RegionsResponseObject } from "../controllers/regions";
import { QueryResult } from "pg";

class Region {
  path: string;
  name: string;

  constructor(path: string, name: string) {
    this.path = path;
    this.name = name;
  }

  static getRegions(): Promise<
    RegionsResponseObject[] | RegionsResponseObject
  > {
    return templateCallback(() =>
      db.query(`SELECT * FROM regions ORDER BY id ASC`)
    );
  }

  static getRegion(
    id: string
  ): Promise<RegionsResponseObject[] | RegionsResponseObject> {
    return templateCallback(
      (id) => db.query(`SELECT * FROM regions WHERE id=$1`, [id]),
      id
    );
  }

  createRegion(): Promise<RegionsResponseObject[] | RegionsResponseObject> {
    return templateCallback(() =>
      db.query(`INSERT INTO regions(path, name) VALUES ($1, $2) RETURNING *`, [
        this.path,
        this.name,
      ])
    );
  }
  updateRegion(
    id: string
  ): Promise<RegionsResponseObject[] | RegionsResponseObject> {
    return templateCallback(
      (id) =>
        db.query(`UPDATE regions SET path=$1,name=$2 WHERE id=$3 RETURNING *`, [
          this.path,
          this.name,
          id,
        ]),
      id
    );
  }

  static deleteRegion(
    id: string
  ): Promise<RegionsResponseObject[] | RegionsResponseObject> {
    return templateCallback(
      (id) => db.query(`DELETE FROM regions WHERE id=$1 RETURNING *`, [id]),
      id
    );
  }
}

const templateCallback = async function (
  targetFunction: (id?: string) => Promise<QueryResult<any>>,
  id = ""
): Promise<RegionsResponseObject[] | RegionsResponseObject> {
  try {
    const { rows } = await targetFunction(id);
    return rows.length < 2 ? rows[0] : rows;
  } catch (err) {
    throw err;
  }
};

export default Region;
