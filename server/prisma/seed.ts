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

    const album_three = await prisma.album.create({
        data: {
            title: "Astroworld",
            artistId: travis.id,
            cover: "/uploads/albums/6513a1f1079b2faddd422c10260d44b8.jpg",
            publishedAt: new Date("2018-08-03"),
        },
    });

    const track_one = await prisma.track.create({
        data: {
            title: "God's Plan",
            duration: 198,
            albumId: album_one.id,
            youtubeUrl:
                "https://www.youtube.com/embed/m1a_GqJf02M?autoplay=1&mute=1",
            number: 1,
        },
    });

    const track_two = await prisma.track.create({
        data: {
            title: "In My Feelings",
            duration: 217,
            albumId: album_one.id,
            youtubeUrl:
                "https://www.youtube.com/embed/SD1tkI5-3dI?autoplay=1&mute=1",
            number: 2,
        },
    });

    const track_three = await prisma.track.create({
        data: {
            title: "SICKO MODE",
            duration: 312,
            albumId: album_two.id,
            youtubeUrl:
                "https://www.youtube.com/embed/d-JBBNg8YKs?autoplay=1&mute=1",
            number: 1,
        },
    });

    const track_four = await prisma.track.create({
        data: {
            title: "FE!N",
            duration: 200,
            albumId: album_two.id,
            youtubeUrl:
                "https://www.youtube.com/embed/B9synWjqBn8?autoplay=1&mute=1",
            number: 2,
        },
    });

    const track_five = await prisma.track.create({
        data: {
            title: "Nonstop",
            duration: 238,
            albumId: album_one.id,
            youtubeUrl:
                "https://www.youtube.com/embed/QVqS3tB8OtE?autoplay=1&mute=1",
            number: 3,
        },
    });

    const track_six = await prisma.track.create({
        data: {
            title: "Emotionless",
            duration: 302,
            albumId: album_one.id,
            youtubeUrl:
                "https://www.youtube.com/embed/w4MSbajRs_Y?autoplay=1&mute=1",
            number: 4,
        },
    });

    const track_seven = await prisma.track.create({
        data: {
            title: "STARGAZING",
            duration: 270,
            albumId: album_three.id,
            youtubeUrl:
                "https://www.youtube.com/embed/2a8PgqWrc_4?autoplay=1&mute=1",
            number: 1,
        },
    });

    const track_eight = await prisma.track.create({
        data: {
            title: "CAROUSEL",
            duration: 180,
            albumId: album_three.id,
            youtubeUrl:
                "https://www.youtube.com/embed/qe-gnV-lvfE?autoplay=1&mute=1",
            number: 2,
        },
    });

    const user_one = await prisma.user.create({
        data: {
            username: "tigrgareev",
            password:
                "$2b$10$DS6myfA16yZ.pGvkSyqNsuHEwet56jCev48VVnzqEEZaEPwouVhYK",
            token: "pnm0R_eFcZF5QPunVTca0",
        },
    });

    const user_two = await prisma.user.create({
        data: {
            username: "super_user",
            password:
                "$2b$10$YwviWw9MhgkFo2au6kEk4OWvisbwEeWln7renojqrb9bBzaSv61q2",
            token: null,
        },
    });

    // Пароли такие же как и username для проверки

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
            {
                userId: user_two.id,
                trackId: track_five.id,
            },
            {
                userId: user_two.id,
                trackId: track_six.id,
            },
            {
                userId: user_one.id,
                trackId: track_seven.id,
            },
            {
                userId: user_one.id,
                trackId: track_eight.id,
            },
        ],
    });

    console.log("Successfully added");
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
