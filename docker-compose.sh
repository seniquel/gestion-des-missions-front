echo "### Compilation mvn ###"
cd ../gestion-des-missions-back/
mvn clean package

echo "### Compilation npm ###"
cd ../gestion-des-missions-front/
npm run build -- --prod

echo "### Execution docker-compose ###"
docker-compose up -d --build
