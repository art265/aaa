DIR="client"

if [ -d "./$DIR/dist" ]; then
    rm -rf "$DIR/dist"
fi

if [ ! -d "./target" ]; then
    mkdir "./target"
fi

cd $DIR
npm run build

cd ..

cp -r "./$DIR/dist" "./target/client"
rm -rf "./$DIR/dist"

echo "# Target" >"./target/README.md"
