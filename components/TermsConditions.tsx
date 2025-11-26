import React from 'react';

const TermsConditions: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
                <p className="text-slate-400 mb-12">Effective Date: March 5, 2025</p>

                <div className="space-y-8 text-slate-300">
                    <p>
                        These Terms & Conditions govern your use of our website and submission of information through our contact form.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Use of Submitted Information</h2>
                        <p className="mb-3">By submitting the form, you agree that:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>You will receive information regarding your request.</li>
                            <li>You may receive marketing emails and messages solely related to our company.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Communication & Opt-Out</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Message frequency may vary.</li>
                            <li>Standard message and data rates may apply.</li>
                            <li>You can opt out anytime by clicking "unsubscribe" in emails or replying "STOP" to SMS messages.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Liability Disclaimer</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Carriers are not liable for delayed or undelivered messages.</li>
                            <li>We reserve the right to modify our services at any time.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Governing Law</h2>
                        <p>These Terms & Conditions are governed by the laws of Ontario, Canada.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Information</h2>
                        <p>For any questions, contact us at <a href="mailto:info@creativecodeca.com" className="text-white hover:underline">info@creativecodeca.com</a></p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
