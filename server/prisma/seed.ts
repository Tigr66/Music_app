import { prisma } from "../src/lib/prisma";

async function main() {
    const ARTISTS = [
        {
            key: "drake",
            name: "Drake",
            info: "Canadian rapper and singer",
            photo: "/uploads/artists/484b47a1-be98-4195-a499-cf444e20ea72.jpg",
        },
        {
            key: "travis",
            name: "Travis Scott",
            info: "American rapper and producer",
            photo: "/uploads/artists/9e1210a2-472b-4a2b-b6e4-31d98842e70b.jpg",
        },
        {
            key: "nirvana",
            name: "Nirvana",
            info: "American rock band",
            photo: "/uploads/artists/ad80e08339c8cf5a005d267aab74ef64.jpg",
        },
    ];

    const artistMap: Record<string, number> = {};

    for (const artist of ARTISTS) {
        const { key, ...data } = artist;

        const created = await prisma.artist.create({
            data,
        });

        artistMap[key] = created.id;
    }

    const ALBUMS = [
        {
            key: "scorpion",
            artistKey: "drake",
            title: "Scorpion",
            cover: "/uploads/albums/309b36b3-de80-4129-9043-33a9c0ea44bc.jpg",
            publishedAt: "2018-06-29",
        },
        {
            key: "utopia",
            artistKey: "travis",
            title: "Utopia",
            cover: "/uploads/albums/6e0a7aea-e49f-4b01-844a-2b52b2f6f162.jpg",
            publishedAt: "2023-07-28",
        },
        {
            key: "astroworld",
            artistKey: "travis",
            title: "Astroworld",
            cover: "/uploads/albums/6513a1f1079b2faddd422c10260d44b8.jpg",
            publishedAt: "2018-08-03",
        },
        {
            key: "in_utero",
            artistKey: "nirvana",
            title: "In Utero",
            cover: "/uploads/albums/a3295dd270a855acd8b89b8fbc3dba2e.jpg",
            publishedAt: "1993-09-13",
        },
    ];

    const albumsMap: Record<string, number> = {};

    for (const album of ALBUMS) {
        const { key, artistKey, publishedAt, ...data } = album;

        const created = await prisma.album.create({
            data: {
                ...data,
                artistId: artistMap[artistKey]!,
                publishedAt: new Date(publishedAt),
            },
        });

        albumsMap[key] = created.id;
    }

    const TRACKS = [
        {
            key: "gods_plan",
            albumKey: "scorpion",
            title: "God's Plan",
            duration: 198,
            youtubeUrl:
                "https://www.youtube.com/embed/m1a_GqJf02M?autoplay=1&mute=1",
            number: 1,
        },
        {
            key: "in_my_feelings",
            albumKey: "scorpion",
            title: "In My Feelings",
            duration: 217,
            youtubeUrl:
                "https://www.youtube.com/embed/SD1tkI5-3dI?autoplay=1&mute=1",
            number: 2,
        },
        {
            key: "nonstop",
            albumKey: "scorpion",
            title: "Nonstop",
            duration: 238,
            youtubeUrl:
                "https://www.youtube.com/embed/QVqS3tB8OtE?autoplay=1&mute=1",
            number: 3,
        },
        {
            key: "emotionless",
            albumKey: "scorpion",
            title: "Emotionless",
            duration: 302,
            youtubeUrl:
                "https://www.youtube.com/embed/w4MSbajRs_Y?autoplay=1&mute=1",
            number: 4,
        },
        {
            key: "sicko_mode",
            albumKey: "utopia",
            title: "SICKO MODE",
            duration: 312,
            youtubeUrl:
                "https://www.youtube.com/embed/d-JBBNg8YKs?autoplay=1&mute=1",
            number: 1,
        },
        {
            key: "fein",
            albumKey: "utopia",
            title: "FE!N",
            duration: 200,
            youtubeUrl:
                "https://www.youtube.com/embed/B9synWjqBn8?autoplay=1&mute=1",
            number: 2,
        },
        {
            key: "stargazing",
            albumKey: "astroworld",
            title: "STARGAZING",
            duration: 270,
            youtubeUrl:
                "https://www.youtube.com/embed/2a8PgqWrc_4?autoplay=1&mute=1",
            number: 1,
        },
        {
            key: "carousel",
            albumKey: "astroworld",
            title: "CAROUSEL",
            duration: 180,
            youtubeUrl:
                "https://www.youtube.com/embed/qe-gnV-lvfE?autoplay=1&mute=1",
            number: 2,
        },
        {
            key: "heart_shaped_box",
            albumKey: "in_utero",
            title: "Heart-Shaped Box",
            duration: 281,
            youtubeUrl:
                "https://www.youtube.com/embed/n6P0SitRwy8?autoplay=1&mute=1",
            number: 1,
        },
    ];

    const tracksMap: Record<string, number> = {};

    for (const track of TRACKS) {
        const { key, albumKey, ...data } = track;

        const created = await prisma.track.create({
            data: {
                ...data,
                albumId: albumsMap[albumKey]!,
            },
        });

        tracksMap[key] = created.id;
    }

    const tigrgareev = await prisma.user.create({
        data: {
            username: "tigrgareev",
            password:
                "$2b$10$DS6myfA16yZ.pGvkSyqNsuHEwet56jCev48VVnzqEEZaEPwouVhYK",
            token: "pnm0R_eFcZF5QPunVTca0",
        },
    });

    const super_user = await prisma.user.create({
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
                userId: tigrgareev.id,
                trackId: tracksMap.heart_shaped_box!,
            },
            {
                userId: super_user.id,
                trackId: tracksMap.carousel!,
            },
            {
                userId: tigrgareev.id,
                trackId: tracksMap.stargazing!,
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
