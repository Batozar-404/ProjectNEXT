import { Shield, Crown, UserCheck, User } from 'lucide-react';

const RoleBadge = ({ role, size = 'sm' }) => {
    const roles = {
        admin: { icon: Crown, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Admin' },
        manager: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Manager' },
        staff: { icon: UserCheck, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Staff' },
        tenant_owner: { icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Owner' }
    };

    const config = roles[role] || roles.staff;
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-3 py-1 text-sm gap-1.5',
        lg: 'px-4 py-1.5 text-base gap-2'
    };

    return (
        <span className={`inline-flex items-center${sizeClasses[size]} font-medium rounded-full${config.bg}${config.color}`}>
            <Icon className="w-3 h-3" />
            {config.label}
        </span>
    );
};

export default RoleBadge;