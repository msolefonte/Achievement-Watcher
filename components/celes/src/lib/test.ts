import {IGameData, IGameMetadata, IUnlockedAchievement} from '../types';
import {Parser} from './plugin/lib/Parser';

const path = require('path');
const fs = require('fs').promises;

const SYSTEM_LANGUAGE = 'english';

async function scrap(callbackProgress?: Function): Promise<any> {
    const pluginsFolder = path.join(__dirname, 'plugin');
    const scrappedGames: any = [];

    const pluginsFolderFiles: string[] = await fs.readdir(pluginsFolder);
    for (let i = 0; i < pluginsFolderFiles.length; i++) {
        const progressPercentage: number = Math.floor((i / pluginsFolderFiles.length) * 100);

        try {
            if (pluginsFolderFiles[i].endsWith('.js')) {
                const plugin = require('./plugin/' + pluginsFolderFiles[i]);
                const parser: Parser = new plugin[Object.keys(plugin)[0]]();

                const listOfGames: IGameMetadata[] = await parser.scan();

                for (let j = 0; j < listOfGames.length; j++) {
                    const gameData: IGameData = await parser.getGameData(listOfGames[j].appId, SYSTEM_LANGUAGE);
                    const unlockedAchievements: IUnlockedAchievement[] = await parser.getAchievements(listOfGames[j]);

                    const scrappedGame: any = gameData;
                    scrappedGame.achievement.unlocked = unlockedAchievements;

                    scrappedGames.push(scrappedGame);
                }
            }
        } catch (error) {
            // console.debug('Error loading plugin', pluginsFolderFiles[i] + ":", error);
        }

        if (callbackProgress instanceof Function) {
            callbackProgress(progressPercentage);
        }
    }
    return scrappedGames;
}

// Load Local Folder + Scrap. Merge. Update Folder with new data
// async function load(callbackProgress?: Function) {}

// Load. Read Local Folder. Store it in path
// async function export(path: string) {}

// Read path. Read local. If not force, merge with local. Store local
// async function import(path: string, force: boolean = false) {}

scrap().then((foundGames) => {
    console.log(foundGames);
});