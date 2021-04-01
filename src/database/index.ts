import { createConnection } from "typeorm";

// eslint-disable-next-line no-return-await
(async () => await createConnection())();
