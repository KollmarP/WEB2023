import { ref } from 'vue';
import data from '../components/data/users.json';

const users = ref(data.users.map(user => new User(user)));

export function getUserByEmail(email: string): User | undefined {
  return users.value.find( x => x.personalData.email === email);
}

export class User {
  personalData: PersonalData;
  isAdmin: boolean;
  id: number;
  
  static defaultExecise: Exercise = {
    picture: '',
    name: '',
    type: 'distance',
    amountCompleted: 0,
    exerciseUnit: 'miles',
    timeSpent: 0,
    timeUnit: 'mins',
    caloriesBurned: 0,
    pace: 0,
  };
  
  static defaultData: PersonalData = {
    firstName: '',
    lastName: '',
    age: 0,
    height: 0,
    weight: 0,
    username: '',
    password: '',
    Bio: '',
    email: '',
    activities: [],
  };

  public constructor(user?:any, id?: number, isAdmin?: boolean, personalData?: PersonalData) {
    if( user != undefined) {
      this.personalData = ref(user.map((user: PersonalData) => ({...user} as PersonalData)));
      this.isAdmin = user.isAdmin == "false"
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
  author_id: number;
  author: string;
  comment: string;
  numOfLikes: number;
  likedBy: User[];
}

export interface ExerciseStats {
  totalDistance: number;
  totalDuration: number;
  avgPace: number;
  totalReps: number;
  totalSets: number;
  totalCaloriesBurned: number;
}

export interface Exercise {
  picture: string,
  name: string,
  type: "distance" | "weight",
  amountCompleted: number,
  exerciseUnit: "miles" | "pounds",
  timeSpent: number,
  timeUnit: "mins" | "hours",
  caloriesBurned: number,
  pace: number,
}

export function Pace(exercise: Exercise){
  const miles = exercise.amountCompleted;
  if(exercise.timeUnit == 'mins'){
    return miles/(exercise.timeSpent *60)
  }
  else{
    return miles/exercise.timeSpent;
  }
}

interface PersonalData {
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  username: string;
  password: string;
  Bio: string;
  email: string;
  activities: Exercise[];
}