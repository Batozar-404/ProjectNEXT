import { Clock, CheckCircle, XCircle, Truck, Package, Check } from 'lucide-react';

const TransferStatus = ({ status, className = '' }) => {
    const steps = [
        { key: 'pending', label: 'Requested', icon: Clock },
        { key: 'approved', label: 'Approved', icon: CheckCircle },
        { key: 'in_transit', label: 'In Transit', icon: Truck },
        { key: 'completed', label: 'Completed', icon: CheckCircle },
    ];

    const statusOrder = ['pending', 'approved', 'in_transit', 'completed'];
    const currentIndex = statusOrder.indexOf(status);

    const isRejected = status === 'rejected';
    const isCancelled = status === 'cancelled';

    if (isRejected || isCancelled) {
        return (
            <div className={`flex items-center gap-2${className}`}>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-red-600">
                    {status === 'rejected' ? 'Transfer Rejected' : 'Transfer Cancelled'}
                </span>
            </div>
        );
    }

    return (
        <div className={`flex items-center${className}`}>
            {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                    <div key={step.key} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                }`}>
                                {isCompleted ? (
                                    <Check className="w-4 h-4 text-white" />
                                ) : (
                                    <Icon className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                            <span className={`text-xs mt-1${isCompleted ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                                {step.label}
                            </span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2${idx < currentIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TransferStatus;