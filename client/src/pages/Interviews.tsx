// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import apiService from "../services/api";
// import { IInterview } from "../types";

// const Interviews = (): React.ReactNode => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     const [interviews, setInterviews] = useState<IInterview[]>([]);
//     const [addInterview, setAddInterview] = useState<boolean>(false);
//     const [selectedInterview, setSelectedInterview] = useState<IInterview | null>(null);
//     const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    
//     useEffect(() => {
//         apiService.getInterviews().then((res) => setInterviews(res.data));
//     }, []);

//     const handleBookSlot = (interview: IInterview, slotIndex: number) => {
//         setSelectedInterview(interview);
//         setSelectedSlot(slotIndex);
//     };

//     const confirmBooking = async () => {
//         if (selectedInterview && selectedSlot !== null) {
//             try {
//                 await apiService.bookInterview(selectedInterview._id, selectedSlot, user._id);
//                 setInterviews((prev) =>
//                     prev.map((int) =>
//                         int._id === selectedInterview._id
//                             ? {
//                                   ...int,
//                                   slots: int.slots.map((slot, i) =>
//                                       i === selectedSlot ? { ...slot, bookedBy: user._id } : slot
//                                   ),
//                               }
//                             : int
//                     )
//                 );
//                 setSelectedInterview(null);
//                 setSelectedSlot(null);
//             } catch (error) {
//                 console.error("Error booking slot:", error);
//             }
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className="flex justify-between mb-4">
//                 <h2 className="text-2xl font-semibold">Available Interviews</h2>
//                 {user.role === "admin" && (
//                     <button onClick={() => setAddInterview(true)} className="bg-[#5540E1] text-white px-4 py-2 rounded-lg">
//                         Add Interview
//                     </button>
//                 )}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
//                 {interviews.map((interview) => (
//                     <motion.div
//                         key={interview._id.toString()}
//                         className="border p-4 mb-4 rounded-lg shadow-md"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                     >
//                         <h3 className="text-xl font-semibold">Interviewer: {interview.username.toUpperCase()}</h3>
//                         <p>Designation: {interview.role}</p>
//                         <p>Date: {new Date(interview.interviewDate).toDateString()}</p>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             {interview.slots.map((slot, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => !slot.bookedBy && handleBookSlot(interview, index)}
//                                     className={`px-4 py-2 rounded-md text-white cursor-${slot.bookedBy ? "not-allowed bg-gray-400" : "pointer bg-[#7A25D0]"}`}
//                                 >
//                                     {slot.startTime} {slot.bookedBy ? " - Booked" : ""}
//                                 </button>
//                             ))}
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>

//             {selectedInterview && selectedSlot !== null && (
//                 <motion.div
//                     className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                 >
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                         <h3 className="text-lg font-semibold">Confirm Booking</h3>
//                         <p>Interviewer: {selectedInterview.username}</p>
//                         <p>Role: {selectedInterview.role}</p>
//                         <p>Date: {new Date(selectedInterview.interviewDate).toDateString()}</p>
//                         <p>Slot Time: {selectedInterview.slots[selectedSlot].startTime}</p>
//                         <div className="flex justify-end mt-4 space-x-4">
//                             <button onClick={() => setSelectedInterview(null)} className="px-4 py-2 bg-gray-300 rounded">
//                                 Cancel
//                             </button>
//                             <button onClick={confirmBooking} className="px-4 py-2 bg-[#5540E1] text-white rounded">
//                                 Confirm
//                             </button>
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default Interviews;



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../services/api";
import { IInterview } from "../types";
import {Link} from "react-router-dom"

const Interviews = (): React.ReactNode => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [interviews, setInterviews] = useState<IInterview[]>([]);
    const [selectedInterview, setSelectedInterview] = useState<IInterview | null>(null);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        apiService.getInterviews().then((res) => setInterviews(res.data));
    }, []);

    const handleBookSlot = (interview: IInterview, slotIndex: number) => {
        setSelectedInterview(interview);
        setSelectedSlotIndex(slotIndex);
        setShowModal(true);
    };

    const confirmBooking = async () => {
        if (!selectedInterview || selectedSlotIndex === null) return;
        try {
            await apiService.bookInterview(selectedInterview._id, selectedSlotIndex, user._id);
            setInterviews((prev) =>
                prev.map((int) =>
                    int._id === selectedInterview._id
                        ? {
                              ...int,
                              slots: int.slots.map((slot, i) =>
                                  i === selectedSlotIndex ? { ...slot, bookedBy: user._id } : slot
                              ),
                          }
                        : int
                )
            );
            setShowModal(false);
        } catch (error) {
            console.error("Error booking slot:", error);
        }
    };

    const upcomingInterviews = interviews.filter((interview) =>
        interview.slots.some((slot) => slot.bookedBy === user._id)
    );
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Available Interviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {interviews.map((interview) => (
                    <motion.div
                        key={interview._id.toString()}
                        className="border p-6 rounded-lg shadow-lg bg-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-lg font-bold">Interviewer: {interview.username.toUpperCase()}</h3>
                        <p>Designation: {interview.role.charAt(0).toUpperCase()+interview.role.slice(1)}</p>
                        <p>Date: {new Date(interview.interviewDate).toDateString()}</p>
                        <div className="mt-2">
                            <p className="font-semibold">Slots:</p>
                            <div className="flex flex-col gap-2 mt-1 flex-wrap">
                                {interview.slots.map((slot, index) => {
                                    const isBooked = slot.bookedBy;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => !isBooked && handleBookSlot(interview, index)}
                                            className={`px-3 py-1 rounded-md text-white text-sm ${isBooked ? "bg-gray-400 cursor-not-allowed" : "bg-[#7A25D0] hover:bg-[#5540E1] cursor-pointer"}`}
                                        >
                                            {slot.startTime} {isBooked ? "- Booked" : ""}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Upcoming Interviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingInterviews.map((interview) => (
                    <motion.div
                        key={interview._id.toString()}
                        className="border p-6 rounded-lg shadow-lg bg-[#E0E7FF]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-lg font-bold">Interviewer: {interview.username.toUpperCase()}</h3>
                        <p>Designation: {interview.role}</p>
                        <p>Date: {new Date(interview.interviewDate).toDateString()}</p>
                        <div className="my-2">
                            <p className="font-semibold">Your Upcoming Slots:</p>
                            {interview.slots.map((slot, index) =>
                                slot.bookedBy === user._id ? (
                                    <Link to={new Date(interview.interviewDate).getTime() + parseInt(slot.startTime.replace(":", "")) < Date.now() ? "/interviews": interview.interviewLink} target="_blank"><p key={index} className="px-3 py-1 text-center m-1 bg-[#5540E1] text-white rounded-md inline-block">
                                        {slot.startTime} {new Date(interview.interviewDate).getTime() + parseInt(slot.startTime.replace(":", "")) < Date.now() ? "- Completed" : ""}
                                    </p></Link>
                                ) : null
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {showModal && selectedInterview && selectedSlotIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h3 className="text-lg font-semibold mb-2">Confirm Booking</h3>
                        <p><strong>Interviewer:</strong> {selectedInterview.username}</p>
                        <p><strong>Role:</strong> {selectedInterview.role}</p>
                        <p><strong>Date:</strong> {new Date(selectedInterview.interviewDate).toDateString()}</p>
                        <p><strong>Slot:</strong> {selectedInterview.slots[selectedSlotIndex].startTime}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                onClick={confirmBooking}
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Interviews;