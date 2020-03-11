const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const bigchain = require("bigchaindb-driver");
const Vault = require("../util/vault");

// const getUsers = async (req, res, next) => {
//   let users;
//   try {
//     users = await User.find({}, '-password');
//   } catch (err) {
//     const error = new HttpError(
//       'Fetching users failed, please try again later.',
//       500
//     );
//     return next(error);
//   }
//   res.json({ users: users.map(user => user.toObject({ getters: true })) });
// };
// Vault.Load().catch((err)=>{
//   console.log("666",err);
// });
export async function signup(req, res, next) {
  const { name, email, password } = req.body;

  console.log(req.body);
  let createdUser = {
    id: uuid(),
    email: String(email).replace("@", "_a_"),
    name: name
  };
  try {
    const keys = new bigchain.Ed25519Keypair()
    await Vault.Setup(createdUser.email, password);
    await Vault.SignIn(createdUser.email, password);
    console.log(req.body, createdUser);
    await Vault.Write("55", { 55: "55" });
    console.log(await Vault.Read("55"));
    await Vault.IDSet(createdUser.id);
    await Vault.NameSet(createdUser.name);
    await Vault.PrivateKeySet(keys.privateKey);
    await Vault.PublicKeySet(keys.publicKey);
    let token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
    console.log(token);
    return res
      .status(201)
      .json({ userId: createdUser.id, email: createdUser.email, token: token });
  } catch (err) {
    return res.status(404).json(err);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  console.log(email)
  console.log("hi")

  try {
    let existingUser = {
      id: null,
      email: String(email).replace("@", "_a_")
    };

    console.log(existingUser, password);
    const loggedIn = await Vault.SignIn(existingUser.email, password);
    console.log(await Vault.IDGet(), await Vault.NameGet());
    console.log(existingUser, password, loggedIn);
    existingUser.id = await Vault.IDGet();
    console.log(existingUser, password, loggedIn);

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
    return res.json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token
    });
  } catch (err) {
    return res.status(404).json(err);
  }
}
