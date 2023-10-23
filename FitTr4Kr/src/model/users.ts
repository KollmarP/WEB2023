export class User {
  personalData: PersonalData;
  isAdmin: boolean;
  id: number;
  static activitiesAndTheirMET: { [key: string]: number } = { "run": 7.0, "bike": 7.5, "walk": 5.3, "cardio": 3.8, "strength": 6.0 };

  static defaultExecise: Exercise = {
    title: '',
    date: new Date(),
    duration: 0,
    location: '',
    picture: '',
    type: '',
    numOfComments: 0,
    numOfLikes: 0,
    numDaysAgo: 0,
  };
  
  static defaultData: PersonalData = {
    firstName: '',
    lastName: '',
    genderIdentity: '',
    age: 0,
    height: 0,
    weight_class: '',
    weight: 0,
    online_handle: '',
    aboutMe: '',
    oneAdjectiveToDescribeMe: '',
    emails: [],
    activities: [],
  };

  caloriesBurned(exercise: Exercise): number {
    let calories: number = 0;
    let time: number = exercise.duration;
    // calories burned = METs x 3.5 x BW (kg) / 200 = Kcal/min.
    let weightInKg = this.personalData.weight / 2.2;
    let MET = User.activitiesAndTheirMET[exercise.type];
    caloriesBurned = MET * 3.5 * weightInKg / 200 * durationInMinutes;
    return caloriesBurned;
  }

  // calculate average pace
  static averagePace(activity: Activity): number {
    const miles = activity.distance
    const durationInHours = activity.durationInMinutes / 60;
    return distanceInMiles / durationInHours;
  }

  static isDistanceActivity(type: string): boolean {
    return type == "run" || type == "bike" || type == "walk";
  }
  static isLooselyDistanceActivity(type: string, notes: string): boolean {
    const keywords = ["walk", "run", "jog", "hike", "bike", "swim", "ski", "skate", "skateboard", "scooter", "wheelchair"]
    const notesContainsKeyword = keywords.some((keyword) => {
      return notes.toLowerCase().includes(keyword);
    });
    return User.isDistanceActivity(type) || notesContainsKeyword;
  }
  static isLooselyStrengthActivity(type: string, notes: string): boolean {
    // lol thanks co-pilot
    const keywords = ["curl", "rep", "lift", "pushup", "push-up", "push up", "pullup", "pull-up", "pull up", "chinup", "chin-up", "chin up", "dip", "dumbbell", "barbell", "bench", "squat", "deadlift", "press", "crunch", "situp", "sit-up", "sit up", "plank", "lunge", "burpee", "jumping jack", "jumping-jack", "jumping-jacks", "jumping jacks", "jumpingjack", "jumpingjack", "jumpingjacks", "jumpingjacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks", "jumping jack", "jumping jack", "jumping-jack", "jumping-jacks", "jumping-jack", "jumping-jacks"];
    const notesContainsKeyword = keywords.some((keyword) => {
      return notes.toLowerCase().includes(keyword);
    });
    return !User.isDistanceActivity(type) || notesContainsKeyword;
  }

  public constructor(user?:any, id?: number, isAdmin?: boolean, personalData?: PersonalData) {
    if( user != undefined) {
      this.personalData = { ...user.personalData } as PersonalData;
      this.isAdmin = user.isAdmin == "true" ? true : false; // convert string to boolean
      this.id = parseInt(user.id);
      return;
    }
    if( id == undefined || isAdmin == undefined) throw new Error("id and isAdmin must be defined");

    this.id = id;
    if (personalData == undefined)
      this.personalData = { ...User.defaultData } as PersonalData;
    else
      this.personalData = personalData;
    this.isAdmin = isAdmin;
  }
    buildName(): string {
      return this.personalData.firstName + " " + this.personalData.lastName;
    }
}
export interface Comment {
  poster_id: number;
  author: string;
  comment: string;
  numOfLikes: number;
  likedBy: User[];
}

export interface ExerciseStats {
  totalDistance: number;
  totalDuration: number;
  totalReps: number;
  totalSets: number;
  avgHeartRate: number;
  avgWeightInPounds: number;
  totalCaloriesBurned: number;
  avgPace: number;
  avgDifficulty: number;
  avgNumOfComments: number;
  avgNumOfLikes: number;
  [key: string]: number;
}

export interface Exercise {
  title: string;
  date: Date;
  minsduration: number;
  location: string;
  picture: string;
  type: string;
  numOfComments: number;
  numOfLikes: number;
  numDaysAgo: number;
  comments: Comment[];
  likedBy: number[];
}

interface PersonalData {
  firstName: string;
  lastName: string;
  genderIdentity: string;
  age: number;
  height: number;
  weight_class: string;
  weight: number;
  online_handle: string;
  aboutMe: string;
  oneAdjectiveToDescribeMe: string;
  emails: string[];
  activities: Exercise[];
}

