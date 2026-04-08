import { prisma } from "../src/lib/prisma";

async function main() {
    const drake = await prisma.artist.create({
        data: {
            name: "Drake",
            info: "Canadian rapper and singer",
            photo: "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
        },
    });

    const travis = await prisma.artist.create({
        data: {
            name: "Travis Scott",
            info: "American rapper and producer",
            photo: "/uploads/artists/9e1210a2-472b-4a2b-b6e4-31d98842e70b.jpg",
        },
    });

    const album_one = await prisma.album.create({
        data: {
            title: "Scorpion",
            artistId: drake.id,
            cover: "/uploads/albums/309b36b3-de80-4129-9043-33a9c0ea44bc.jpg",
            publishedAt: new Date("2018-06-29"),
        },
    });

    const album_two = await prisma.album.create({
        data: {
            title: "Utopia",
            artistId: travis.id,
            cover: "/uploads/albums/6e0a7aea-e49f-4b01-844a-2b52b2f6f162.jpg",
            publishedAt: new Date("2023-07-28"),
        },
    });

    const track_one = await prisma.track.create({
        data: {
            title: "God's Plan",
            duration: 198,
            albumId: album_one.id,
        },
    });

    const track_two = await prisma.track.create({
        data: {
            title: "In My Feelings",
            duration: 217,
            albumId: album_one.id,
        },
    });

    const track_three = await prisma.track.create({
        data: {
            title: "SICKO MODE",
            duration: 312,
            albumId: album_two.id,
        },
    });

    const track_four = await prisma.track.create({
        data: {
            title: "FE!N",
            duration: 200,
            albumId: album_two.id,
        },
    });

    const user_one = await prisma.user.create({
        data: {
            username: "tigrgareev",
            password: "hashed_password_1",
            token: null,
        },
    });

    const user_two = await prisma.user.create({
        data: {
            username: "super_user",
            password: "hashed_password_2",
            token: null,
        },
    });

    await prisma.trackHistory.createMany({
        data: [
            {
                userId: user_one.id,
                trackId: track_one.id,
            },
            {
                userId: user_one.id,
                trackId: track_three.id,
            },
            {
                userId: user_two.id,
                trackId: track_two.id,
            },
            {
                userId: user_two.id,
                trackId: track_four.id,
            },
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
