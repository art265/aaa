DIR="client"

if [ -d "./$DIR/dist" ]; then
    rm -rf "$DIR/dist"
fi

cd $DIR
npm run build

if [ ! -d "./target" ]; then
    mkdir "./target"
fi

cd ..

cp -r "./$DIR/dist" "./target/client"
rm -rf "./$DIR/dist"

echo "# Target" >"./target/README.md"
