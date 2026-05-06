import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const Alert = ({ type, message, onClose, title }) => {
    const types = {
        success: { icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-800', iconColor: 'text-green-400' },
        error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-800', iconColor: 'text-red-400' },
        warning: { icon: AlertCircle, bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800', iconColor: 'text-yellow-400' },
        info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-800', iconColor: 'text-blue-400' },
    };

    const config = types[type] || types.info;
    const Icon = config.icon;

    return (
        <div className={`${config.bg} border-l-4${config.border} p-4 rounded-lg mb-4 relative`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <Icon className={`w-5 h-5${config.iconColor}`} />
                </div>
                <div className="ml-3 flex-1">
                    {title && <h3 className={`text-sm font-medium${config.text}`}>{title}</h3>}
                    <p className={`text-sm${config.text} mt-1`}>{message}</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className={`ml-auto${config.text} hover:opacity-75`}>
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;