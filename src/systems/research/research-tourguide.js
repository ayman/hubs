import { qsGet } from '../../utils/qs_truthy';
const tourGuide = qsGet('tourguide');


AFRAME.registerSystem('research-tourguide', {
  schema: {
    onTour: { type: 'boolean', default: false },
    tourGuide: { type: 'string', default: '' }
  },

  /**
   * AFRAME command to init this system.
   */
  init: function() {
    this.data.tourGuide = tourGuide;
    this.data.onTour = tourGuide !== undefined && tourGuide !== null && tourGuide !== '' ? true : false;
    if (this.data.onTour) {
      console.log('Your tour guide is: ', this.data.tourGuide);
    }
    this.lastTeleportPoint = new THREE.Vector3(0, 0, 0);
  },

  /**
   * AFRAME command to execute on tick.  
   */
  tick() {
    if (!this.data.onTour) return;
    const rig = document.getElementById('avatar-rig');
    if (rig.messageDispatch !== undefined && window.APP.store.state.profile.displayName === this.data.tourGuide) {
      const msg = 'Your tourguide is set to yourself...turning the guide off.';
      rig.messageDispatch.log(msg);
      console.log(msg);
      this.data.onTour = false;
    } else {
      this.teleportToPlayer(this.data.tourGuide);
    }
  },

  /**
   * Find a player object if in scene.
   *
   * @param {string} playername - a case insensitive playername to
   * find.
   * @return {Object} 'player-info' object on success, null otherwise.
   */
  getPlayerInScene(playername) {
    const testname = playername.toLowerCase().trim();
    for (let i = 0; i < window.APP.componentRegistry['player-info'].length; i++) {
      const avatarname = window.APP.componentRegistry['player-info'][i].displayName.toLowerCase().trim();
      if (testname === avatarname) {
        return window.APP.componentRegistry['player-info'][i];
      }
    }
    return null;
  },

  /**
   * Find a player's name if in scene.
   *
   * @param {string} playername - a case insensitive playername to
   * find.
   * @return {Object} player's name (case correct) on success, "" otherwise.
   */
  getPlayerNameInScene(playername) {
    const player = this.getPlayerInScene(playername);
    return player !== null ? player.displayName : "";
  },

  /**
   * Set the tourguide to the given player name.
   *
   * @param {string} playername - a case insensitive playername to
   * find.
   * @return {string} playername on success, "" otherwise.
   */
  setTourGuide(playername) {
    const cleanName = this.getPlayerNameInScene(playername);
    if (cleanName !== "") {
      this.data.tourGuide = cleanName;
      this.data.onTour = true;
    }
    return cleanName;
  },

  /**
   * Given a playername, find that player and teleport the local
   * player to them.
   *
   * @param {string} playername - a case insensitive playername to
   * find.
   * @param {boolean} facing - Default False. If true, we'll put you
   * facing the target, else you'll scatter around the target and face
   * the direction they are facing.
   * @return {boolean} true if playerfound and teleport happened,
   * false otherwise.
   */
  teleportToPlayer(playername, facing = false) {
    const rig = document.getElementById('avatar-rig');
    const guide = this.getPlayerInScene(playername);
    if (guide === null || guide.displayName.toLowerCase().trim() !== playername.toLowerCase().trim()) {
      return false;
    }
    // const playerPosition = rig.object3D.getWorldPosition(new THREE.Vector3());
    const g_x = guide.el.object3D.position.x;
    const g_y = guide.el.object3D.position.y;
    const g_z = guide.el.object3D.position.z;
    // Ideally if the guide hasnt' moved much, we are free. If they
    // move more than 3 cumualtive points (just guessing) then we
    // teleport back to them.  But to do this, we need to store our
    // last teleport points!
    if ((Math.abs(this.lastTeleportPoint.x - g_x) + Math.abs(this.lastTeleportPoint.y - g_y) + Math.abs(this.lastTeleportPoint.z - g_z) > 3.5) || facing) {
      const hitpoint = new THREE.Vector3(g_x, g_y, g_z);
      if (!facing) {
        hitpoint.x += this.randomIntFromInterval(0.5, 1.25);
        hitpoint.z += this.randomIntFromInterval(0.5, 1.25);
      }
      this.el.sceneEl.systems['hubs-systems'].characterController.teleportTo(hitpoint);
      rig.object3D.setRotationFromQuaternion(guide.el.object3D.getWorldQuaternion().clone());
      if (facing) {
        // TODO: This still isn't working. We need to get the target
        // vector and position in front of it and turn around.
        rig.object3D.rotation.y = rig.object3D.rotation.y + (Math.PI / 2);
      }
      this.lastTeleportPoint = hitpoint.clone();
      // TODO: Not sure if i have to move the pov of me...hmm.
      // document.getElementById('avatar-pov-node').object3D.rotation
    }
    return true;
  },

  /**
   * Leave the tour, turn off the tourguide.
   */
  removeTourGuide() {
    this.data.onTour = false;
    this.data.tourGuide = "";
  },

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});
