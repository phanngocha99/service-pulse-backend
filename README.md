git clone
define .env
define .dockerignore

npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start
npx prisma studio --port 5555
npx prisma db seed

<!-- Thay đổi file schema.prisma, cập nhật cơ sở dữ liệu (DB) on DEV -->

npx prisma migrate dev --name [change-name]
npx prisma generate
