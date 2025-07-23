@echo off
echo [1/4] Removing build artifacts and caches...
rm -rf node_modules package-lock.json dist

echo [2/4] Cleaning npm cache...
pm cache clean --force 

echo [3/4] Reinstalling dependencies...
npm install

echo [4/4] Rebuilding project...
npm run build

echo Clean rebuild complete!
pause