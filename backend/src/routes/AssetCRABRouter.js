import AbstractRouter from "./AbstractRouter";
const bdbConfig = {
  host: "http://192.168.33.150:9984",
  api: "/api/v1/",
  auth: {
    required: false
  },
  ws_host: "ws://192.168.33.150:9985",
  ws_url: "/api/v1"
};
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "XXXXXXXXXX",
    pass: "XXXXXXXXXX"
  }
});
const Vault = require("../util/vault");
import {
  MulterStorage,
  AddFile,
  Delete,
  Download,
  GetFile
} from "../middleware/file";
const BigchainDB = require("bigchaindb-driver");
var multer = require("multer");

const Upload = multer({ storage: MulterStorage });

export default class AssetCRABRouter extends AbstractRouter {
  constructor() {
    super();
    this.conn = new BigchainDB.Connection(`${bdbConfig.host}${bdbConfig.api}`);
  }

  registerRoutes() {
    this.router.post("/create", Upload.array("file"), async (req, res) => {
      console.log(req.files, "hi", req.file, "ff", req.body);
      const userName = req.body.userName;
      const ipfs = [];
      async function AddFileToBlockchain(fileName) {
        console.log(fileName);
        // In Future, this ID must be Linked with DB
        ipfs.push(await AddFile(fileName));
        await Delete(fileName);
      }
      Vault.UserName(userName);
      const private_key = await Vault.PrivateKeyGet();
      console.log(private_key);
      const public_key = await Vault.PublicKeyGet();
      console.log(private_key, public_key);
      for (const file of req.files) await AddFileToBlockchain(file.path);
      console.log(ipfs);
      var data = {
        username: userName,
        verifier: "gov_a_gov.in",
        income: ipfs[1], //url
        aadhar: ipfs[0] //url
      };

      const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        data,
        {
          datetime: new Date().toString()
        },

        [
          BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(
              await Vault.PublicKeyGetByUserName("gov_a_gov.in")
            )
          )
        ],
        public_key
      );
      console.log(data);
      const txSigned = BigchainDB.Transaction.signTransaction(
        txCreatePaint,
        private_key
      );
      console.log(data);
      const value = await this.conn.postTransactionCommit(txSigned);
      console.log(value);
      res.json(value);
    });

    this.router.get("/show/:email", async (req, res) => {
      const email = req.params.email.replace("@", "_a_");
      const results = await this.conn.searchAssets(email);
      const info = [];
      for (const result of results) {
        // if (result.income != null && result.aadhar != null)
          info.push(result.data);
      }
      return res.json(info);
    });
    this.router.get("/show", async (req, res) => {
      const results = await this.conn.searchAssets("");
      res.json(results);
    });
    this.router.get("/ipfs/:id", async (req, res) => {
      let { id } = req.params;
      try {
        const buffer = await GetFile(String(id));
        await Download(res, buffer);
      } catch (err) {
        console.error(err);
        return res.sendStatus(404);
      }
    });
    this.router.get("/transfer/:username", async (req, res) => {
      //landingpage POST UPLOAD
      const gpkey = await Vault.PrivateKeyGetByUserName("gov_a_gov.in");

      let username = req.params.username;
      username = username.replace("@", "_a_");
      Vault.UserName(username);
      const public_key = await Vault.PublicKeyGet();
      const results = await this.conn.searchAssets(username);

      const txCreated = await this.conn.getTransaction(
        results[results.length - 1].id
      );
      console.log(txCreated);

      const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
        [
          {
            tx: txCreated,
          }
        ],
        [
          BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(public_key)
          )
        ],
        {
          datetime: new Date().toString()
        }
      );

      const signedTransfer = BigchainDB.Transaction.signTransaction(
        createTranfer,
        gpkey
      );
      const trans = await this.conn.postTransactionCommit(signedTransfer);
      console.log(txCreated);
      res.send(txCreated);

      // {
      //   username = username.replace("_a_", "@");
      //   var mailOptions = {
      //     from: "princebaretto@gmail.com",
      //     to: "amurtobasu@gmail.com",
      //     subject: "You have recieved a transaction using Node.js",
      //     text: " You have recieved a transaction using Node.js "
      //   };

      //   transporter.sendMail(mailOptions, function(error, info) {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       console.log("Email sent: " + info.response);
      //     }
      //   });
      // }
    });

    this.router.get("/gettx/:id", async (req, res) => {
      const id = req.params.id;
      const txCreated = await this.conn.getTransaction(
        results[results.length - 1].id
      );
      res.json(txCreated);
    });


    this.router.post("/sendmymail", async (req, res) => {
      const email = req.body.email.replace("_a_", "@");
      const status = req.body.status
      
      if(status){
        var mailOptions = {
              from: "princebaretto@gmail.com",
              to: email,
              subject: "You are verified",
              text: " You are verified. "
        };
      }
      else{
        var mailOptions = {
          from: "princebaretto@gmail.com",
          to: email,//email
          subject: "You are rejected",
          text: "YOu are rejected"
        };
      }
      transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              res.json({"success": true})
            }
          });
    });

    this.router.post("/createmoney", async (req, res) => {
      try {
        const data = req.body;
        const money = data.allocatedFund;
        const gone = data.remainingFund;
        const govs = data.funds;
        const public_key = await Vault.PublicKeyGetByUserName("gov_a_gov.in");
        const private_key = await Vault.PrivateKeyGetByUserName("gov_a_gov.in");
        const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
          {
            amount: String(money)
          },
          {
            datetime: new Date().toString()
          },
          [
            BigchainDB.Transaction.makeOutput(
              BigchainDB.Transaction.makeEd25519Condition(public_key),
              String(money)
            )
          ],
          public_key
        );

        const txSigned = BigchainDB.Transaction.signTransaction(
          txCreatePaint,
          private_key
        );

        const resus = await this.conn.postTransactionCommit(txSigned);

        const txCreatedID = resus.id;

        const output = [];

        for (const gov of govs) {
          const pub = await Vault.PublicKeyGetByUserName(
            gov.gov.replace("@", "_a_")
          );
          output.push(
            BigchainDB.Transaction.makeOutput(
              BigchainDB.Transaction.makeEd25519Condition(pub),
              gov.fundValue
            )
          );
        }
        output.push(
          BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(public_key),
            String(gone)
          )
        );
        const txCreated = await this.conn.getTransaction(txCreatedID);
        const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
          [
            {
              tx: txCreated,
              output_index: 0
            }
          ],
          output,
          {
            datetime: new Date().toString()
          }
        );
        // Sign with the key of the owner of the painting (Alice)
        const signedTransfer = BigchainDB.Transaction.signTransaction(
          createTranfer,
          private_key
        );
        const resu = await this.conn.postTransactionCommit(signedTransfer);
        console.log(resu);
        return res.status(200).json({ success: true });
      } catch (err) {
        return res.status(404).json({ success: false });
      }
    });
  }
}
