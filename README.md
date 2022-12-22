![App Screenshot](https://s1.hostingkartinok.com/uploads/images/2022/01/2d20913e1702ee4fd3618e0f72998aaa.png)
## Run Locally
**1) Clone the project**

```bash
  git clone https://github.com/The-Solomon/Foodorator.git
```

**2) Install dependencies**
```bash
  cd foodorator
  cd client 
  npm install
  cd ../server
  npm install
```
**3) Create dotenv file**
```bash
  touch .env
  nano .env
```
4) Paste your connection string, and after that your **.env** file should looks like:
```
DB_CONN = mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
```
**5) Run Node server**
```bash
  npm run serve
```
**6) Run vue dev server** 
```bash
  cd foodorator/client
  npm run serve
```
**Or build production version. Your files will be located in `dist/` folder**
```
  npm run build
```
# Enjoy!

![App Screenshot](https://s1.hostingkartinok.com/uploads/images/2022/01/ebeafa38820c93de2075bf11fc899a7a.png)
![App Screenshot](https://s1.hostingkartinok.com/uploads/images/2022/01/7e3d5200235b171c445d6b46dc2674ab.png)
