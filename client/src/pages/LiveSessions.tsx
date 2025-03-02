import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Interview } from "../types";

const LiveSessions = (): React.ReactNode => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const isAdmin = user?.role === "admin"; 


    const [data, setData] = useState<Interview[]>([
        {
            interviewer: "Aravindh",
            designation: "Admin",
            topic: "Java",
            subtopic: "Object Oriented Programming",
            date: new Date().toLocaleDateString("en-GB"),
            time: "10:30",
            meetingLink: "https://meet.google.com/v1y65K98",
            endTime:"11:30"
        },
        {
            interviewer: "Samantha",
            designation: "Senior Developer",
            topic: "React",
            subtopic: "State Management",
            date: new Date().toLocaleDateString(),
            time: "10:30",
            meetingLink: "https://meet.google.com/a2b34C56",
            endTime:"11:30"
        },
        {
            interviewer: "John",
            designation: "Tech Lead",
            topic: "Node.js",
            subtopic: "Express Framework",
            date: new Date().toLocaleDateString(),
            time: "10:30",
            meetingLink: "https://meet.google.com/x3y89J12",
            endTime:"11:30"
        },
        {
            interviewer: "Priya",
            designation: "Software Engineer",
            topic: "Python",
            subtopic: "Django Framework",
            date: new Date().toLocaleDateString(),
            time: "10:30",
            meetingLink: "https://meet.google.com/k9p23M45",
            endTime:"11:30"
        },
        {
            interviewer: "David",
            designation: "Project Manager",
            topic: "Agile Methodology",
            subtopic: "Scrum Practices",
            date: new Date().toLocaleDateString(),
            time: "10:30",
            meetingLink: "https://meet.google.com/z4d67T89",
            endTime:"11:30"
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        topic: "",
        subtopic: "",
        date: "",
        time: "",
        meetingLink: "",
        endTime:""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.topic || !formData.subtopic || !formData.date || !formData.meetingLink) {
            alert("Please fill all fields");
            return;
        }

        const newInterview: Interview = {
            interviewer: "Aravindh",
            designation: "Admin",
            topic: formData.topic,
            subtopic: formData.subtopic,
            date: formData.date,
            time: formData.time,
            meetingLink: formData.meetingLink,
            endTime:formData.endTime
        };
        setData([...data, newInterview]);
        setShowForm(false);
        setFormData({ topic: "", subtopic: "", date: "", meetingLink: "", time: "", endTime:""});
    };

    return (
        <>
            <div className="w-full min-h-[100vh] flex flex-col items-center p-6 bg-gray-100">
                <div className="w-full max-w-5xl flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#5541E2]">Live Sessions Available Today</h2>
                    {isAdmin && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#7A25D0] text-white rounded-lg hover:bg-[#5541E2] transition"
                        >
                            <Plus size={20} /> Add Interview
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {data.map((interview, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#7A25D0] w-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h3 className="text-lg font-semibold text-[#5541E2]">{interview.interviewer} - {interview.designation}</h3>
                            <p className="text-gray-700 mt-2"><strong>Topic:</strong> {interview.topic}</p>
                            <p className="text-gray-500"><strong>Subtopic:</strong> {interview.subtopic}</p>
                            <p className="text-gray-500 text-sm mt-2"><strong>Date(dd/mm/yyyy):</strong> {interview.date}</p>
                            <p className="text-gray-500 text-sm mt-2"><strong>Start Time(24hrs):</strong> {interview.time}</p>
                            <p className="text-gray-500 text-sm mt-2"><strong>End Time(24hrs):</strong> {interview.endTime}</p>
                            <a
                                href={interview.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-4 py-2 bg-[#7A25D0] text-white rounded-lg hover:bg-[#5541E2] transition"
                            >
                                Join Session
                            </a>
                        </motion.div>
                    ))}
                </div>

                {showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg w-96"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <h3 className="text-xl font-semibold text-[#5541E2] mb-4">Add New Interview</h3>
                            <input
                                type="text"
                                name="topic"
                                placeholder="Topic"
                                value={formData.topic}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="subtopic"
                                placeholder="Subtopic"
                                value={formData.subtopic}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <label>Start Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <label>End Time</label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="meetingLink"
                                placeholder="Meeting Link"
                                value={formData.meetingLink}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-[#7A25D0] text-white rounded hover:bg-[#5541E2]"
                                >
                                    Add Interview
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </>
    );
};

export default LiveSessions;
