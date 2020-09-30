### concurrently 連載

[node-vue 連載](https://www.npmjs.com/package/concurrently)

```shell
npm install -g concurrently
```

vue 的 package.json 修改

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
	"lint": "vue-cli-service lint",
	"start":"npm run serve"
}
```

node 的 package.json 修改

```
  "scripts": {
		"client-install":"npm install --prefix client",
		"client":"npm start --prefix client",
    "start": "node server.js",
		"server": "nodemon server.js",
		"dev":"concurrently \"npm run server\" \"npm run client\""
  }
```

執行命令

```shell
npm run dev
```

