import axios from "axios";
import { Message, DashBoard, Quiz } from "../types";

// const API_BASE_URL = "https://pact-backend.onrender.com";
const API_BASE_URL = "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  createUser: async (username: string, email: string, password: string, graduationYear: number, token:string, mobile:string) => {
    return await api.post(`/users/register${token ? `?token=${token}` : ""}`, { username, email, password, graduationYear, mobile });
  },

  loginUser: async (email: string, password: string) => {
    return await api.post("/users/login", { email, password });
  },

  sendMessage: async (message: Message) => {
    return await api.post("/chat/sendMessage",{message});
  },

  getMessages: async () => {
    return await api.get("/chat/getAll");
  },

  getUserDetails : async (userId: Object) => {
    return await api.post("/users/getUserDetails", userId);
  },

  updateUserDetails : async(details: DashBoard) => {
    return await api.post("/users/updateUserDetails",details);
  },

  addQuiz: async(quiz: Omit<Quiz,"_id" | "questionsLength">) => {
    return await api.post("/quiz/addQuiz",quiz);
  },

  getQuizes: async() => {
    return await api.get("/quiz/getQuizes");
  },

  getQuizQuestions: async(_id: Object) =>{
    return await api.post("/quiz/getQuizQuestions",{_id});
  },

  getQuizResults: async(answers,_id) => {
    return await api.post("/quiz/getQuizResults",{answers,_id});
  },

  genrateInviteLink: async()=>{
    return await api.get("/users/generateInviteLink")
  },
  addInterview:async(username:string, role:string,alumniRole:string,userId:Object, interviewDate:string, numberOfSlots:number, startTimes:Array<String>, interviewLink:string)=>{
    return await api.post("/interview/addInterview",{username,role,alumniRole,userId,interviewDate,numberOfSlots,startTimes,interviewLink,})
  },
  getInterviews:async()=>{
    return await api.get("/interview/getInterview");
  },
  bookInterview:async(interviewId:Object, slotIndex:number, userId:Object)=>{
    return await api.post("/interview/bookInterview",{interviewId, slotIndex, userId})
  }
};

export default apiService;