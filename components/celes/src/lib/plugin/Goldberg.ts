'use strict';

import {IUnlockedAchievement} from '../../types';

// @ts-ignore
import {SteamEmulatorParser} from './lib/SteamEmulatorParser';

const path = require('path');

class Goldberg extends SteamEmulatorParser {
    readonly source: string = 'Goldberg';

    private readonly appDataPath: string = <string>process.env['APPDATA'];

    constructor() {
        super();
    }

    // TODO
    normalizeUnlockedAchievementList(achievementList: any): IUnlockedAchievement[] {
        const unlockedAchievementList: IUnlockedAchievement[] = [];

        console.log(achievementList);

        return unlockedAchievementList;
    }

    getSpecificFoldersToScan(): string[] {
        return [
            path.join(this.appDataPath, 'Goldberg SteamEmu Saves')
        ];
    }
}

export {Goldberg};