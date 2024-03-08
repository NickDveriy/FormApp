import nconf from "nconf"
import { join } from "path"
import conf from "../../config/config.develop.json"

type Conf = typeof conf

export const config: Conf = nconf
  .env()
  .file(join(__dirname, "..", "..", "config", `config.${process.env.NODE_ENV}.json`))
  .get()
