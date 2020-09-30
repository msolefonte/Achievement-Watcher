import {IGameData, IGameMetadata, IUnlockedAchievement/*, IGetAchievementsConfig*/} from '../../../types';

interface Parser {
    getAchievements(gameFolder: string/*config: IGetAchievementsConfig*/): Promise<IUnlockedAchievement[]>;

    getGameData(appId: string, lang?: string, key?: string): Promise<IGameData>;

    scan(additionalFoldersToScan: string[]): Promise<IGameMetadata[]>;
}

export {Parser};