*GetPlayerSummaries (v0002)*
Example URL: http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=XXXXXXXXXXXXXXXXXXXXXXX&steamids=76561197960435530

Public Data

# steamid
64bit SteamID of the user

# personaname
The full URL of the player's Steam Community profile.

# avatar
The full URL of the player's 32x32px avatar. If the user hasn't configured an avatar, this will be the default ? avatar.

# avatarmedium
The full URL of the player's 64x64px avatar. If the user hasn't configured an avatar, this will be the default ? avatar.

# avatarfull
The full URL of the player's 184x184px avatar. If the user hasn't configured an avatar, this will be the default ? avatar.

# personastate
The user's current status. 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play. If the player's profile is private, this will always be "0", except is the user has set their status to looking to trade or looking to play, because a bug makes those status appear even if the profile is private.

# communityvisibilitystate
This represents whether the profile is visible or not, and if it is visible, why you are allowed to see it. Note that because this WebAPI does not use authentication, there are only two possible values returned: 1 - the profile is not visible to you (Private, Friends Only, etc), 3 - the profile is "Public", and the data is visible. Mike Blaszczak's post on Steam forums says, "The community visibility state this API returns is different than the privacy state. It's the effective visibility state from the account making the request to the account being viewed given the requesting account's relationship to the viewed account."

# profilestate
If set, indicates the user has a community profile configured (will be set to '1')

# lastlogoff
The last time the user was online, in unix time.

# commentpermission
If set, indicates the profile allows public comments.

*******************************************************************************


# GetPlayerAchievements (v0001)
**Returns a list of achievements for this user by app id**

Example URL: http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328

## Arguments
## 
steamid
64 bit Steam ID to return friend list for.

## appid

The ID for the game you're requesting
l (Optional)
Language. If specified, it will return language data for the requested language.

# Result data

A list of achievements.

## apiname

The API name of the achievement
achieved
Whether or not the achievement has been completed.

## unlocktime

Date when the achievement was unlocked.
name (optional)
Localized achievement name
description (optional)
Localized description of the achievement