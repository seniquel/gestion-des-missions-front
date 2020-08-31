echo "### Compilation npm ###"
npm run build -- --prod

echo "### Execution docker-compose ###"
docker-compose up -d --build
