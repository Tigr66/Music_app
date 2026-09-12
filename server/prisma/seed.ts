import { prisma } from "../src/lib/prisma";
import { StorageService } from "../src/services/storage.service";

const hashPassword = (password: string) => {
    const bcrypt = require("bcrypt");
    return bcrypt.hashSync(password, 10);
};

const storageService = new StorageService();

async function main() {
    const tigrgareev = await prisma.user.create({
        data: {
            username: "tigrgareev",
            password: hashPassword("tigrgareev"),
            role: "USER",
        },
    });

    const super_user = await prisma.user.create({
        data: {
            username: "super_user",
            password: hashPassword("super_user"),
            role: "ADMIN",
        },
    });

    const ARTISTS = [
        {
            key: "drake",
            name: "Drake",
            info: "Canadian rapper and singer",
            photoPath: "../uploads/artists/drake.jpg",
            userId: tigrgareev.id,
        },
        {
            key: "travis",
            name: "Travis Scott",
            info: "American rapper and producer",
            photoPath: "../uploads/artists/travis_scott.jpg",
            userId: tigrgareev.id,
        },
        {
            key: "nirvana",
            name: "Nirvana",
            info: "American rock band",
            photoPath: "../uploads/artists/nirvana.jpg",
            userId: tigrgareev.id,
        },
    ];

    const artistMap: Record<string, string> = {};

    for (const artist of ARTISTS) {
        const { key, photoPath, ...data } = artist;

        const photoKey = await storageService.uploadFromPath({
            filePath: photoPath,
            contentType: "image/jpeg",
            folder: "artists",
        });

        const created = await prisma.artist.create({
            data: {
                ...data,
                photo: photoKey,
                isPublished: true,
            },
        });

        artistMap[key] = created.id;
    }

    const ALBUMS = [
        {
            key: "scorpion",
            artistKey: "drake",
            title: "Scorpion",
            coverPath: "../uploads/albums/scorpion.jpg",
            publishedAt: "2018-06-29",
            userId: tigrgareev.id,
        },
        {
            key: "utopia",
            artistKey: "travis",
            title: "Utopia",
            coverPath: "../uploads/albums/utopia.jpg",
            publishedAt: "2023-07-28",
            userId: tigrgareev.id,
        },
        {
            key: "astroworld",
            artistKey: "travis",
            title: "Astroworld",
            coverPath: "../uploads/albums/astroworld.jpg",
            publishedAt: "2018-08-03",
            userId: super_user.id,
        },
        {
            key: "in_utero",
            artistKey: "nirvana",
            title: "In Utero",
            coverPath: "../uploads/albums/in_utero.jpg",
            publishedAt: "1993-09-13",
            userId: super_user.id,
        },
    ];

    const albumsMap: Record<string, string> = {};

    for (const album of ALBUMS) {
        const { key, coverPath, artistKey, publishedAt, ...data } = album;

        const coverKey = await storageService.uploadFromPath({
            filePath: coverPath,
            contentType: "image/jpeg",
            folder: "albums",
        });

        const created = await prisma.album.create({
            data: {
                ...data,
                cover: coverKey,
                artistId: artistMap[artistKey]!,
                publishedAt: new Date(publishedAt),
                isPublished: true,
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
            userId: tigrgareev.id,
        },
        {
            key: "in_my_feelings",
            albumKey: "scorpion",
            title: "In My Feelings",
            duration: 217,
            youtubeUrl:
                "https://www.youtube.com/embed/SD1tkI5-3dI?autoplay=1&mute=1",
            number: 2,
            userId: tigrgareev.id,
        },
        {
            key: "nonstop",
            albumKey: "scorpion",
            title: "Nonstop",
            duration: 238,
            youtubeUrl:
                "https://www.youtube.com/embed/QVqS3tB8OtE?autoplay=1&mute=1",
            number: 3,
            userId: super_user.id,
        },
        {
            key: "emotionless",
            albumKey: "scorpion",
            title: "Emotionless",
            duration: 302,
            youtubeUrl:
                "https://www.youtube.com/embed/w4MSbajRs_Y?autoplay=1&mute=1",
            number: 4,
            userId: super_user.id,
        },
        {
            key: "sicko_mode",
            albumKey: "utopia",
            title: "SICKO MODE",
            duration: 312,
            youtubeUrl:
                "https://www.youtube.com/embed/d-JBBNg8YKs?autoplay=1&mute=1",
            number: 1,
            userId: super_user.id,
        },
        {
            key: "fein",
            albumKey: "utopia",
            title: "FE!N",
            duration: 200,
            youtubeUrl:
                "https://www.youtube.com/embed/B9synWjqBn8?autoplay=1&mute=1",
            number: 2,
            userId: super_user.id,
        },
        {
            key: "stargazing",
            albumKey: "astroworld",
            title: "STARGAZING",
            duration: 270,
            youtubeUrl:
                "https://www.youtube.com/embed/2a8PgqWrc_4?autoplay=1&mute=1",
            number: 1,
            userId: super_user.id,
        },
        {
            key: "carousel",
            albumKey: "astroworld",
            title: "CAROUSEL",
            duration: 180,
            youtubeUrl:
                "https://www.youtube.com/embed/qe-gnV-lvfE?autoplay=1&mute=1",
            number: 2,
            userId: tigrgareev.id,
        },
        {
            key: "heart_shaped_box",
            albumKey: "in_utero",
            title: "Heart-Shaped Box",
            duration: 281,
            youtubeUrl:
                "https://www.youtube.com/embed/n6P0SitRwy8?autoplay=1&mute=1",
            number: 1,
            userId: tigrgareev.id,
        },
    ];

    const tracksMap: Record<string, string> = {};

    for (const track of TRACKS) {
        const { key, albumKey, ...data } = track;

        const created = await prisma.track.create({
            data: {
                ...data,
                albumId: albumsMap[albumKey]!,
                isPublished: true,
            },
        });

        tracksMap[key] = created.id;
    }

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
