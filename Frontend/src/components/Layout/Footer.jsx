const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Inventori.Multi. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-gray-700 transition-colors">Contact Support</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

