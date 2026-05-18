# Quick Start

1. Open `frontend/index.html` in your browser, or run a simple static server such as:

```bash
# from repo root
python -m http.server --directory frontend 8080
# or if Python is not available, use Node.js:
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=path.resolve('frontend');const server=http.createServer((req,res)=>{let p=path.join(root,decodeURIComponent(req.url.split('?')[0])); if(req.url==='/'||req.url.startsWith('/#/')) p=path.join(root,'index.html'); fs.stat(p,(err,st)=>{ if(err){ res.statusCode=404; res.end('404'); return;} if(st.isDirectory()) p=path.join(p,'index.html'); const ext=path.extname(p).toLowerCase(); const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'}; res.setHeader('Content-Type',types[ext]||'application/octet-stream'); fs.createReadStream(p).pipe(res); });}).listen(8080,()=>console.log('server running on 8080'));"
# then open http://localhost:8080
```

2. To deploy to Vercel:

```bash
cd frontend
vercel --prod
```

Project structure:

- `index.html` - SPA entry
- `assets/` - CSS and JS
- `data/` - mock JSON data

Troubleshooting:

- If products don't show, ensure `data/products.json` exists.
- For login, SPA uses localStorage; to reset, clear `spa:user` and `spa:cart` keys in localStorage.
