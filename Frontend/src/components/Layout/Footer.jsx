const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-4 px-6">
            <div className="flex justify-between items-center text-sm text-gray-500">
                <p>&copy;{new Date().getFullYear()} Inventori.Multi. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-700">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-700">Terms of Service</a>
                    <a href="#" className="hover:text-gray-700">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;