import { Pool } from "pg";
const pool = new Pool();

export default {
  async query(text: string, params?: any[]) {
    const start = Date.now();

    try {
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      return res;
    } catch (err) {
      console.log("error in query", { text });
      throw err;
    }
  },
};
