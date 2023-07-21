import { SignUpOptions } from "./auth";
import { signIn, signUp, signOut } from "./auth";

export enum AUTH_STATUS {
  SIGNED_IN,
  SIGNED_OUT,
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
    ign: "",
    teamId: "",
    discordName: "",
    email: "",
  };

  uid: string = "";
  profileStatus: PROFILE_STATUS = PROFILE_STATUS.LOADNIG;
  teamStatus: TEAM_STATUS = TEAM_STATUS.LOADING;
  authStatus: AUTH_STATUS = AUTH_STATUS.SIGNED_OUT;

  async signIn(email: string, password: string): Promise<AUTH_STATUS> {
    await signIn(email, password)
      .then((user) => {
        this.uid = user.uid;
        this.authStatus = AUTH_STATUS.SIGNED_IN;
      })
      .catch((error) => {
        console.log(error);
        this.authStatus = AUTH_STATUS.SIGNED_OUT;
      });

    return Promise.resolve(this.authStatus);
  }
  async signUp(email: string, password: string, options: SignUpOptions) {
    await signUp(email, password, options)
      .then((user) => {
        this.uid = user.uid;
        this.authStatus = AUTH_STATUS.SIGNED_IN;
      })
      .catch((error) => {
        console.log(error);
        this.authStatus = AUTH_STATUS.SIGNED_OUT;
      });
  }
  async signOut() {
    await signOut()
      .then(() => {
        this.uid = "";
        this.authStatus = AUTH_STATUS.SIGNED_OUT;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async deleteUser() {}

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
  ign: string;
  teamId: string;
  email: string;
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
