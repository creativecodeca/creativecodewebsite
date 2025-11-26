import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Clock, Calendar as CalendarIcon, ArrowLeft, CheckCircle, User, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slot {
    time: string; // ISO string or HH:mm
    label: string; // Display time
}

interface BookingFormData {
    name: string;
    email: string;
    phone: string;
}

interface BookingCalendarProps {
    onSelectSlot: (slot: string) => void;
    selectedSlot: string | null;
    onSubmitBooking: (formData: BookingFormData) => Promise<void>;
    bookingStatus: 'idle' | 'loading' | 'success' | 'error';
    bookingError: string | null;
    initialFormData?: BookingFormData;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
    onSelectSlot,
    selectedSlot,
    onSubmitBooking,
    bookingStatus,
    bookingError,
    initialFormData
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [slots, setSlots] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [availableDays, setAvailableDays] = useState<Set<string>>(new Set());
    const [view, setView] = useState<'calendar' | 'form'>('calendar');
    const [monthSlotsCache, setMonthSlotsCache] = useState<Record<string, boolean>>({});
    const [formData, setFormData] = useState<BookingFormData>({
        name: initialFormData?.name || '',
        email: initialFormData?.email || '',
        phone: initialFormData?.phone || ''
    });

    // Update local form data if initial changes (e.g. user filled contact form)
    useEffect(() => {
        if (initialFormData) {
            setFormData(prev => ({
                ...prev,
                name: initialFormData.name || prev.name,
                email: initialFormData.email || prev.email,
                phone: initialFormData.phone || prev.phone
            }));
        }
    }, [initialFormData]);

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

