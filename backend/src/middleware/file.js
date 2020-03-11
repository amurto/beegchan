import multer from "multer";
import fs from 'fs';
import path from "path";
const IpfsClient = require('ipfs-api');
import { createHash } from 'crypto';
import { Duplex } from 'stream';

export const MulterStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "D:\\Desktop\\Folder");
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}${ext}`);
    },
});

const IPFSMiddleMan = IpfsClient({ host: '68.183.95.40', port: '5001', protocol: 'http' });

    export function DirectoryCreate(location) {
        // If Directory exists, exception thrown
        try {
            fs.mkdirSync(location, { recursive: true });
        } catch (ex) {
        }
    }
    export function Read(fileName) {
        return new Promise((resolve, reject) => {
            return fs.readFile(fileName, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    export function Delete(fileName) {
        return new Promise((resolve, reject) => {
            return fs.unlink(fileName, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }

    export function GetSHA256(fileName) {
        return new Promise((resolve, reject) => {
            const hash = createHash("sha256");
            const rs = fs.createReadStream(fileName);
            rs.on("error", reject);
            rs.on("data", chunk => hash.update(chunk));
            rs.on("end", () => resolve(hash.digest("hex")));
        });
    }

    export async function AddFile(fileName) {
        const data = await Read(fileName);
        const files = await AddByData(IPFSMiddleMan, data);
        return String(files[0].hash);
    }

    export async function GetFile(ipfsName) {
        const files = await IPFSMiddleMan.get(ipfsName);
        return (files[0].content);
    }

    function AddByData(ipfs, data) {
        return new Promise((resolve, reject) => {
            return ipfs.add(data, (err, files) => {
                if (files) {
                    resolve(files);
                } else {
                    reject(err);
                }
            });
        });
    }

    function BufferToStream(buffer) {
        const stream = new Duplex();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
    export function Download(res, buffer) {
        return new Promise((resolve, reject) => {
            return BufferToStream(buffer)
                .pipe(res)
                .on('error', (error) => {
                    res.sendStatus(404);
                    resolve();
                })
                .on('finish', function () {
                    resolve()
                })
                .on('end', function () {
                    resolve()
                });
        });
    }
