// @ts-ignore
import {IGameData, IGameMetadata} from '../types';


// const { Codex } = require('./plugin/codex')
const { Skidrow } = require('./plugin/skidrow')
const { Reloaded } = require('./plugin/reloaded')

//******************************************************************************
//************************************CODEX*************************************
//******************************************************************************

// const codex = new Codex();
//
// codex.scan().then((res: IGameMetadata) => console.log(res));
// codex.getGameData('382900', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// codex.getGameData('779340', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// codex.getGameData('814380', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// codex.getAchievements('C:/Users/Marc/AppData/Roaming/Steam/CODEX/382900')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });
// codex.getAchievements('C:/Users/Public/Documents/Steam/CODEX/779340')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });
// codex.getAchievements('C:/Users/Public/Documents/Steam/CODEX/814380')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });

//******************************************************************************
//***********************************SKIDROW************************************
//******************************************************************************

// const skidrow = new Skidrow();
//
// skidrow.scan().then((res: IGameMetadata) => console.log(res));
// codex.getGameData('382900', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// codex.getGameData('779340', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// codex.getGameData('814380', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// codex.getAchievements('C:/Users/Marc/AppData/Roaming/Steam/CODEX/382900')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });
// codex.getAchievements('C:/Users/Public/Documents/Steam/CODEX/779340')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });
// codex.getAchievements('C:/Users/Public/Documents/Steam/CODEX/814380')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });

//******************************************************************************
//***********************************SKIDROW************************************
//******************************************************************************

const reloaded = new Reloaded();

// reloaded.scan().then((res: IGameMetadata) => console.log(res));
// reloaded.getGameData('292730', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// reloaded.getGameData('311210', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// reloaded.getGameData('312750', 'english', undefined).then((res: IGameData) => {
//     console.log(res);
// });
// reloaded.getAchievements('C:/ProgramData/Steam/Player/292730')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });
reloaded.getAchievements('C:/ProgramData/Steam/RLD!/311210')
    .then((res: any) => {
        console.log(res);
    }).catch((res: any) => {
    console.log(res);
});
// reloaded.getAchievements('C:/ProgramData/Steam/RLD!/312750')
//     .then((res: any) => {
//         console.log(res);
//     }).catch((res: any) => {
//     console.log(res);
// });