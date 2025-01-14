#Bước 1: Chạy npm install của BE và FE
cd be
npm i
cd ../
cd fe
npm i
#Bước 2: Buil image
docker-compose down
docker-compose build
docker-compose up -d

#Lưu ý: Khi cài thêm các packege thì build lại dự án để reload lại node_modules
docker-compose down
docker-compose build
docker-compose up -d
