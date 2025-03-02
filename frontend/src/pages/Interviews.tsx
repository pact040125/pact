import React, { useEffect, useState } from "react";
import apiService from "../services/api";
import { IInterview } from "../types";

const Interviews = (): React.ReactNode => {
    const user = JSON.parse(localStorage.getItem("user")||"{}");
    console.log(user.alumniRole)
    const [interviews, setInterviews] = useState<IInterview[]>([]);
    const [username, setUsername] = useState<string>(user.username||"");
    const [role, setRole] = useState(user.role||"");
    const [alumniRole, setAlumniRole] = useState(user.alumniRole||user.role);
    const [interviewDate, setInterviewDate] = useState("");
    const [numberOfSlots, setNumberOfSlots] = useState(1);
    const [slots, setSlots] = useState<string[]>([]);
    const [interviewLink, setInterviewLink] = useState("https://meet.google.com");
    const [addInterview, setAddInterview]=useState<boolean>(false)
    useEffect(() => {
        apiService.getInterviews().then((res) => setInterviews(res.data));
    }, []);

    const handleBookSlot = async (interviewId: Object, slotIndex: number) => {
        const response = await apiService.bookInterview(interviewId, slotIndex, user._id);
        alert(response.data.message);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiService.addInterview(
                username,
                role,
                alumniRole,
                user._id,
                interviewDate,
                numberOfSlots,
                slots,
                interviewLink,
            );

            alert(response.data.message);
            // setUsername("");
            // setRole("");
            // setAlumniRole("");
            // setInterviewDate("");
            // setNumberOfSlots(1);
            // setSlots([""]);
            // setInterviewLink("");
        } catch (error) {
            console.error("Error adding interview:", error);
            alert("Failed to add interview.");
        }
    };

    const handleSlotChange = (index: number, value: string) => {
        const updatedSlots = [...slots];
        updatedSlots[index] = value;
        setSlots(updatedSlots);
    };




    return <div>
        <div className="flex">
        <h2>Available Interviews</h2>
        <button onClick={()=>setAddInterview(true)}>Add interview</button>
        </div>
        {interviews.map((interview, index) => (
            <div key={index} className="border p-4 mb-4">
                <h3>{interview.username} ({interview.role})</h3>
                <p>Date: {new Date(interview.interviewDate).toDateString()}</p>
                <p>Slots:</p>
                {interview.slots.map((slot, index) => (
                    <div key={index}>
                        <span>{slot.startTime} - </span>
                        {slot.bookedBy ? (
                            <span className="text-red-500">Booked</span>
                        ) : (
                            <button onClick={() => handleBookSlot(interview._id, index)} className="bg-blue-500 text-white p-1">
                                Book
                            </button>
                        )}
                    </div>
                ))}
            </div>
        ))}
        {addInterview && <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg space-y-4">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="text"
                placeholder="Alumni Role"
                value={alumniRole}
                onChange={(e) => setAlumniRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="number"
                min="1"
                placeholder="Number of Slots"
                value={numberOfSlots}
                onChange={(e) => {
                    const slots = Number(e.target.value);
                    setNumberOfSlots(slots);
                    setSlots(new Array(slots).fill(""));
                }}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            {slots.map((time, index) => (
                <input
                    key={index}
                    type="time"
                    value={time}
                    onChange={(e) => handleSlotChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            ))}
            <input
                type="url"
                placeholder="Interview Link"
                value={interviewLink}
                onChange={(e) => setInterviewLink(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Add Interview
            </button>
        </form>}
    </div>
};

export default Interviews;
