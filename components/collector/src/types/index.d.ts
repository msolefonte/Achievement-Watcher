export interface IGameMetadata {
    appId: string;
    data: {
        type: "file" | "steamAPI";
        cachePath?: string;
        path?: string;
        userId?: ISteamUser;
    }
    source?: string;
}

export interface ILegitSteamGameMetadata {
    userId: string;
    appId: string;
}

export interface ISteamLanguage {
    displayName: string;
    api: string;
    webapi: string;
    native: string;
    iso?: string;
}

export interface ISteamUser {
    user: string;
    id: string;
    name: string;
}

export interface IGetAchievementsConfig {

}

export interface IAchievement {

}

// TODO WHEN USE GAME DATA AND GAME METADATA
export interface IGameData {
    appId: string;
    binary: string;
    img: {
        header: string;
        background: string;
        icon: string;
    }
    achievements: {
        total: number;
        list: IAchievement[]; // TODO Check
    }
}