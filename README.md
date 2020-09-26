# Achievement Watcher

A sexy achievement file parser with real-time notification.

## Description

View every achievement earned on your PC in a clean and beautiful way wherever it comes from.

|![](docs/media/home.png)|![](docs/media/ach_view.png)|
|---|---|

Full compatibility list available [here](./docs/compatibility.md).

## Installation

TBD

## Usage

TBD

### Notifications

----------

View every achievement earned on your PC whether it's coming from Steam, a Steam emulator, and more.<br />
To see the full list of what this app can import please see the [**Compatibility**](https://github.com/xan105/Achievement-Watcher#compatibility-) section.

<table >
<tr>
<td align="left"><img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/home.png" width="400px"></td>
<td align="left"><img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/ach_view.png" width="400px"></td>
</tr>
</table>

The original idea behind this app was that some steam emulators generate a text file where your unlocked achievements are stored. 
But they aren't very friendly to know which is which, here is an example :
```ini
[NEW_ACHIEVEMENT_1_1]
Achieved=1
CurProgress=0
MaxProgress=0
UnlockTime=0000000000
[SteamAchievements]
00000=NEW_ACHIEVEMENT_1_1
Count=1
```
So which achievement is NEW_ACHIEVEMENT_1_1 ? You'll have to ask the steam API or look online in a site like the steamdb to find out.
So let's just do that automagically :)

Notification on achievement unlocking
==========================================

Not as sexy as a directX Overlay but it's the next best thing.<br />
Display a Windows toast notification when you unlock an achievement.<br />
⚠️ **Please verify your Windows notification and focus assistant settings for the toast to work properly**.<br />
You can test notification in Settings > Debug to make sure your system is correctly configured.

<p align="center">
  <img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/live.gif">
</p>

There might be a slight delay between the event and the display of the notification when running powershell and loading a remote image can take a few seconds in some cases.<br />

Game must be set to Window borderless for the notification to be rendered on top of it.<br />

If you have enabled the *souvenir* option a screenshot will be taken<br />
and saved in your pictures folder `"Pictures\[Game Name]\[Game Name] - [Achievement Name].png"`<br />

### 🚑 Not seeing any toast notification ? Quick fix :
- Try to set your game to Window borderless.
- Try to disable the automatic game **and** fullscreen rule in focus assistant (Win10)<br/>
  or set them to priority and make sure that the UWP appID you are using is in your priority list (By default the Xbox appID(s) used by this app are in it).
- Try to set checkIfProcessIsRunning to false in `%AppData%\Achievement Watcher\cfg\options.ini`

Windows 8.1 : Don't forget quiet hours.<br />
Windows 10 >= 1903 : New focus assist auto rule for fullscreen app set to alarm only by default prevents the notification from working out of the box.

The process `watchdog.exe` is the one doing all the work so make sure it is running.

Not all games are supported, please see the compatibility section below.

<hr>

You can also display a notification with:
  - [Websocket](https://github.com/xan105/Achievement-Watcher#Websocket)
  - [Growl Notification Transport Protocol](https://github.com/xan105/Achievement-Watcher#GNTP)

Options
=======
Options are stored in ```%AppData%\Achievement Watcher\cfg\options.ini``` but most of them are configurable via the GUI<br />

### [achievement]

- lang<br />
  default to user locale<br />
  Both UI and data from Steam.<br />
  
- showHidden<br />
  default to false<br />
  Wether or not show hidden achievements if any.<br />
  
- mergeDuplicate<br />
  default to true<br />
  Try to merge multiple achievement source for the same game.<br />
  
- timeMergeRecentFirst<br/>
  default to false<br />
  When merging duplicates, show the most recent timestamp instead of the oldest.
  
- hideZero<br />
  default to false<br />
  Hide 0% Game.<br />
  
- thumbnailPortrait<br />
  default to false<br />
  Game thumbnail orientation: classic or portrait mode (Like the new Steam UI)
  
### [achievement_source]

- legitSteam<br />
  default to 0<br />
  Steam games : (0) none / (1) installed / (2) owned.<br />
  
- steamEmu<br />
  default to true<br />
  Import Steam Emu achievements
  
- greenLuma<br />
  default to true<br />
  Import GreenLuma achievements stored in the registry
  
- rpcs3<br />
  default to true<br />
  Import RPCS3 trophies
  
- lumaPlay<br />
  default to false<br />
  Import lumaPlay achievements
 
- importCache<br /> 
  default to true<br />
  Import Watchdog's (Notification) cache as another source of achievement<br />
  Use this(true) + mergeDuplicate(true) + timeMergeRecentFirst(false) to correct/fix most SteamEmu quirks 
  
### [notification]

- notify<br />
  default to true<br />
  Notify on achievement unlocking if possible. <br />
  (`AchievementWatcher.exe` doesn't need to be running for this, but `watchdog.exe` does).<br />
  
- souvenir<br />
  default to true<br />
  Take a screenshot when you unlock an achievement in<br />
  `"Pictures\[Game Name]\[Game Name] - [Achievement Name].png"`<br />
 
- showDesc<br />
  default to false<br />
  Show achievement description if any.<br />
  
- rumble<br />
  default to true<br />
  Vibrates first xinput controller when unlocking an achievement.<br />
  
- notifyOnProgress<br />
  default to true<br />
  Notify on achievement progress when possible.<br />
  
  <p align="center">
    <img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/ach_progress.png" width="800px">
  </p>
  
### [notification_toast]
  
- customToastAudio<br />
  default to 1<br />
  Specifies the sound to play when a toast notification is displayed.<br />
  (0) disable-muted / (1) System default / (2) Custom sound specified by user<br />
  
- toastSouvenir<br />
  default to 0<br />
  Display souvenir screenshot inside the toast (Win10 only).<br />
  (0) disable / (1) header (image crop) / (2) footer (image resized to fit) <br />
  <br />
  Example:
  
  <table >
  <tr>
  <td align="center">header</td>
  <td align="center">footer</td>
  </tr> 
  <tr>
  <td align="left"><img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/toastedSouvenir_header.gif" width="400px"></td>
  <td align="left"><img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/toastedSouvenir_footer.gif" width="400px"></td>
  </tr>
  </table>
  
  Both will show the screenshot within their toast in the action center if there is enough space.<br />
  Otherwise there will be an arrow to show/hide (collapse).<br />
  
- groupToast<br />
  default to false<br />
  Group toast by game within the Action Center

### [notification_transport]
  
- toast <br />
  default to true<br />
  Use powershell to create a Windows 8-10 toast notification.<br />
  
- winRT <br /> 
  default to true<br />
  Use Windows 10 WinRT API if available for faster toast instead of PowerShell.<br />
  
- balloon <br /> 
  default to true<br />
  Fallback to balloon tooltip on toast notification failure.<br />
  
- websocket<br />
  default to true<br />
  Broadcast achievement to all connected clients<br />
  [More info](https://github.com/xan105/Achievement-Watcher#Websocket)
  
- gntp <br />
  default to true<br />
  Send a gntp@localhost:23053 if available.<br />
  [More info](https://github.com/xan105/Achievement-Watcher#GNTP)
  
### [notification_advanced]

👮 Change these values only if you know what you are doing.<br />

- timeTreshold<br />
  default to 10 (sec)<br />
  Amount of sec an achievement is considered achieved from its timestamp value before being discarded.<br />
  
- checkIfProcessIsRunning<br />
  default to true<br />
  When an achievement file is modified; Wether to check or not if the corresponding game is running and responding.<br />
  <br />
  Both options are mainly there to mitigate false positive.<br />
  
- tick<br />
  default to 600 (ms)<br />
  Ignore file modification within specified timeframe to prevent spam of notification when a game triggers multiple file write at the same time.<br />
  Set it to 0 to disable this feature.<br />
  
- iconPrefetch<br />
  default to true<br />
  If set to false notification icon is passed as an url.<br />
  It is the underlying transport system responsability to handle the download / cache of said icon.<br />
  _For example you can see information of notification assets cached by the Windows notification system in the registry under `HKCU\Software\Microsoft\Windows\CurrentVersion\PushNotifications\wpnidm`_
  
  In some rare cases it can fail, time out, etc... resulting in a notification without any icon.
  
  <p align="center">
    <img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/notification_no_icon.png" width="360px">
  </p>
  
  To work around this you can set this option to *true* and watchdog will handle the download and cache by itself and will pass the file path instead of the url.
  
  Icons will be cached in `%appdata%\Achievement Watcher\steam_cache\icon\[appid]`
  
  When this option is set to true there will be an additional context menu 'Build icon notification cache' available in Achievement Watcher.
  Use this if you would like to download every game's icons beforehand.
  
- appID<br />
  if not set, default to Xbox Game Bar if available otherwise to Xbox App<br />
  Notification appID ([Application User Model ID](https://docs.microsoft.com/fr-fr/windows/desktop/shell/appids)).<br />
  Example: 
  
  |Name| AppID |
  |----|-------|
  |Xbox Game Bar|Microsoft.XboxGamingOverlay_8wekyb3d8bbwe!App |
  |Xbox App| Microsoft.XboxApp_8wekyb3d8bbwe!Microsoft.XboxApp |
  |Xbox App (Win 8)| microsoft.XboxLIVEGames_8wekyb3d8bbwe!Microsoft.XboxLIVEGames |
  
  ⚠️ You need to use a UWP AppID otherwise you won't be able to remotely load ach. img.
  
  Watchdog is by default using Xbox AppID(s) for three main reasons :
    + They are pre-shipped with Windows
    + They are pre-set to your focus assistant priority list
    + They are UWP app so we are allowed to remotely load img.
  
Steam Web API Key
=================
Some use of the Steam Web API to fetch data from Steam requires the use of an API Key.<br />
If you leave the field blank in the settings section, it will automagically fetch said data.<br />

<p align="center">
<img src="https://github.com/xan105/Achievement-Watcher/raw/master/screenshot/settings.png" width="600px">
</p>

An example of a server that feeds you the data is provided within this repo.<br />
This service is **not** guarantee over time and is solely provided for your own convenience.<br />
If you experience any issues please use your own Steam Web API key.<br />              
                
You can acquire one [by filling out this form](https://steamcommunity.com/dev/apikey).<br />
Use of the APIs also requires that you agree to the [Steam API Terms of Use](https://steamcommunity.com/dev/apiterms).<br />

Websocket
=========

Endpoint: `ws://localhost:8082`

You can for example use this to create your own notification in an OBS browser source and the like for your streaming needs.

Achievement data are broadcasted to all connected websocket clients.<br />
There is a 30sec ping/pong but normally it's handled by the browser so you shouldn't have to add code for it.<br />

To help you there is a test command to send a dummy valid notification.
```js
//Example

const ws = new WebSocket("ws://localhost:8082");
ws.onopen = (evt) => { 
  ws.send(JSON.stringify({cmd:"test"})); //dummy is only send to the client making the request
  
  ws.send(JSON.stringify({
    cmd:"test",
    broadcast: true
 })); //use broadcast option if you need to send the dummy to all connected clients
  
};
ws.onmessage = (evt) => {
  console.log(JSON.parse(evt.data)); //JSON string
  /* Output:
    {
      appID: steam appID,
      title: game name,
      id: achievement id,
      message: achievement title,
      description: achievement description if any,
      icon: unlocked icon url,
      time: timestamp from the Steam emu,
      progress: //if it's a progress and not an unlocked achievement; 
                //Otherwise this property is not sent at all
      { 
          current: current progress,
          max: max progress value
      }
    }  
  */
  ws.close();
};

```
    
GNTP
====

Endpoint: `localhost:23053`

Recommended gntp client is Growl for Windows (despite it being discontinued) [Mirror download link](https://github.com/xan105/Achievement-Watcher/releases/download/1.2.3/Growl.7z)

To customize the look of the toast please kindly see your gntp client's options.<br />
If you are looking for the Achievement Watcher notification sounds they are in `%windir%\Media` (Achievement___.wav)

Command Line Args | URI Scheme
==============================

Args:<br />
`--appid xxx [--name yyy]`<br />

URI:<br />
`ach:--appid xxx [--name yyy]`<br />

xxx is a steam appid<br />
yyy is an optional steam ach id name<br />

After the loading directly display the specified game.<br />
And if specified highlight an achievement.

NB: This is what the toast notification uses in order to be clickable and open the game page highlighting the unlocked achievement.

Translation Help
================

I do my best to translate everything for every supported language by Steam, but it's rather difficult and I don't speak that much languages.
Fluent in another language ? Any help to add/modify/improve would be greatly appreciated.

More details [here](https://github.com/xan105/achievement-watcher/tree/master/app/locale)

Auto-Update
===========

This software auto update itself via Windows scheduled tasks.
There are .cmd files in the root directory to create, delete and manually run the tasks.

File cache & Logs
=================
in ```%AppData%\Achievement Watcher```

How to build
============

### Prequisites:

You will need node.js (>= 12.x), golang (>= 1.12) both with the same arch: in x86 **or** x64.<br/>
Innosetup 5 unicode with preprocessor and [Inno Download Plugin](https://mitrichsoftware.wordpress.com/inno-setup-tools/inno-download-plugin/)<br/>
Golang cgo requires a gcc compiler installed and set in PATH (recommended : http://tdm-gcc.tdragon.net/download).<br/>

For node you globally need asar, json and pkg :<br/>
```
npm install -g asar json pkg
```

There will be some native_module to compile so you'll need :<br/>
VS2017, Python 2.7(node-gyp), and the Windows SDK 10.0.17134.0 (1803 Redstone 4)

### Build:

Install `node_modules` folders with `npm install.cmd`<br/>
Use `buildme.cmd` in the root folder to build.

### Notes: 

+ If pkg fetches a version different than `%userprofile%\.pkg-cache\v2.6\fetched-v12.2.0-win-x64` or you are building this in x86.<br/>
You need to update `service\rcedit-updater.cmd` and `service\rcedit-watchdog.cmd` with the correct one.

+ If you build this in x86 remove these lines in `setup\AchievementWatcher.iss`: <br/>
```
60 ArchitecturesInstallIn64BitMode=x64
61 ArchitecturesAllowed=x64
```

+ Innosetup is expected to be installed in `C:\Program Files (x86)\Inno Setup 5` if that is not the case then update `buildme.cmd` with the correct path.

Legal
=====
Software provided here is to be use at your own risk. This is provided as is without any express or implied warranty.<br />
In no event or circumstances will the authors or company be held liable for any damage to yourself or your computer that may arise from the installation or use of the free software aswell as his documentation that is provided on this website.<br />
And for anything that may occur as a result of your use, or inability to use the materials provided via this website.<br />

Software provided here is purely for informational purposes and does not provide nor encourage illegal access to copyrighted material.<br />

Software provided here is not affiliated nor associated with Steam, © Valve Corporation and data from its API is provided as is without any express or implied warranty.<br />

Software provided here is not affiliated nor associated with Uplay, © Ubisoft and data from its API is provided as is without any express or implied warranty.<br />

Software provided here is not affiliated nor associated with any cracking scene groups.<br />

Other trademarks, copyright are the property of their respective owners. No copyright or trademark infringement is intended by using third-party resources. Except where otherwise specified, the contents of this project is subject to copyright.<br />
