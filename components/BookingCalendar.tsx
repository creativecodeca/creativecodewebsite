import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slot {
    time: string; // ISO string or HH:mm
    label: string; // Display time
}

interface BookingCalendarProps {
    onSelectSlot: (slot: string) => void;
    selectedSlot: string | null;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onSelectSlot, selectedSlot }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [slots, setSlots] = useState<Record<string, any[]>>({});
    const [loading, setLoading] = useState(false);
    const [availableDays, setAvailableDays] = useState<Set<string>>(new Set());

    // Helper to get days in month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return days;
    };

    // Helper to get first day of week (0-6)
    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const formatDateKey = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const fetchSlots = async (year: number, month: number) => {
        setLoading(true);
        // Calculate start and end of month in ms
        const startDate = new Date(year, month, 1).getTime();
        const endDate = new Date(year, month + 1, 0).getTime();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        try {
            const res = await fetch(`/api/ghl-slots?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`);
            if (!res.ok) throw new Error('Failed to fetch slots');
            const data = await res.json();

            // GHL returns object where keys are dates (YYYY-MM-DD) and values are arrays of slots
            // Example: { "2023-10-25": [{ "2023-10-25T10:00:00+00:00": 1 }, ...] }
            // Actually GHL structure varies, usually it's { "dates": [ { "date": "...", "slots": [] } ] } or similar.
            // Let's assume standard GHL response for free-slots:
            // { "2024-05-01": ["2024-05-01T09:00:00-04:00", ...], ... }

            // Let's handle the response dynamically.
            // If it's an object with date keys:
            setSlots(data);

            const days = new Set<string>();
            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key]) && data[key].length > 0) {
                    days.add(key);
                }
            });
            setAvailableDays(days);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots(currentDate.getFullYear(), currentDate.getMonth());
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const handleDateClick = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        // Adjust for timezone offset to match the keys usually returned by GHL (local date string)
        // Actually, constructing Date(y, m, d) creates a local date.
        // formatDateKey uses toISOString which converts to UTC.
        // We need a local YYYY-MM-DD string.
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const key = `${year}-${month}-${d}`;

        // Check if we have slots for this key
        // We might need to check if the key exists in `slots`
        // Let's try to match the key format from GHL.
        // Usually GHL keys are YYYY-MM-DD.

        setSelectedDate(date);
        onSelectSlot(''); // Reset slot when date changes
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            const dateKey = `${year}-${month}-${d}`;

            const hasSlots = availableDays.has(dateKey);
            const isSelected = selectedDate &&
                selectedDate.getDate() === i &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.getFullYear() === currentDate.getFullYear();

            // Disable past dates
            const isPast = new Date(year, currentDate.getMonth(), i + 1).getTime() < Date.now();

            days.push(
                <button
                    key={i}
                    onClick={() => !isPast && handleDateClick(i)}
                    disabled={isPast}
                    className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all relative
            ${isSelected ? 'bg-emerald-500 text-white shadow-lg scale-110 z-10' : ''}
            ${!isSelected && !isPast ? 'hover:bg-white/10 text-slate-300' : ''}
            ${isPast ? 'text-slate-700 cursor-not-allowed' : ''}
            ${hasSlots && !isSelected && !isPast ? 'text-white font-bold' : ''}
          `}
                >
                    {i}
                    {hasSlots && !isSelected && !isPast && (
                        <div className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full"></div>
                    )}
                </button>
            );
        }
        return days;
    };

    const getSlotsForSelectedDate = () => {
        if (!selectedDate) return [];
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const d = String(selectedDate.getDate()).padStart(2, '0');
        const key = `${year}-${month}-${d}`;
        return slots[key] || [];
    };

    const currentSlots = getSlotsForSelectedDate();

    return (
        <div className="flex flex-col md:flex-row gap-8 h-full">
            {/* Calendar Section */}
            <div className="flex-1 min-w-[300px]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-emerald-500" />
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-xs font-medium text-slate-500 uppercase tracking-wider py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 place-items-center">
                    {loading ? (
                        <div className="col-span-7 py-10 flex justify-center">
                            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                        </div>
                    ) : (
                        renderCalendarDays()
                    )}
                </div>
            </div>

            {/* Time Slots Section */}
            <div className="flex-1 md:border-l border-white/10 md:pl-8 min-h-[300px] flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    Available Times
                </h3>

                {!selectedDate ? (
                    <div className="flex-1 flex items-center justify-center text-slate-500 text-sm italic">
                        Select a date to view available times
                    </div>
                ) : currentSlots.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-slate-500 text-sm italic">
                        No slots available for this date
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                        {currentSlots.map((slot: any, idx: number) => {
                            // Slot might be a string (ISO) or object. GHL usually returns ISO strings in the array.
                            const timeString = typeof slot === 'string' ? slot : slot.startTime;
                            const date = new Date(timeString);
                            const timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (
                                <button
                                    key={idx}
                                    onClick={() => onSelectSlot(timeString)}
                                    className={`
                      py-3 px-4 rounded-lg text-sm font-medium border transition-all
                      ${selectedSlot === timeString
                                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-emerald-500/50 hover:bg-white/10'}
                    `}
                                >
                                    {timeLabel}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingCalendar;
