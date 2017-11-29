import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import Blockchain from './src/Blockchain';

const blockchain = new Blockchain();
const app = express();

app.use(bodyParser.json());

app.get('/chain', (req, res) => {
  return res.send(blockchain.chain);
});

app.get('/add-block/:data', (req, res) => {
  blockchain.addBlock(req.params.data);

  return res.send(200);
})

app.post('/mineBlock', (req, res) => {
  if (!blockchain) {
    return res.send({ error: 'no blockchain created yet' });
  }
  const newBlock = blockchain.addBlock(req.body.data);

  return res.send(200);
});

app.listen(
  config.httpPort,
  () => console.log('Listening on port: ' + config.httpPort),
);
