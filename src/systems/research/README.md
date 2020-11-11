# Hubs Systems Research

In this directory we're going to add some experimental features for
research. To add a plugin you really just drop it here and include it
in the root `hubs.js` document as a starting point.

## plugins

<<<<<<< HEAD
### research-tourguide

This allows a group of people to automatically follow a player. The
follow can be started from chat via `/tourguide PLAYERNAME` or from
the url with `&tourguide=PLAYERNAME`.  There are a lot of questions
such as:

 * ✅ How far can a guide move before a user teleports to them (how do we
   define a local area). We set this any total movement change > 3.5.
 * ✅ How long a delay to use to catch up to the guide (we don't want to
   teleport at every tick)? This was fixed with the previous setting
   mostly.
 * ✅ How should we scatter people around the guide? People are randomly
   scattered within an interval.
 * We need to enable flying to a teleport location
   
The tourguide chat added code into `message-dispatch.js` and
`./react-components/chat-command-help.js` as well as the i18n
translations.

=======
>>>>>>> 8b50a74dab21e359463f2898037ccb4ef1c8c7e1
### research-logger

This is a client side logger where user location and actions (but not
chat) is sent to a third party server for collection.  This is to
relieve network load on the [janus server](https://bit.ly/3ckvqui
"Discord discussion").  You'll need to set up your own server for
collection and make sure you set the content-security-policy in your
Hubs as well as CORS on your data server.

#### Schema
We record the POST data as:
```
{
    info: [...],
    data: [[tick1], [tick2]]
}
```
For the `info`:
```
    getUUID(),
    timestamp, // post time
    window.APP.store.credentialsAccountId !== null ? window.APP.store.credentialsAccountId : "",
    window.APP.store.state.profile.avatarId,
    avatarRig.components["player-info"].identityName,
    avatarRig.components["player-info"].displayName,
    avatarRig.components["player-info"].isRecording,
    avatarRig.components["player-info"].isOwner,
    detectOS(navigator.userAgent),
    AFRAME.utils.device.isBrowserEnvironment ? 1 : 0,
    AFRAME.utils.device.checkARSupport() ? 1 : 0,
    AFRAME.utils.device.checkHeadsetConnected() ? 1 : 0,
    AFRAME.utils.device.isIOS() ? 1 : 0,
    AFRAME.utils.device.isLandscape() ? 1 : 0,
    AFRAME.utils.device.isMobile() ? 1 : 0,
    AFRAME.utils.device.isMobileVR() ? 1 : 0,
    AFRAME.utils.device.isOculusBrowser() ? 1 : 0,
    AFRAME.utils.device.isR7() ? 1 : 0,
    AFRAME.utils.device.isTablet() ? 1 : 0,
    AFRAME.utils.device.isWebXRAvailable ? 1 : 0
```

For each data tick we will log an array line of a csv:
```
        timestamp,
        AFRAME.scenes[0].ownerDocument.location.pathname,
        AFRAME.scenes[0].ownerDocument.location.search,
        rigPosition.x,
        rigPosition.y,
        rigPosition.z,
        povPosition.x,
        povPosition.y,
        povPosition.z,
        rigQuant._x,
        rigQuant._y,
        rigQuant._z,
        rigQuant._w,
        povQuant._x,
        povQuant._y,
        povQuant._z,
        povQuant._w,
        rigDirection.x,
        rigDirection.y,
        rigDirection.z,
        povDirection.x,
        povDirection.y,
        povDirection.z,
        AFRAME.scenes[0].systems["hubs-systems"].characterController.fly ? 1 : 0,
        AFRAME.scenes[0].states.includes("spacebubble") ? 1 : 0,
        AFRAME.scenes[0].states.includes("visible") ? 1 : 0,
        AFRAME.scenes[0].states.includes("loaded") ? 1 : 0,
        AFRAME.scenes[0].states.includes("entered") ? 1 : 0,
        AFRAME.scenes[0].states.includes("muted") ? 1 : 0,
        this.lastFPS,
        AFRAME.scenes[0].systems["local-audio-analyser"].volume,
        window.APP.store.state.preferences.audioOutputMode === "audio" ? 1 : 0
```

I think this is the proper orientation:
`document.getElementById('avatar-pov-node').object3D.getWorldQuaternion();`
<<<<<<< HEAD
whichi s the `rigQuant` above.
=======
which is the `rigQuant` above.

### research-tourguide

This allows a group of people to automatically follow a player. The
follow can be started from chat via `/tourguide PLAYERNAME` or from
the url with `&tourguide=PLAYERNAME`.  There are a lot of questions
such as:

 * ✅ How far can a guide move before a user teleports to them (how do we
   define a local area). We set this any total movement change > 3.5.
 * ✅ How long a delay to use to catch up to the guide (we don't want to
   teleport at every tick)? This was fixed with the previous setting
   mostly.
 * ✅ How should we scatter people around the guide? People are randomly
   scattered within an interval.
 * We need to enable flying to a teleport location
   
The tourguide chat added code into `message-dispatch.js` and
`./react-components/chat-command-help.js` as well as the i18n
translations.
>>>>>>> 8b50a74dab21e359463f2898037ccb4ef1c8c7e1

## Notes

 * [Utopiah](https://github.com/Utopiah) has a lot of
   [notes](https://fabien.benetou.fr/Tools/Hubs) and [gist
   scripts](https://gist.github.com/Utopiah/).
 
