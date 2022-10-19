DIR="server"

if [ -d "./$DIR/build" ]; then
    rm -rf "$DIR/build"
fi

if [ -d "./$DIR/dist" ]; then
    rm -rf "./$DIR/dist"
fi

if [ -d "./target" ]; then
    rm -rf "./target"
fi

cd "./$DIR"
npm run build

cp -r "./dist" "./build"
cp "./.env" "./build/.env"
cp "./package.json" "./build/package.json"

cd ..
if [ -d "./$DIR/templates" ]; then
    cp -r "./$DIR/templates" "./$DIR/build/templates"
fi

if [ ! -d "./target" ]; then
    mkdir "./target"
fi

cp -r "./$DIR/build" "./target/server"

rm -rf "./dist"
rm -rf "./build"

echo "# Target" >"./target/README.md"
echo "Built!"

echo "cd ./target/server"
echo "npm install"
echo "npm run start"
