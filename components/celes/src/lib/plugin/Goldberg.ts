// TODO

'use strict';

import {IUnlockedAchievement} from '../../types';

// @ts-ignore
import {SteamEmulatorParser} from './lib/SteamEmulatorParser';

const omit = require('lodash.omit');
const path = require('path');

class Codex extends SteamEmulatorParser {
    private readonly publicDataPath: string = <string>process.env['Public'];
    private readonly appDataPath: string = <string>process.env['APPDATA'];

    constructor() {
        super();
    }

    normalizeUnlockedAchievementList(achievementList: any): IUnlockedAchievement[] {
        const unlockedAchievementList: IUnlockedAchievement[] = [];

        const filter: string[] = ['SteamAchievements', 'Steam64', 'Steam'];
        achievementList = omit(achievementList.ACHIEVE_DATA || achievementList, filter);

        Object.keys(achievementList).forEach((achievementName) => {
            const achievementData: any = achievementList[achievementName];

            let currentProgress: number, maxProgress: number;
            if (Number.parseInt(achievementData.MaxProgress) === 0) {
                currentProgress = 0;
                maxProgress = 0;
            } else {
                currentProgress = Math.floor(Number.parseFloat(achievementData.CurProgress) /
                    Number.parseFloat(achievementData.MaxProgress) * 100);
                maxProgress = 100;
            }

            unlockedAchievementList.push({
                name: achievementName,
                achieved: <0 | 1>+(achievementData.Achieved === '1'),
                currentProgress: currentProgress,
                maxProgress: maxProgress,
                unlockTime: achievementData.UnlockTime,
            });
        });

        return unlockedAchievementList;
    }

    getSpecificFoldersToScan(): string[] {
        return [
            path.join(this.publicDataPath, 'Documents/Steam/CODEX'),
            path.join(this.appDataPath, 'Steam/CODEX')
        ];
    }
}

export {Codex};