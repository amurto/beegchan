const node_vault = require('node-vault');
process.env.DEBUG = 'node-vault'; // switch on debug mode
const options = {
    apiVersion: 'v1', // default
    endpoint: 'http://142.93.208.55:8200', // default
    token: 's.NpC16t2h8DWFpCkq7X73l6Fx'
};
let user_name = null;
const policy = {
    name: "mypol",
    path: "cubbyhole/cubbyhole",
    capabilities: '["create", "read", "update","delete","list","sudo"]',
    mountPoint: 'userpass'
}

const vault = node_vault(options);

export async function LoadPolicy() {
    const policies = await vault.policies();
    // init vault server
    const policy_selected = await vault.addPolicy({
        name: policy.name,
        rules: `path "${policy.path}/*" { capabilities = ${policy.capabilities} }`,
    });
}
export function Reload() {
    vault.token = options.token;
}
export async function Load() {
    const auths = await vault.auths();
    if (auths.hasOwnProperty('userpass/'))
        return undefined;
    await vault.enableAuth({
        mount_point: policy.mountPoint,
        type: 'userpass',
        description: 'userpass auth',
    });
    return auths;
}
export async function Mount(path) {
    const mounts = await vault.mounts()
    return await vault.mount({ mount_point: path, type: 'generic', description: 'just a test' });
}
export async function Create(username, password) {
    const written = await vault.write(`auth/userpass/users/${username}`, { password, policies: policy.name });
    return written;
}

export async function DeleteUser(username) {
    return await vault.delete(`auth/userpass/users/${username}`);
}

export async function SignIn(username, password) {
    Reload();
    try { await Load(); } catch (err) { console.error(err) }
    const login = await vault.userpassLogin({ username, password });
    Reload();
    user_name = username;
    return login;
}

export async function PublicKeyGet(){
    return (await Read("public_key")).public_key;
}
export async function PublicKeySet(public_key){
    return await Write("public_key", {public_key:public_key});
}

export async function PrivateKeyGetByUserName(username){
    return (await ReadWithName(username, "private_key")).private_key;
}

export async function PublicKeyGetByUserName(username){
    return (await ReadWithName(username, "public_key")).public_key;
}
export function UserName(username) {
    user_name = username
}
export async function PrivateKeyGet(){
    console.log(user_name);
    return (await Read("private_key")).private_key;
}
export async function PrivateKeySet(private_key){
    return await Write("private_key", {private_key:private_key});
}
export async function NameGet(){
    return (await Read("name")).name;
}
export async function NameSet(name){
    return await Write("name", {name:name});
}

export async function IDSet(id){
    return await Write("i__d", {id:id});
}
export async function IDGet(){
    return (await Read("i__d")).id;
}
export async function Setup(username, password) {
    Reload();
    try { await Load(); } catch (err) { console.error(err) }
    await LoadPolicy();
    // console.log(policy);
    await DeleteUser(username)
    // console.log(username, password, policy);
    const user = await Create(username, password);
}

export async function Write(key, value) {
    return await vault.write(policy.path + "/" + user_name + "/" + key, value);
}
export async function Read(key) {
    return (await vault.read(policy.path + "/" + user_name + "/" + key)).data;
}
export async function WriteWithName(name, key, value) {
    return await vault.write(policy.path + "/" + name + "/" + key, value);
}
export async function ReadWithName(name, key) {
    return (await vault.read(policy.path + "/" + name + "/" + key)).data;
}