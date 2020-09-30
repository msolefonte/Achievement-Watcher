'use strict';

import {IGameData, IGameMetadata, ISteamLanguage, IUnlockedAchievement} from '../../../types';
// @ts-ignore
import {Parser} from './Parser';
import {SteamUtils} from './SteamUtils';

const glob = require('fast-glob');
const path = require('path');
const steamLanguages = require('../../../../locale/steam.json');

// TODO CHECK LOGS / THROWS

abstract class SteamEmulatorParser implements Parser {
    abstract normalizeUnlockedAchievementList(achievementList: any): IUnlockedAchievement[];

    abstract getSpecificFoldersToScan(): string[];

    async scan(additionalFoldersToScan: string[] = []): Promise<IGameMetadata[]> {
        // TODO THIS BLOCK IS GENERAL
        const specificFoldersToScan: string[] = this.getSpecificFoldersToScan();
        const foldersToScan: string[] = await SteamUtils.getFoldersToScan(specificFoldersToScan, additionalFoldersToScan);

        const gamesMetadata: IGameMetadata[] = [];
        for (let dir of await glob(foldersToScan, {onlyDirectories: true, absolute: true})) {

            const gameMetadata: IGameMetadata = {
                appId: path.parse(dir).name,
                data: {
                    type: 'file',
                    path: dir
                }
            };

            // TODO THIS BLOCK IS GENERAL
            if (dir.includes('CODEX')) {
                gameMetadata.source = 'Codex';
            } else if (dir.includes('Goldberg')) {
                gameMetadata.source = 'Goldberg';
            } else if (dir.includes('SKIDROW')) {
                gameMetadata.source = 'Skidrow';
            } else if (dir.includes('SmartSteamEmu')) {
                gameMetadata.source = 'SmartSteamEmu';
            } else if (dir.includes('ProgramData/Steam')) {
                gameMetadata.source = 'Reloaded - 3DM';
            } else if (dir.includes('CreamAPI')) {
                gameMetadata.source = 'CreamAPI';
            }

            gamesMetadata.push(gameMetadata);
        }

        return gamesMetadata;
    }

    async getGameData(appId: string, lang: string, key?: string | undefined): Promise<IGameData> {
        if (!steamLanguages.some((language: ISteamLanguage) => {
            return language.api === lang;
        })) {
            throw 'Unsupported API language code';
        }

        // @ts-ignore TODO FIXME PATCH FOR TS
        const keyUsage = key;

        let gameData: IGameData;
        const gameCachePath = SteamUtils.getGameCachePath(appId, lang);

        if (await SteamUtils.validSteamGameDataCacheExists(gameCachePath)) {
            gameData = await SteamUtils.getGameDataFromCache(gameCachePath);
        } else {
            // if (key) {
            // TODO DEBATE WITH ANTHONY
            //     gameData = await SteamUtils.getGameDataUsingOwnApiKey(appId, lang, key);
            // } else {
            gameData = await SteamUtils.getGameDataFromServer(appId, lang);
            // }
            await SteamUtils.updateGameDataCache(gameCachePath, gameData);
        }

        return gameData;
    }

    async getAchievements(gameFolder: string): Promise<IUnlockedAchievement[]> {
        const achievementList: Object = await SteamUtils.getAchievementListFromGameFolder(gameFolder);
        return this.normalizeUnlockedAchievementList(achievementList);
    }
}

export {SteamEmulatorParser};