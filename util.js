module.exports = parseData;

function parseData(data = {}) {
  //Exit if teams - to be implemented
  if(data.Teams) return;

  //Exit if not stock
  if(data.GameMode !== "Stock") return;

  //Define necessary objects
  let players = [], game = {};

  for(p of Object.keys(data).filter(i => i.startsWith('Player'))) {
    players.push(util(data, p))
  }

  game.livesCount = data.Lives
  game.map = data.MapName
  game.length = ft(data.GameDuration)
  game.gamemode = data.GameMode
  game.patch = data.BuildVersion

  //Return calc'd data
  return {player1: players[0], player2: players[1], game: game}
}

// Jank to fix issues with getters
function util(data, p) {
  return {
  name: data[p].PlayerName || "",
  bhid: data[p].BrawlhallaID || 0,
  legend: data[p].Loadout?.LegendName || "",

  // Damage the player dealt
  dmgDealt: data[p].DamageDealt || 0,
  // Damage the player received
  dmgTaken: data[p].DamageTaken || 0,

  // First weapon
  weapon1: {
    name: data[p].Loadout?.WeaponSkin1?.Weapon || "",
    get timeHeld() {return ft(data[p][this.name]?.TimeHeld || 0)},
    get throws() {return data[p][this.name]?.Throw?.Uses || 0},
    get throwAccuracy() {return Math.round((0 / (data[p][this.name]?.Throw?.Uses || 1)) * 100) + '%'},
    get damageTakenWhileHolding () {return data[p][this.name]?.DamageTaken || 0},
    get lightAttacksCount() {return ['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => (data[p][this.name] || {})[i]?.Uses || 0).reduce((a, b) => a + b, 0) || 0},
    get lightAttacksAccuracy() {return Math.round((['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => (data[p][this.name] || {})[i]?.EnemyHits || 0).reduce((a, b) => a + b, 0)/(this.lightAttacksCount || 1)) * 100) + '%'},
    get lightAttackDamage() {return ['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => (data[p][this.name] || {})[i]?.EnemyDamage || 0).reduce((a, b) => a + b, 0)},
    get heavyAttacksCount() {return ['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => (data[p][this.name] || {})[i]?.Uses || 0).reduce((a, b) => a + b, 0)},
    get heavyAttacksAccuracy() {return Math.round(['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => (data[p][this.name] || {})[i]?.EnemyHits || 0).reduce((a, b) => a + b, 0)/(this.heavyAttacksCount || 1) * 100) + '%'},
    get heavyAttacksDamage() {return ['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => (data[p][this.name] || {})[i]?.EnemyDamage || 0).reduce((a, b) => a + b, 0) || 0},
  },
  // Second weapon
  weapon2: {
    name: data[p].Loadout?.WeaponSkin2?.Weapon || "",
    get timeHeld() {return ft(data[p][this.name]?.TimeHeld || 0)},
    get throws() {return data[p][this.name]?.Throw?.Uses || 0},
    get throwAccuracy() {return Math.round((0 / (data[p][this.name]?.Throw?.Uses || 1)) * 100) + '%'},
    get damageTakenWhileHolding () {return data[p][this.name]?.DamageTaken || 0},
    get lightAttacksCount() {return ['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => (data[p][this.name] || {})[i]?.Uses || 0).reduce((a, b) => a + b, 0) || 0},
    get lightAttacksAccuracy() {return Math.round((['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => (data[p][this.name] || {})[i]?.EnemyHits || 0).reduce((a, b) => a + b, 0)/(this.lightAttacksCount || 1)) * 100) + '%'},
    get lightAttackDamage() {return ['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => (data[p][this.name] || {})[i]?.EnemyDamage || 0).reduce((a, b) => a + b, 0)},
    get heavyAttacksCount() {return ['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => (data[p][this.name] || {})[i]?.Uses || 0).reduce((a, b) => a + b, 0)},
    get heavyAttacksAccuracy() {return Math.round((['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => (data[p][this.name] || {})[i]?.EnemyHits || 0).reduce((a, b) => a + b, 0)/(this.heavyAttacksCount || 1)) * 100) + '%'},
    get heavyAttacksDamage() {return ['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => (data[p][this.name] || {})[i]?.EnemyDamage || 0).reduce((a, b) => a + b, 0) || 0},
  },
  // Unarmed data for the player
  unarmed: {
    name: "Unarmed",
    timeHeld: ft(data[p].Unarmed.TimeHeld || 0),
    damageTakenWhileHolding: data[p].Unarmed.DamageTaken || 0,
    lightAttacksCount: ['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => data[p].Unarmed[i]?.Uses || 0).reduce((a, b) => a + b, 0) || 0,
    get lightAttacksAccuracy() {return Math.round((['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => data[p].Unarmed[i]?.EnemyHits || 0).reduce((a, b) => a + b, 0)/(this.lightAttacksCount || 1))  * 100) + '%'},
    lightAttackDamage: ['nLight', 'sLight', 'dLight', 'nAir', 'sAir', 'dAir'].map(i => data[p].Unarmed[i]?.EnemyDamage || 0).reduce((a, b) => a + b, 0),
    heavyAttacksCount: ['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => data[p].Unarmed[i]?.Uses || 0).reduce((a, b) => a + b, 0),
    get heavyAttacksAccuracy() {return Math.round((['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => data[p].Unarmed[i]?.EnemyHits || 0).reduce((a, b) => a + b, 0)/(this.heavyAttacksCount || 1)) * 100) + '%'},
    heavyAttacksDamage: ['nHeavy', 'sHeavy', 'dHeavy', 'Recovery'].map(i => data[p].Unarmed[i]?.EnemyDamage || 0).reduce((a, b) => a + b, 0) || 0,
  },
  // Game sequence for this player
  seq: data[p].Sequence,

  // The amount of light attacks this player did
  get lightAttacksCount() {return this.weapon1.lightAttacksCount + this.weapon2.lightAttacksCount + this.unarmed.lightAttacksCount},
  get lightAttackDamage() {return this.weapon1.lightAttackDamage + this.weapon2.lightAttackDamage + this.unarmed.lightAttackDamage},
  // The amount of signature attacks this player did
  get signaturesCount() {return ['nHeavy', 'sHeavy', 'dHeavy'].map(i => ((data[p][this.weapon1.name] || {})[i]?.Uses || 0) + ((data[p][this.weapon2.name] || {})[i]?.Uses || 0)).reduce((a, b) => a + b, 0) || 0},
  // The accuracy of this player's signature attacks
  get signaturesAccuracy() {return Math.round((['nHeavy', 'sHeavy', 'dHeavy'].map(i => ((data[p][this.weapon1.name] || {})[i]?.EnemyHits || 0) + ((data[p][this.weapon2.name] || {})[i]?.EnemyHits || 0)).reduce((a, b) => a + b, 0)/(this.signaturesCount || 1)) * 100) + '%'},
  get signatureDamage() {return ['nHeavy', 'sHeavy', 'dHeavy'].map(i => ((data[p][this.weapon1.name] || {})[i]?.EnemyDamage || 0) + ((data[p][this.weapon2.name] || {})[i]?.EnemyDamage || 0)).reduce((a, b) => a + b, 0) || 0},

  // The amount of kills this player did
  koCount: data[p].KOs || 0,
  // The amount of accidents (suicides) this player had
  accidentCount: data[p].Suicides || 0,
  // The amount of deaths this player had
  deathCount: data[p].Deaths || 0,

  // The amount of dodges this player did
  dodgeCount: data[p].TotalDodges - data[p].AirDodges,
  // The amount of airdodges this player did
  airDodgeCount: data[p].AirDodges,
  // The amount of dashes this player did
  dashCount: data[p].Dashes || 0,
  // The amount of dashjumps this player did
  dashJumpCount: data[p].DashJumps || 0,
  // The amount of airjumps this player did
  airJumpCount: data[p].AirJumps || 0,
  // The amount of (regular) jumps this player did
  regularJumpCount: data[p].TotalJumps  - data[p].AirJumps - data[p].DashJumps || 0,

  timeOnGround: ft(data[p].TimeOnGround || 0),
  timeOnWall: ft(data[p].TimeOnWall || 0),
  timeInAir: ft(data[p].TimeInAir || 0)
  }
}

function ft(t) {
  return Math.floor(t / 60_000).toString().padStart(2, '0') + ':' + Math.floor(t / 1_000).toString().padStart(2, '0')
}
