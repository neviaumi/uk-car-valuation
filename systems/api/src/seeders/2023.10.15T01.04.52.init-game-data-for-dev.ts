import { promises as fs } from 'node:fs';
import path from 'node:path';

import type { MigrationFn } from 'umzug';

import type { MigrationContext } from '../umzug';

const fixtureRoot = path.join(__dirname, '../../__fixtures__');

export const up: MigrationFn<MigrationContext> = async ({ context }) => {
  const { gameRepository, gameService } = context;
  const seedData = [
    {
      boxArt: 'battlefield-5.png',
      genre: 'FPS',
      id: '81798a55-f816-438b-aad5-d950a465a263',
      name: 'Battlefield 5',
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'EA',
      releaseDate: '2018-11-09',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'devil-may-cry-5.png',
      genre: 'ACTION',
      id: '7c50cbc1-df92-456f-a115-66f5d371dfd3',
      name: 'Devil may cry 5',
      numberOfPlayers: 1,
      platform: 'PS5',
      publisher: 'Capcom',
      releaseDate: '2019-03-08',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'gta-5.png',
      genre: 'RPG',
      id: 'bd737406-e069-40b0-8d4c-4fada0b1cc0b',
      name: 'GTA 5',
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'Rockstar Games',
      releaseDate: '2013-09-17',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'resident-evil-2.png',
      genre: 'ACTION',
      id: 'a1a66864-d19b-48a7-9ac8-e9cb5ab8f32b',
      name: 'Resident evil 2',
      numberOfPlayers: 1,
      platform: 'PS5',
      publisher: 'Rockstar Games',
      releaseDate: '2022-06-13',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'stray.png',
      genre: 'ACTION',
      id: '5ebb308d-4491-4849-93d5-786da31d3499',
      name: 'Stray',
      numberOfPlayers: 1,
      platform: 'PS5',
      publisher: 'Annapurna Interactive',
      releaseDate: '2022-07-19',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'dq-11.png',
      genre: 'RPG',
      id: '488fdbf0-1ffa-44ff-aeea-194e74c63d71',
      name: 'Dragon Quest XI',
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'Square Enix',
      releaseDate: '2017-07-29',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'super-robot-wars-30.png',
      genre: 'STRATEGY',
      id: 'c4e9fadb-6b8e-4b3c-a66f-76178f41eca2',
      name: 'Super Robot Wars 30',
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'Bandai Namco Entertainment',
      releaseDate: '2021-10-28',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'gundam-versus.png',
      genre: 'FIGHTING',
      id: '3957d8f9-7899-4479-876a-b8bbc6b5e61d',
      name: 'Gundam Versus',
      numberOfPlayers: 2,
      platform: 'PS4',
      publisher: 'Bandai Namco Entertainment',
      releaseDate: '2017-07-06',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'spider-man.png',
      genre: 'ACTION',
      id: '5b0dcf4b-2b23-45d9-bb86-83e14c2d568c',
      name: 'Spider man',
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'Sony Interactive Entertainment',
      releaseDate: '2018-09-07',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'god-of-war.png',
      genre: 'ACTION',
      id: '28fdd72e-6971-44bf-9dc5-a862130991fd',
      name: 'God of war',
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'Sony Interactive Entertainment',
      releaseDate: '2018-04-20',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'uncharted-4.png',
      genre: 'ACTION',
      id: 'dd584d7f-8b7a-4aa8-886b-88a504ee1f93',
      name: "Uncharted 4: A Thief's End",
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'Sony Interactive Entertainment',
      releaseDate: '2016-05-10',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
    {
      boxArt: 'gran-turismo-sport.png',
      genre: 'SIM-RACING',
      id: '7af11604-3dc2-401b-809b-60f59970366a',
      name: 'Gran Turismo Sport',
      numberOfPlayers: 1,
      platform: 'PS4',
      publisher: 'Sony Interactive Entertainment',
      releaseDate: '2017-10-18',
      userId: '1ec57d7a-67be-42d0-8a97-07e743e6efbc',
    },
  ];
  for (const item of seedData) {
    const { resultPublicUrl, uploadUrl } =
      await gameService.preSignUploadBoxArtUrl({
        fileName: item.boxArt,
      });
    await fetch(uploadUrl, {
      body: await fs.readFile(path.join(fixtureRoot, item.boxArt)),
      method: 'PUT',
    });
    await gameRepository.save({
      boxArtImageUrl: resultPublicUrl,
      createdAt: new Date().toISOString(),
      genre: item.genre,
      id: item.id,
      name: item.name,
      numberOfPlayers: item.numberOfPlayers,
      platform: item.platform,
      publisher: item.publisher,
      releaseDate: item.releaseDate,
      updatedAt: new Date().toISOString(),
      userId: item.userId,
    });
  }
};
export const down: MigrationFn<MigrationContext> = async ({ context }) => {
  const { gameRepository } = context;
  await Promise.all(
    [
      '81798a55-f816-438b-aad5-d950a465a263',
      '7c50cbc1-df92-456f-a115-66f5d371dfd3',
      'bd737406-e069-40b0-8d4c-4fada0b1cc0b',
      'a1a66864-d19b-48a7-9ac8-e9cb5ab8f32b',
      '5ebb308d-4491-4849-93d5-786da31d3499',
      '488fdbf0-1ffa-44ff-aeea-194e74c63d71',
      'c4e9fadb-6b8e-4b3c-a66f-76178f41eca2',
      '3957d8f9-7899-4479-876a-b8bbc6b5e61d',
      '5b0dcf4b-2b23-45d9-bb86-83e14c2d568c',
      '28fdd72e-6971-44bf-9dc5-a862130991fd',
      'dd584d7f-8b7a-4aa8-886b-88a504ee1f93',
      '7af11604-3dc2-401b-809b-60f59970366a',
    ].map(id => {
      return gameRepository.delete(id);
    }),
  );
};
