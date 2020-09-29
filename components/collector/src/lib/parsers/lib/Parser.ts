import {IGameMetadata, IGetAchievementsConfig} from '../../../types';

const path = require('path');

abstract class Parser {
    protected achievementWatcherRootPath: string = path.join(<string>process.env['APPDATA'],
        'Achievement Watcher');

    // TODO CHECK THAT CONFIG
    abstract async getAchievements(config: IGetAchievementsConfig): Promise<any>;

    abstract async getGameData(appId: string, lang?: string, key?: string): Promise<any>;

    abstract async scan(): Promise<IGameMetadata[]>;
}

export = {Parser};