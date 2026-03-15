import fs from "fs";
import { parse } from "csv-parse";

export function createCsvStream(filePath: string) {
  return fs.createReadStream(filePath).pipe(
    parse({
      columns: true,
      trim: true,
    }),
  );
}
