import React, { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import ParticleCanvas from './ParticleCanvas';

const ClientCall: React.FC = () => {
    // Booking State
    const [bookingSlot, setBookingSlot] = useState<string | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [bookingError, setBookingError] = useState<string | null>(null);

    const CALENDAR_ID = "4QrTZFcUhSEjGNBDcC5C";

    const handleBookMeeting = async (bookingFormData: { name: string; email: string; phone: string }) => {
        if (!bookingSlot || !bookingFormData.email || !bookingFormData.name) {
            setBookingError('Please select a time slot and fill in all required fields');
            return;
        }

        setBookingStatus('loading');
        setBookingError(null);

        try {
            const res = await fetch('/api/ghl-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: bookingFormData.name,
                    email: bookingFormData.email,
                    phone: bookingFormData.phone,
                    startTime: bookingSlot,
                    title: `Meeting with ${bookingFormData.name}`,
                    calendarId: CALENDAR_ID
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to book meeting');
            }

            setBookingStatus('success');
        } catch (err: any) {
            console.error(err);
            setBookingStatus('error');
            setBookingError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <>
            {/* Hero Section - Simplified for Client Call */}
            <section className="md:pt-48 md:pb-32 overflow-hidden flex flex-col pt-32 pb-24 relative justify-center">
                <ParticleCanvas />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#020202]/40 z-0 pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <h1 className="md:text-8xl leading-tight md:leading-[1.1] text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-8">
                        Client Call
                    </h1>
                    <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed px-4">
                        Schedule a call with us.
                    </p>
                </div>
            </section>

            {/* Booking Section */}
            <section id="booking" className="py-20 px-6 relative bg-[#050505] border-y border-white/10">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 text-glow">Book a Meeting</h2>
                        <p className="text-slate-400">Schedule a time that works best for you</p>
                    </div>

                    <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
                        <BookingCalendar
                            selectedSlot={bookingSlot}
                            onSelectSlot={setBookingSlot}
                            onSubmitBooking={handleBookMeeting}
                            bookingStatus={bookingStatus}
                            bookingError={bookingError}
                            calendarId={CALENDAR_ID}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ClientCall;