    const fetchSlots = async (year: number, month: number) => {
        setLoading(true);
        // Calculate start and end of month in ms
        const startDate = new Date(year, month, 1).getTime();
        const endDate = new Date(year, month + 1, 0).getTime();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        try {
            const res = await fetch(`/api/ghl-slots?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`);
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
                console.error('API Error:', res.status, errorData);
                throw new Error(`Failed to fetch slots: ${errorData.error || 'Unknown error'}`);
            }
            const data = await res.json();

            // Log the response structure for debugging
            console.log('GHL API Response:', data);
            console.log('Response keys:', Object.keys(data));

            if (Object.keys(data).length === 0) {
                console.warn('No slots data returned from API');
            }

            setSlots(data);

            const days = new Set<string>();
            Object.keys(data).forEach(key => {
                console.log(`Checking key: ${key}`, data[key]);
                // Check if it's the object structure { slots: [] } which GHL returns
                if (data[key] && Array.isArray(data[key].slots) && data[key].slots.length > 0) {
                    console.log(`Adding day with slots: ${key}`);
                    days.add(key);
                }
                // Fallback for direct array if API changes
                else if (Array.isArray(data[key]) && data[key].length > 0) {
                    console.log(`Adding day with direct array: ${key}`);
                    days.add(key);
                }
            });
            console.log('Available days:', Array.from(days));
            setAvailableDays(days);

            // Cache whether this month has slots
            const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
            setMonthSlotsCache(prev => ({ ...prev, [monthKey]: days.size > 0 }));

        } catch (err) {
            console.error('Error fetching slots:', err);
            // Set empty slots on error to prevent UI from breaking
            setSlots({});
            setAvailableDays(new Set());

            // Mark this month as having no slots
            const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
            setMonthSlotsCache(prev => ({ ...prev, [monthKey]: false }));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots(currentDate.getFullYear(), currentDate.getMonth());

        // Prefetch adjacent months to know if arrows should be disabled
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Prefetch previous month
        checkMonthHasSlots(currentYear, currentMonth - 1);

        // Prefetch next month
        checkMonthHasSlots(currentYear, currentMonth + 1);
    }, [currentDate]);

    // Auto-select earliest available day and first time slot when slots are loaded and nothing is selected
    useEffect(() => {
        if (availableDays.size > 0 && !selectedDate && !selectedSlot && !loading) {
            // Find the earliest available day that's not in the past
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const sortedDays = Array.from(availableDays).sort();
            for (const dateKey of sortedDays) {
                const [year, month, day] = dateKey.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                date.setHours(0, 0, 0, 0);

                if (date >= today) {
                    setSelectedDate(date);

                    // Also auto-select the first available time slot for this date
                    const dayData = slots[dateKey];
                    if (dayData) {
                        let firstSlot: string | null = null;
                        if (Array.isArray(dayData.slots) && dayData.slots.length > 0) {
                            firstSlot = typeof dayData.slots[0] === 'string'
                                ? dayData.slots[0]
                                : dayData.slots[0].startTime;
                        } else if (Array.isArray(dayData) && dayData.length > 0) {
                            firstSlot = typeof dayData[0] === 'string'
                                ? dayData[0]
                                : dayData[0].startTime;
                        }

                        if (firstSlot) {
                            onSelectSlot(firstSlot);
                        }
                    }
                    break;
                }
            }
        }
    }, [availableDays, selectedDate, selectedSlot, loading, slots, onSelectSlot]);

    const checkMonthHasSlots = async (year: number, month: number): Promise<boolean> => {
        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

        // Check cache first - if we know it has no slots, return false
        // If we know it has slots, return true
        // If unknown, check it
        if (monthSlotsCache[monthKey] === false) {
            return false; // We know this month has no slots
        }
        if (monthSlotsCache[monthKey] === true) {
            return true; // We know this month has slots
        }

        // Unknown - fetch and check
        try {
            const startDate = new Date(year, month, 1).getTime();
            const endDate = new Date(year, month + 1, 0).getTime();
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const res = await fetch(`/api/ghl-slots?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`);
            if (!res.ok) {
                setMonthSlotsCache(prev => ({ ...prev, [monthKey]: false }));
                return false;
            }

            const data = await res.json();
            const days = new Set<string>();
            Object.keys(data).forEach(key => {
                if (data[key] && Array.isArray(data[key].slots) && data[key].slots.length > 0) {
                    days.add(key);
                } else if (Array.isArray(data[key]) && data[key].length > 0) {
                    days.add(key);
                }
            });

            const hasSlots = days.size > 0;
            setMonthSlotsCache(prev => ({ ...prev, [monthKey]: hasSlots }));
            return hasSlots;
        } catch {
            setMonthSlotsCache(prev => ({ ...prev, [monthKey]: false }));
            return false;
        }
    };

    const handlePrevMonth = () => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const newYear = currentYear;
        const newMonth = currentMonth - 1;

        // Only navigate if we know the month has slots or we don't know yet
        const monthKey = `${newYear}-${String(newMonth + 1).padStart(2, '0')}`;
        const knownNoSlots = monthSlotsCache[monthKey] === false;

        if (!knownNoSlots) {
            setCurrentDate(new Date(newYear, newMonth, 1));
            setSelectedDate(null);
        }
    };

    const handleNextMonth = () => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const newYear = currentYear;
        const newMonth = currentMonth + 1;

        // Only navigate if we know the month has slots or we don't know yet
        const monthKey = `${newYear}-${String(newMonth + 1).padStart(2, '0')}`;
        const knownNoSlots = monthSlotsCache[monthKey] === false;

        if (!knownNoSlots) {
            setCurrentDate(new Date(newYear, newMonth, 1));
            setSelectedDate(null);
        }
    };

    const handleDateClick = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
        onSelectSlot(''); // Reset slot when date changes
    };

    const handleSlotClick = (slot: string) => {
        onSelectSlot(slot);
        setView('form');
    };

    const getSlotsForSelectedDate = () => {
        if (!selectedDate) return [];
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const d = String(selectedDate.getDate()).padStart(2, '0');
        const key = `${year}-${month}-${d}`;

        const dayData = slots[key];
        if (!dayData) return [];

        if (Array.isArray(dayData.slots)) {
            return dayData.slots;
        }
        if (Array.isArray(dayData)) {
            return dayData;
        }
        return [];
    };

    const currentSlots = getSlotsForSelectedDate();

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

            // Disable past dates and dates with no slots
            // Compare date at midnight to avoid time-of-day issues
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dayDate.setHours(0, 0, 0, 0);
            const isPast = dayDate < today;
            const isDisabled = isPast || !hasSlots;

            // Debug logging for first few days
            if (i <= 3) {
                console.log(`Day ${i}: dateKey=${dateKey}, hasSlots=${hasSlots}, isPast=${isPast}, isDisabled=${isDisabled}`);
            }

            days.push(
                <button
                    key={i}
                    onClick={() => !isDisabled && handleDateClick(i)}
                    disabled={isDisabled}
                    className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all relative
            ${isSelected ? 'bg-emerald-500 text-white shadow-lg scale-110 z-10' : ''}
            ${!isSelected && !isDisabled ? 'hover:bg-white/10 text-slate-300 cursor-pointer' : ''}
            ${isDisabled ? 'text-slate-800 cursor-default' : ''}
            ${hasSlots && !isSelected && !isDisabled ? 'text-white font-bold' : ''}
          `}
                >
                    {i}
                    {hasSlots && !isSelected && !isDisabled && (
                        <div className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full"></div>
                    )}
                </button>
            );
        }
        return days;
    };

    if (bookingStatus === 'success') {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h3>
                <p className="text-slate-400 mb-8 max-w-md">
                    We've sent a confirmation email to <span className="text-white">{formData.email}</span>. We look forward to speaking with you.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    if (view === 'form' && selectedSlot) {
        return (
            <div className="h-full min-h-[400px] flex flex-col max-w-md mx-auto">
                <button
                    onClick={() => setView('calendar')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors self-start"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Calendar
                </button>

                <h3 className="text-2xl font-bold text-white mb-2">Finalize Booking</h3>
                <p className="text-slate-400 mb-6">
                    {new Date(selectedSlot).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}
                </p>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitBooking(formData);
                }} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                required
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                placeholder="john@example.com"
                                title="Please enter a valid email address"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-400 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    {bookingError && (
                        <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                            {bookingError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={bookingStatus === 'loading'}
                        className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                    >
                        {bookingStatus === 'loading' ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Confirming...
                            </>
                        ) : (
                            'Confirm Appointment'
                        )}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 h-full min-h-[400px]">
            {/* Calendar Section */}
            <div className="flex-1 min-w-[300px]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-emerald-500" />
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevMonth}
                            disabled={loading || (() => {
                                const prevMonth = currentDate.getMonth() - 1;
                                const prevYear = currentDate.getFullYear();
                                const monthKey = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`;
                                return monthSlotsCache[monthKey] === false;
                            })()}
                            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Previous month"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNextMonth}
                            disabled={loading || (() => {
                                const nextMonth = currentDate.getMonth() + 1;
                                const nextYear = currentDate.getFullYear();
                                const monthKey = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}`;
                                return monthSlotsCache[monthKey] === false;
                            })()}
                            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Next month"
                        >
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
            <div className="flex-1 md:border-l border-white/10 md:pl-8 flex flex-col">
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
                    <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar content-start">
                        {currentSlots.map((slot: any, idx: number) => {
                            const timeString = typeof slot === 'string' ? slot : slot.startTime;
                            const date = new Date(timeString);
                            const timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSlotClick(timeString)}
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
