import React, { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { X, Search } from "lucide-react";

export type AdminButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "success";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: AdminButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: LucideIcon;
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  type = "button",
  icon: Icon,
  ...rest
}) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-sm font-semibold rounded-xl gap-2",
    lg: "px-6 py-3 text-base font-bold rounded-2xl gap-2.5",
  };

  const variantClasses = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10 active:scale-[0.98]",
    secondary: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 shadow-sm active:scale-[0.98]",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-600/20 active:scale-[0.98]",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const AdminInput = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-white focus:bg-white border ${
            error ? "border-rose-400 focus:ring-rose-500/20" : "border-slate-200/90 focus:border-blue-500 focus:ring-blue-500/10"
          } rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
        {error && <p id={errorId} className="text-xs font-medium text-rose-600">{error}</p>}
      </div>
    );
  }
);
AdminInput.displayName = "AdminInput";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = "", rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-white focus:bg-white border ${
            error ? "border-rose-400 focus:ring-rose-500/20" : "border-slate-200/90 focus:border-blue-500 focus:ring-blue-500/10"
          } rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
        {error && <p id={errorId} className="text-xs font-medium text-rose-600">{error}</p>}
      </div>
    );
  }
);
AdminTextarea.displayName = "AdminTextarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
}

export const AdminSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, children, className = "", ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-3.5 py-2.5 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm font-medium text-slate-900 transition-all focus:outline-none cursor-pointer ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
      </div>
    );
  }
);
AdminSelect.displayName = "AdminSelect";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-2xl",
}) => {
  const titleId = useId();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          <motion.section
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${maxWidth} bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 id={titleId} className="text-lg font-black text-slate-900 tracking-tight">
                  {title}
                </h2>
                {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 max-h-[calc(85vh-120px)] overflow-y-auto">{children}</div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
};

export type AdminBadgeColor = "gray" | "blue" | "green" | "yellow" | "red" | "purple";

interface AdminBadgeProps {
  children: React.ReactNode;
  color?: AdminBadgeColor;
  dot?: boolean;
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({ children, color = "gray", dot = false }) => {
  const colorMap: Record<AdminBadgeColor, string> = {
    gray: "bg-slate-100 text-slate-700 border-slate-200/80",
    blue: "bg-blue-50 text-blue-700 border-blue-200/70",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    yellow: "bg-amber-50 text-amber-800 border-amber-200/70",
    red: "bg-rose-50 text-rose-700 border-rose-200/70",
    purple: "bg-purple-50 text-purple-700 border-purple-200/70",
  };

  const dotColorMap: Record<AdminBadgeColor, string> = {
    gray: "bg-slate-400",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-rose-500",
    purple: "bg-purple-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${colorMap[color]}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColorMap[color]}`} />}
      {children}
    </span>
  );
};

export const AdminPageHeader: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  action?: React.ReactNode;
}> = ({ title, subtitle, description, badge, action }) => {
  const sub = subtitle || description;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          {badge && (
            <span className="px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 rounded-full border border-blue-100">
              {badge}
            </span>
          )}
        </div>
        {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
      </div>
      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </div>
  );
};

export const AdminSearchBar: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  count?: number;
}> = ({ value, onChange, placeholder = "Search...", count }) => (
  <div className="relative flex-1 min-w-[200px] max-w-md">
    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-12 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
    />
    {count !== undefined && (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
        {count}
      </span>
    )}
  </div>
);

export const AdminCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}> = ({ children, className = "", title, subtitle, action }) => (
  <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/40">
        <div>
          {title && <h3 className="text-base font-bold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

export const AdminEmptyState: React.FC<{
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ icon: Icon, title, description, action, actionLabel, onAction }) => (
  <div className="py-16 px-6 text-center flex flex-col items-center justify-center rounded-2xl bg-white border border-dashed border-slate-200">
    {Icon && (
      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </div>
    )}
    <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
    <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
    {actionLabel && onAction ? (
      <AdminButton onClick={onAction}>
        {actionLabel}
      </AdminButton>
    ) : (
      action
    )}
  </div>
);
