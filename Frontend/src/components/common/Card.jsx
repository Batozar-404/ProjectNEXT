const Card = ({ children, title, subtitle, icon, className = '', padding = true, hover = false }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}${className}`}>
            {(title || subtitle || icon) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
                        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
                    </div>
                    {icon && <div className="text-gray-400">{icon}</div>}
                </div>
            )}
            <div className={padding ? 'p-6' : ''}>
                {children}
            </div>
        </div>
    );
};

export default Card;