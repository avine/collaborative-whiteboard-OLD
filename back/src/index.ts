import express from 'express';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';

const app = express();

const port = 3000;
const basePath = resolve(__dirname, './static');
const indexPath = join(basePath, 'index.html');
const indexContent = readFileSync(indexPath, { encoding: 'utf8' });

app.use(express.static(basePath));

app.use(async (req, res, next) => res.send(indexContent));

app.listen(port, () => console.log(`App listening on port ${port}!`));
