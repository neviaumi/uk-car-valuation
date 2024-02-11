import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddGameToLibraryArgs } from './dto/add-game-to-library.args';
import { GetGameArgs } from './dto/get-game.args';
import { GetGameListArgs } from './dto/get-game-list.args';
import { UploadGameBoxArtArgs } from './dto/upload-game-box-art.args';
import { GameService } from './game.service';
import { Game, GameList } from './models/game.model';
import { PrepareUpload } from './models/prepare-upload.model';

@Resolver(() => Game)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query(() => GameList)
  async gameList(@Args() where: GetGameListArgs): Promise<GameList> {
    const games = await this.gameService.fineGamesList(where);
    return games;
  }

  @Query(() => Game)
  async game(@Args() args: GetGameArgs) {
    return this.gameService.fineGame(args.id);
  }

  @Mutation(() => PrepareUpload)
  async prepareUploadGameBoxArt(@Args() args: UploadGameBoxArtArgs) {
    return await this.gameService.preSignUploadBoxArtUrl(args);
  }

  @Mutation(() => Game)
  async addGameToLibrary(@Args('data') args: AddGameToLibraryArgs) {
    const createdGame = await this.gameService.createGame(args);
    return createdGame;
  }
}
