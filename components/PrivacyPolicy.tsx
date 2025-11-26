import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-slate-400 mb-12">Effective Date: March 5, 2025</p>

                <div className="space-y-8 text-slate-300">
                    <p>
                        Creative Code ("we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you submit a form on our website.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p className="mb-3">When you submit a form, we collect the following personal information:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Name</li>
                            <li>Email Address</li>
                            <li>Phone Number</li>
                            <li>Any other details you provide in the form</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="mb-3">By submitting your information, you agree that we may use it to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Provide information regarding your request.</li>
                            <li>Send you marketing communications about our company.</li>
                            <li>Improve our services and customer support.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Data Sharing & Protection</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>We do not sell, rent, or share your information with third parties.</li>
                            <li>Your data is stored securely and is only accessible to authorized personnel.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Opt-Out & Data Control</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>You may opt out of marketing communications at any time by clicking "unsubscribe" in our emails or replying "STOP" to SMS messages.</li>
                            <li>To request data removal, contact us at <a href="mailto:info@creativecodeca.com" className="text-white hover:underline">info@creativecodeca.com</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Updates to This Privacy Policy</h2>
                        <p>We may update this policy occasionally. Please review it periodically.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
