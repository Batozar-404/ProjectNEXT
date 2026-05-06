import { HelpCircle, BookOpen, Video, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import Card from '../components/Common/Card';

const HelpCenter = () => {
    const helpTopics = [
        { title: 'Getting Started', description: 'Learn the basics of Inventori.Multi', icon: BookOpen, link: '#' },
        { title: 'Video Tutorials', description: 'Watch step-by-step video guides', icon: Video, link: '#' },
        { title: 'FAQ', description: 'Frequently asked questions', icon: HelpCircle, link: '#' },
        { title: 'Contact Support', description: 'Get help from our support team', icon: MessageCircle, link: '#' },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
                    <p className="text-gray-500 mt-1">Find answers, watch tutorials, or contact support</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {helpTopics.map((topic, idx) => (
                        <Card key={idx} className="hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <topic.icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">{topic.description}</p>
                                    <a href={topic.link} className="inline-flex items-center gap-1 text-sm text-blue-600 mt-3 hover:text-blue-700">
                                        Learn more <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card title="Still need help?">
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Our support team is ready to assist you</p>
                        <button className="btn-primary inline-flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Contact Support
                        </button>
                    </div>
                </Card>
            </div>
    </div>
    );
};

export default HelpCenter;