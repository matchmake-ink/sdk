interface SignUpOptions {
  name: string;
  ign: string;
  discordName: string;
}

export enum AUTH_STATUS {
  SIGNED_IN,
  SIGNED_OUT,
  LOADING,
  ERROR,
}
export enum TEAM_STATUS {
  IN_TEAM,
  NOT_IN_TEAM,
  LOADING,
}
export enum PROFILE_STATUS {
  FOUND,
  LOADNIG,
}
/**
 * A wrapper class for the firebase auth and firestore. All methods act on the signed in user, and will fail if no user has been signed in with the `signIn` method.
 */
export class User {
  private agent: Agent = new Agent();
  private team: Team = {
    uid: "",
    name: "",
    members: [],
    rating: 0,
    rd: 0,
    volitility: 0,
  };
  private profile: Profile = {
    uid: "",
    ign: "",
    teamId: "",
    discordName: "",
  };

  uid: string = "";
  profileStatus: PROFILE_STATUS = PROFILE_STATUS.LOADNIG;
  teamStatus: TEAM_STATUS = TEAM_STATUS.LOADING;
  authStatus: AUTH_STATUS = AUTH_STATUS.LOADING;

  async signIn(email: string, password: string) {}
  async signUp(email: string, password: string, options: SignUpOptions) {}
  async signOut() {}
  async deleteUser() {}
  addAuthStateListener(callback: (authStatus: AUTH_STATUS) => void) {}

  async getProfile() {}
  async updateProfile() {}

  async createTeam() {}
  async joinTeam() {}
  async leaveTeam() {}
  async getTeam() {}
  async disbandTeam() {}

  async submitMatch() {}
  async challengeMatch() {}
  async getTeamMatches(number = 1) {}
  async getUnverifiedMatches() {}
}
/**
 * Acts as an abstraction for the firebase firestore. Is unauthenticated, and can only be used to get data from the database.
 */
export class Agent {
  async getProfile(uid: string) {}
  async getMatch(uid: string) {}
  async getTeam(uid: string) {}
  async getTeamMatches(uid: string, number = 1) {}
}

export interface Profile {
  uid: string;
  ign: string;
  teamId: string;
  discordName: string;
}

export interface Team {
  uid: string;
  name: string;
  members: string[];
  rating: number;
  rd: number;
  volitility: number;
}

export class Match {
  alphaId: string;
  bravoId: string;
  alphaScore: number;
  bravoScore: number;
}
