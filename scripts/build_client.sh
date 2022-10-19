START_TIMESTAMP=$(date +%s)
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

printf "\033c"

echo "# Target" >"./target/README.md"
echo "Server Backend Built in $(($(date +%s) - $START_TIMESTAMP)) seconds"
