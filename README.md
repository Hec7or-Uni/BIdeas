## Overview
BIdeas is a platform where people from all over the world can come together to create and develop their projects. In short, we are a platform that puts people in contact with each other.

![](https://i.imgur.com/OZPn1CY.png)

## Docs Reference
* [Next.js](https://nextjs.org/)
* [Prisma.io](https://www.prisma.io/)
* [Tailwindcss](https://tailwindcss.com/)
* [React Hot Toast](https://react-hot-toast.com/)
* [Algolia Autocomplete](https://github.com/algolia/autocomplete)
* [SWR](https://github.com/vercel/swr)
* [NGINX](https://www.nginx.com/)
* [Docker](https://www.docker.com/)

## Getting Started
#### `.env`
All the following methods need this file.
```env
NEXT_PUBLIC_URL=
SECRET=
DATABASE_URL=
```
To create the secret you can run the following command in linux `openssl rand -hex 32` or visit the following [page](https://generate-secret.now.sh/32).

#### Without Docker
Prerequisites
You will need [node.js](https://nodejs.org/es/) & [npm](https://www.npmjs.com/)
```
# 1. Clone the repository
git clone https://github.com/Hec7or-Uni/CoGS.git
# 2. Install the dependencies with:
npm install
# 3. Run the project:
npm run build
npm run start
```
#### Docker Compose
```
docker-compose up
```
#### Without Docker Compose
```
# Build images
docker build --tag nextjs-image .
docker build --tag nginx-image ./nginx

# Create shared network
docker network create my-network

# Run containers
docker run --network my-network --name nextjs-container nextjs-image
docker run --network my-network --link nextjs-container:nextjs --publish 80:80 nginx-image
```

## Features
#### Find people as motivated as you are
In the site, you will be able to find people with skills that complement your own so that if you are smart you can create a competitive team to grow your idea. 

#### Develop your idea with a good team
If you are not yet inspired, you can always join a team to start creating and developing ideas, maybe you see it as wasting your time on someone else's idea, but, think that the time you spend with your teammates you can learn from them.
